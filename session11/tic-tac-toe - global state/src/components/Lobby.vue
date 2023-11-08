<script setup lang="ts">
  import type { Game } from '@/api/model'
  import * as api from '@/api/api'
  import { ref } from 'vue'
  import { model } from '@/api/store'


  const initGames: Game[] = []
  const games = ref(initGames)

  async function findGames() {
    const gs = await api.readGamesList()
    games.value = gs
    setTimeout(findGames, 250)
  }

  setTimeout(findGames, 0)

  const gameName = ref('game')

  async function newGame() {
    const game = await api.createGame(gameName.value)
    model.waitForPlayer('X', game)
  }

  async function join(gameNumber: number) {
    const game = await api.joinGame(gameNumber)
    model.startGame('O', game)
  }
</script>

<template>
  <div v-for="game in games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
