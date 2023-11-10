<script setup lang="ts">
  import type { Game } from '@/api/model'
  import * as api from '@/api/api'
  import definePoll from '@/api/polling'
  import { ref, onMounted, onUnmounted, defineEmits } from 'vue'

  const initGames: Game[] = []
  const games = ref(initGames)

  let active = true
  
  async function findGames() {
    if (!active) return
    const gs = await api.readGamesList()
    games.value = gs
    setTimeout(findGames, 250)
  }

  onMounted(() => {
    active = true
    findGames()
  })

  onUnmounted(() => {
    active = false
  })

  // definePoll(async () => {
  //   games.value = await api.readGamesList()
  //   return true
  // })

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
