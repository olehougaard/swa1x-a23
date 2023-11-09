import {reactive, ref} from 'vue'
import type {Game, GameState, Move, Player} from './model'

export type Model = {
    readonly gameState: Readonly<GameState>,
    readonly gameName?: string,
    readonly game: Partial<Game>,
    readonly player?: Player,
    endGame(): void,
    waitForPlayer(waitingPlayer: Player, game: Game): void,
    startGame(player: Player, game: Game): void,
    makeMove(m: Move): void,
    applyGameProperties(props: Partial<Game>): void,
}

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

export const model: Model = reactive({
    get gameState(): GameState { return gameState.value },
    get game(): Partial<Game> {
        if (this.gameState.mode !== 'no game')
            return this.gameState.game
        else
            return {}
    },
    get player(): Player | undefined {
        if (this.gameState.mode !== 'no game')
            return this.gameState.player
    },
    get gameName(): string | undefined {
        if (this.gameState.mode !== 'no game')
            return this.gameState.game.gameName
    },
    endGame,
    waitForPlayer,
    startGame,
    makeMove,
    applyGameProperties
})
