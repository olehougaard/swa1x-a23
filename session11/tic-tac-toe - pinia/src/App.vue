<script setup lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import { store } from '@/api/store'
  const model = store()
</script>

<template>
  <lobby-view v-if="model.gameState.mode=='no game'"/>
  <waiting-view v-if="model.gameState.mode=='waiting'" :gameNumber="model.game.gameNumber!"/>
  <game-view v-if="model.gameState.mode=='playing'"/>
</template>
