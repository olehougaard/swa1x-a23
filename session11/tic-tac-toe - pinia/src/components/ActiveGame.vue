<script setup lang="ts">
  import type { Game } from '@/api/model'
  import { computed, defineEmits, onMounted } from 'vue'
  import * as api from '@/api/api'
  import BoardView from '@/components/Board.vue'
  import { store } from '@/api/store'
  const model = store()

  console.log(model.player)
  
  const enabled = computed(() => model.player === model.game.inTurn)

  let emit = defineEmits({
    gameFinished(game: Game) {
      return game.stalemate || game.winState
    }
  })

  const board = computed(() => model.game.board ?? [[]])

  function finished() {
    return model.game.stalemate || model.game.winState
  }

  function message() {
    if (enabled.value)
      return 'Your turn, ' + model.player
    else
      return 'Waiting for other player to move...'
  }

  async function makeMove(x: number, y: number) {
    if (enabled.value) {
      const {move, ...move_props} = await api.createMove(model.game.gameNumber!, {x, y, player: model.player!})
      model.makeMove(move)
      model.applyGameProperties(move_props)
      if (!finished())
        waitForMove()
    }
  }

  async function waitForMove() {
    const { moves, ...game_props } = await api.readMoves(model.game.gameNumber!)
    if (game_props.inTurn === model.player) {
      const move = moves[moves.length - 1]
      if (!move.conceded) model.makeMove(move)
      model.applyGameProperties(game_props)
    } else 
      setTimeout(waitForMove, 1000)
  }

  async function concede() {
    const {winState} = await api.concede(model.game.gameNumber!, model.player === 'X' ? 'O' : 'X')
    model.applyGameProperties({winState})
  }

  onMounted(() => {
    if (model.game.inTurn !== model.player) waitForMove()
  })

</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='enabled' :board='board' @click='makeMove'/>
    <button v-if="enabled" @click="concede">Concede</button>
  </div>
</template>
