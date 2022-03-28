/// globals mode
import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
// Router
import { Provider } from 'react-redux'

// Components
import { App } from './app'
import { sagaMiddleware, store } from './store'
import { rootSaga } from 'sagas/index'

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

sagaMiddleware.run(rootSaga)
