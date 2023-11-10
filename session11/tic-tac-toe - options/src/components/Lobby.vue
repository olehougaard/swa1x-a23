<script lang="ts">
  import type { Game } from '@/api/model'
  import * as api from '@/api/api'
  import { ref } from 'vue'

  const initGames: Game[] = await api.readGamesList()

  export default {
    data() {
      return {
        active: true,
        games: initGames,
        gameName: 'game'
      }
    },
    emits: {
      gameJoined(_: Game) {
        return true
      }
    },
    methods: {
      async joinGame(gamePromise: Promise<Game>) {
        const game = await gamePromise
        this.$emit('gameJoined', game)
      },
      async newGame() {
        this.joinGame(api.createGame(this.gameName))
      },
      async join(gameNumber: number) {
        this.joinGame(api.joinGame(gameNumber))
      },
      async findGames() {
        if (!this.active) return;
        const gs = await api.readGamesList()
        this.games = gs
       setTimeout(() => this.findGames(), 250)
      }
    },
    mounted() {
        this.active = true
        this.findGames()
    },
    unmounted() {
        this.active = false
    },
  }
</script>

<template>
  <div v-for="game in games">{{game.gameName}} <button @click="join(game.gameNumber)">Join</button></div>
  <input type="text" v-model="gameName"/> <button @click="newGame()">Create</button>
</template>
