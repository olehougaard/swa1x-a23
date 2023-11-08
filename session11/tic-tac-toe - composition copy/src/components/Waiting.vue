<script setup lang="ts">
  import type { Game, Player } from '@/api/model'
  import * as api from '@/api/api'
  import type { PropType } from 'vue'
  import { defineProps, onMounted } from 'vue'
  import { model } from '@/api/store';

  const props = defineProps({
    gameNumber: {
      type: Number,
      required: true
    }
  })

  async function waitForPlayer() {
    const game = await api.readGame(props.gameNumber)
    if (game.ongoing)
      model.startGame('X', game)
    else 
      setTimeout(waitForPlayer, 100)
  }

  onMounted(waitForPlayer)
</script>

<template>
  <h1>Waiting for other player...</h1>
</template>
