<script setup lang="ts">
  import { computed, inject } from 'vue'
  import type { Player } from '@/api/model'
  import type { API } from '@/api/api'
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'
  import { model } from '@/api/store'

  import {useRoute} from 'vue-router'

  const route = useRoute()
  // route.params are path parameters. Query parameters are in route.query
  const gameNumber = Number.parseInt(route.params.gameNumber as string)
  const player = route.query.player as Player

  async function startGame(gameNumber, player) {
    const api = inject<API>('api')
    const game = await api.readGame(gameNumber)
    model.startGame(player, game)
  }

  if (model.game.gameNumber !== gameNumber || model.player !== player)
    startGame(gameNumber, player)

  const active = computed(() => !model.game.stalemate && !model.game.winState)
</script>

<template>
    <h1>Playing game {{ gameNumber }}: {{model.game.gameName}} </h1>
    <active-game-view v-if='active'/>
    <finished-game-view v-else/>
</template>
