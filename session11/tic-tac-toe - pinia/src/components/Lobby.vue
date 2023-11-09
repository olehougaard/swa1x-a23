<script setup lang="ts">
  import * as api from '@/api/api'
  import { ref, onMounted, onUnmounted } from 'vue'
  import { store } from '@/api/store'
  const model = store()

  let active = true

  async function findGames() {
    if (!active) return
    const gs = await api.readGamesList()
    if (gs.length != model.games.length || gs.some((g, idx) => g.gameNumber != model.games[idx].gameNumber))
      model.games = gs
    setTimeout(findGames, 250)
  }

  onMounted(() => { 
    active = true
    setTimeout(findGames, 0)
  })
  onUnmounted(() => { active = false })

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
  <div v-for="game in model.games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
