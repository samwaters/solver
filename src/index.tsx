/// globals mode
import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
// Router
import { Provider } from 'react-redux'
// Redux
import { createRootReducer } from './reducers'
import { applyMiddleware, compose, createStore } from 'redux'
// Saga
import createSagaMiddleware from '@redux-saga/core'

// Components
import { App } from './app'
import { rootSaga } from './sagas'

interface IDevtoolsWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (enhancers?: any) => null
}

// Defined in webpack config
declare const mode

const win: IDevtoolsWindow = window
const enhancers =
    typeof mode !== 'undefined' &&
    mode === 'development' &&
    win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    createRootReducer(),
    enhancers(applyMiddleware(sagaMiddleware))
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

sagaMiddleware.run(rootSaga)
