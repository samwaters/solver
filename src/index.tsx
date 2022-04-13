/// globals mode
import 'babel-polyfill'
import * as React from 'react'
// Router
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// Components
import { App } from './app'
import { sagaMiddleware, store } from './store'
import { rootSaga } from 'sagas/index'

const root = createRoot(document.getElementById('app'))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

sagaMiddleware.run(rootSaga)
