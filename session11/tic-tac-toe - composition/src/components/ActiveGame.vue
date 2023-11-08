<script setup lang="ts">
  import type { Game, Player } from '@/api/model'
  import { type PropType, ref, computed, defineProps, defineEmits, onMounted } from 'vue'
  import * as api from '@/api/api'
  import BoardView from '@/components/Board.vue'

  const props = defineProps( {
    player: {
      type: Object as PropType<Player>,
      required: true
    },
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  })

  let current = ref(props.game)

  let enabled = computed(() => props.player == current.value.inTurn)

  let emit = defineEmits({
    gameFinished(game: Game) {
      return game.stalemate || game.winState
    }
  })

  function finished() {
    return current.value.stalemate || current.value.winState
  }

  function message() {
    if (enabled.value)
      return 'Your turn, ' + props.player
    else
      return 'Waiting for other player to move...'
  }

  async function makeMove(x: number, y: number) {
    if (props.player === current.value.inTurn) {
      const {move, ...move_props} = await api.createMove(current.value.gameNumber, {x, y, player: props.player})
      current.value.board[move.y][move.x] = move.player
      current.value = {...current.value, ...move_props}
      if (finished())
        emit('gameFinished', current.value)
      else
        waitForMove()
    }
  }

  async function waitForMove() {
    const { moves, inTurn, winState, stalemate } = await api.readMoves(current.value.gameNumber)
    console.log(moves, inTurn, winState, stalemate)
    if (inTurn === props.player) {
      const move = moves[moves.length - 1]
      if (!move.conceded) current.value.board[move.y][move.x] = move.player
      current.value.inTurn = inTurn
      current.value.winState = winState
      current.value.stalemate = stalemate
      if (finished())
        emit('gameFinished', current.value)
    } else 
      setTimeout(waitForMove, 1000)
  }

  async function concede() {
    current.value = await api.concede(current.value.gameNumber, props.player === 'X' ? 'O' : 'X')
    emit('gameFinished', current.value)
  }

  onMounted(() => {
    if (current.value.inTurn !== props.player) waitForMove()
  })

</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='enabled' :board='current.board' @click='makeMove'/>
    <button v-if="enabled" @click="concede">Concede</button>
  </div>
</template>
