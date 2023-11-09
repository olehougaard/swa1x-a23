<script setup lang="ts">
  import { computed } from 'vue'
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'
  import { store } from '@/api/store'
  const model = store()

  const active = computed(() => !model.game.stalemate && !model.game.winState)
</script>

<template>
    <h1>Playing {{model.game.gameName}} </h1>
    <active-game-view v-if='active'/>
    <finished-game-view v-else/>
</template>
