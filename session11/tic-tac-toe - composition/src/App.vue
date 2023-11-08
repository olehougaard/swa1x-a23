<script setup lang="ts">
  import LobbyView from '@/components/Lobby.vue'
  import WaitingView from '@/components/Waiting.vue'
  import GameView from '@/components/Game.vue'
  import type { Game, GameState } from './api/model'
  import { ref } from 'vue'

  type AppState = {
    gameState: GameState
  }

  const gameState = ref<GameState>({ mode: 'no game' })

  function gameJoined(game: Game) {
    if (game.ongoing)
      gameState.value = {mode: 'playing', player: 'O', game}
    else 
      gameState.value = {mode: 'waiting', player: 'X', game}
  }

  function playGame() {
    gameState.value.mode = 'playing'
  }

  function goToLobby() {
    gameState.value.mode = 'no game'
  }
</script>

<template>
  <lobby-view v-if="gameState.mode=='no game'" @game-joined="gameJoined"/>
  <waiting-view v-if="gameState.mode=='waiting'" :player="gameState.player" :game="gameState.game" @game-started="playGame"/>
  <game-view v-if="gameState.mode=='playing'" :player="gameState.player" :game="gameState.game" @go-to-lobby="goToLobby"/>
</template>
