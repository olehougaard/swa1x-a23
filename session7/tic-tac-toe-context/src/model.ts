export type Player = 'X' | 'O'
export type Board = ('X' | 'O' | '')[][]
export type WinState = {winner: Player, row?: any} | undefined
export type Game = {
    board: Board,
    inTurn: Player,
    winState: WinState,
    stalemate: boolean
}

export type Place = {
    x: number,
    y: number
}

export type Move = Place & {
    player: Player
}

const SIZE = 3

const set = <T>(xs: T[], i: number, e: T): T[] => xs.map((x, inx) => inx === i? e : x)

export const otherPlayer = (p: Player): Player => {
    switch(p) {
        case 'X': return 'O'
        case 'O': return 'X'
    }
}

const array = <T>(length: number, init : (i: number) => T): T[] => 
    Array.apply(null, new Array(length)).map((_: unknown, i: number) => init(i))

const createBoard: () => Board = () => array(SIZE, _ => array(SIZE, _ => ''))

export const createGame = (): Game => ({board: createBoard(), inTurn: 'X', stalemate: false, winState: undefined})

const applyMoveBoard = (board: Board, {x, y, player}: Move): Board => {
    return set(board, x, set(board[x], y, player))
}

const legalMove = (game: Game, {x, y, player}: Move): boolean => {
    if (game.winState !== undefined || game.stalemate) return false
    if (player !== game.inTurn) return false
    if (x < 0 || y < 0 || x > 2 || y > 2) return false
    if (game.board[x][y] !== '') return false
    return true
}

const row = (board: Board, x: number, y: number, dx: number, dy: number): Place[] => array(board.length, i => ({x: x + i * dx, y: y + i * dy}))

const allRows = (board: Board): Place[][] => {
    const row = (x: number, y: number, dx: number, dy: number) => array(board.length, i => ({x: x + i * dx, y: y + i * dy}))
    const verticalRows = array(board.length, i => row(0, i, 1, 0))
    const horizontalRows = array(board.length, i => row(i, 0, 0, 1))
    const diagonalRows = [row(0, 0, 1, 1), row(0, 2, 1, -1)]
    return [...verticalRows, ...horizontalRows, ...diagonalRows]
}

const plateFull = (board:Board): boolean => board.every(row => row.every(x => x))

const winState = (board: Board): WinState | undefined => {
    const hasWon = (theRow: Place[], candidate: Player) =>  theRow.every(({x, y}) => board[x][y] === candidate)
    const winningRow = (candidate: Player): Place[] | undefined => allRows(board).find((x: Place[]) => hasWon(x, candidate))
    const getWinner = (candidate: Player): WinState | undefined => {
        const w = winningRow(candidate)
        return w && { winner: candidate, row : w }
    }
    return getWinner('X') ?? getWinner('O')
}

export function makeMove(game: Game, move: Move): Game {
    if (!legalMove(game, move)) throw new Error("Illegal move")
    const movedBoard = applyMoveBoard(game.board, move)
    const inTurn = game.inTurn === 'X' ? 'O' : 'X'
    const win = winState(movedBoard)
    return { board: movedBoard, inTurn, winState: win, stalemate: plateFull(movedBoard) && !win }
}
