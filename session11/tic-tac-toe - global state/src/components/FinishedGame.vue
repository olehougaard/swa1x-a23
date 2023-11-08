<script setup lang="ts">
  import { computed } from 'vue'
  import BoardView from '@/components/Board.vue'
  import { model } from '@/api/store'

  const board = computed(() => model.game?.board ?? [[]])

  function message() {
      if (model.game?.stalemate) 
        return 'Stalemate'
      else
        return model.game?.winState?.winner + ' won!'
  }

  function goToLobby() {
    model.endGame()
  }
</script>

<template>
  <div id = 'game'>
    <p id = 'messages'>{{ message() }}</p>
    <board-view :enabled='false' :board='board'/>
    <button @click="goToLobby()">Return to lobby</button>
  </div>
</template>
