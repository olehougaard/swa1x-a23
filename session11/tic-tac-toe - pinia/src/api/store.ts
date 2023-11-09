import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {Game, GameState, Move, Player} from './model'

export const store = defineStore('model', () => {
    const games = ref([] as Game[])
    const gameState = ref({mode: 'no game'} as GameState)
    
    function endGame() {
        gameState.value = {mode: 'no game'}
    }
    
    function waitForPlayer(waitingPlayer: Player, game: Game) {
      gameState.value = {mode: 'waiting', player: waitingPlayer, game}
    }
    
    function startGame(player: Player, game: Game) {
      gameState.value = {mode: 'playing', player, game}
    }
    
    function makeMove(m: Move) {
        if (gameState.value.mode !== 'no game') {
            gameState.value.game.board[m.y][m.x] = m.player
        }
    }
    
    function applyGameProperties(props: Partial<Game>) {
        if (gameState.value.mode !== 'no game') {
            gameState.value.game = {...gameState.value.game, ...props}
        }
    }

    const game = computed((): Partial<Game> => {
        if (gameState.value.mode !== 'no game')
            return gameState.value.game
        else 
            return {}
    })
    
    const player = computed(() => {
        if (gameState.value.mode !== 'no game')
            return gameState.value.player
    })
    
    return {
        games,
        gameState,
        game, 
        player,
        endGame,
        waitForPlayer,
        startGame,
        makeMove,
        applyGameProperties
    }
})
