<script setup lang="ts">
  import type { Game } from '@/api/model'
  import * as api from '@/api/api'
  import { ref, defineEmits } from 'vue'

  const initGames: Game[] = []
  const games = ref(initGames)

  async function findGames() {
    const gs = await api.readGamesList()
    games.value = gs
    setTimeout(findGames, 250)
  }

  setTimeout(findGames, 0)

  const gameName = ref('game')

  const emit = defineEmits({
    gameJoined(_: Game) {
      return true
    }
  })

  async function joinGame(gamePromise: Promise<Game>) {
    const game = await gamePromise
    emit('gameJoined', game)
  }

  async function newGame() {
    joinGame(api.createGame(gameName.value))
  }

  async function join(gameNumber: number) {
    joinGame(api.joinGame(gameNumber))
  }
</script>

<template>
  <div v-for="game in games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
