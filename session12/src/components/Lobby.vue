<script setup lang="ts">
  import type { Game } from '@/api/model'
  import { ref, onBeforeMount, onUnmounted, inject } from 'vue'
  import { model } from '../api/store'
  import type { API } from '../api/api'
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const api = inject<API>('api')

  const games = ref([] as Game[])

  let active = true

  async function findGames() {
    if (!active) return
    games.value = await api.readGamesList()
    setTimeout(findGames, 250)
  }

  onBeforeMount(() => {
    active = true
    findGames()
  })

  onUnmounted(() => {
    active = false
  })

  setTimeout(findGames, 0)

  const gameName = ref('My game')

  async function newGame() {
    const game = await api.createGame(gameName.value)
    model.waitForPlayer('X', game)
    router.push(`/waiting/${game.gameNumber}?player=X`)
  }

  async function join(gameNumber: number) {
    const game = await api.joinGame(gameNumber)
    model.startGame('O', game)
    router.push(`/playing/${game.gameNumber}?player=O`)
  }
</script>

<template>
  <div v-for="game in games">
    {{game.gameName}} 
    <button :id="'join' + game.gameNumber.toString()" @click="join(game.gameNumber)">Join</button>
  </div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
