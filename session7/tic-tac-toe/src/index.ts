import './index.css';
import * as ReactDOM from 'react-dom';
import { createGame, Game } from './model'
import View from './view'
import { createStore, Store} from './store';
import { reduce } from './reducer'

const initGame = createGame()
const store = createStore(initGame, reduce)
const root = document.getElementById('root')
const render = (game: Game) => ReactDOM.render(View(game, store.dispatch), root)
render(initGame)
store.subscribe(render)
