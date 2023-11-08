<script setup lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import type { Game, GameState } from './api/model'
  import { ref } from 'vue'
  import { model } from '@/api/store'
  
  const gameState = ref<GameState>({ mode: 'no game' })

</script>

<template>
  <lobby-view v-if="model.gameState.mode=='no game'"/>
  <waiting-view v-if="model.gameState.mode=='waiting'" :gameNumber="model.game?.gameNumber!"/>
  <game-view v-if="model.gameState.mode=='playing'"/>
</template>
