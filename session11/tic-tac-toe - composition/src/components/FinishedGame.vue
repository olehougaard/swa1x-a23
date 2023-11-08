<script setup lang="ts">
  import type { Game, Player } from '@/api/model'
  import { inject, defineEmits, defineProps, type PropType } from 'vue'
  import BoardView from '@/components/Board.vue'

  const props = defineProps({
    player: {
      type: Object as PropType<Player>,
      required: true
    },
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  })

  const emit = defineEmits(['goToLobby'])

  // const goToLobby = inject<() => void>('goToLobby', () => {})

  function message() {
      if (props.game.stalemate) 
        return 'Stalemate'
      else
        return props.game.winState?.winner + ' won!'
  }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='false' :board='game.board'/>
    <button @click="$emit('goToLobby')">Return to lobby</button>
    <!-- 
      <button @click="goToLobby()">Return to lobby</button>
    -->
  </div>
</template>
