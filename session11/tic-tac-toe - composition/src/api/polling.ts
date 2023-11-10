import { onMounted, onUnmounted } from 'vue'

export default function(doPoll: () => Promise<boolean>) {
  let active = true

  async function findGames() {
    if (!active) return
    const recurse = await doPoll()
    if (recurse) setTimeout(findGames, 250)
  }

  onMounted(() => {
    active = true
    findGames()
  })

  onUnmounted(() => {
    active = false
  })
}
