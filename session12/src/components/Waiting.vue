<script setup lang="ts">
  import { defineProps, onMounted, inject } from 'vue'
  import type { Player } from '@/api/model'
  import { model } from '@/api/store'
  import type { API } from '@/api/api'
  import {useRouter, useRoute} from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  // route.params are path parameters. Query parameters are in route.query
  const gameNumber = Number.parseInt(route.params.gameNumber as string)
  const player = route.query.player as Player

  const api = inject<API>('api')

  async function waitForPlayer() {
    const game = await api.readGame(gameNumber)
    if (game.ongoing) {
      model.startGame(player, game)
      router.push(`/playing/${game.gameNumber}?player=${player}`)
    } else {
        setTimeout(waitForPlayer, 100)
    }
  }

  onMounted(waitForPlayer)
</script>

<template>
  <h1>Waiting for other player...</h1>
</template>
