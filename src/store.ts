import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { createRootReducer } from 'reducers/index'

// Defined in webpack config
declare const mode

interface IDevtoolsWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (enhancers?: any) => null
}
const win: IDevtoolsWindow = window

const enhancers =
    typeof mode !== 'undefined' &&
    mode === 'development' &&
    win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

export const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    createRootReducer(),
    enhancers(applyMiddleware(sagaMiddleware))
)
