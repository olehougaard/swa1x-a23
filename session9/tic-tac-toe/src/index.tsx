import './index.css';
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { View } from './view'
import { store } from './store'

ReactDOM.render(<View store={store}/>, document.getElementById('root'))
