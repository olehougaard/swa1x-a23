import { Game } from './model'
import { Action } from './reducer'

export type Listener = (_: Game) => void

export type Store = {
    subscribe(listener: Listener): () => void
    dispatch(action: Action): void
}
  
export const createStore = (init_state: Game, reducer: (state: Game, action: Action) => Game): Store => {
    let state: Game = init_state
    let listeners: Listener[] = []

    const subscribe = (listener: Listener) => {
        listeners.push(listener)
        const unsubscribe = () => {
            const index = listeners.indexOf(listener)
            if (index !== -1) listeners.splice(index, 1)
        }
        return unsubscribe
    }

    const dispatch = (action: Action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener(state))
    }

    return { subscribe, dispatch }
}
