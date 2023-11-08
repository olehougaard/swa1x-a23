<script setup lang="ts">
  import type { Game, Player } from '@/api/model'
  import type { PropType } from 'vue'
  import { ref, computed, defineEmits, defineProps } from 'vue'
  import ActiveGameView from '@/components/ActiveGame.vue'
  import FinishedGameView from '@/components/FinishedGame.vue'

  const props = defineProps({
    player: {
      type: Object as PropType<Player>,
      required: true
    },
    game: {
      type: Object as PropType<Game>,
      required: true
    }
  })

  const current = ref(props.game)

  defineEmits(['goToLobby'])

  const active = computed(() => !current.value.stalemate && !current.value.winState)

  function onFinished(g: Game) {
    current.value = g
  }
</script>

<template>
    <h1>Playing {{game.gameName}} </h1>
    <active-game-view v-if='active' :game='current' :player="player" @game-finished="onFinished"/>
    <finished-game-view v-else :game='current' :player="player" @go-to-lobby="$emit('goToLobby')"/>
</template>
