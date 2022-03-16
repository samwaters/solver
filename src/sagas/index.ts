import { all, put } from '@redux-saga/core/effects'

import { bootstrap, ready } from 'actions/bootstrap.actions'
import { bootstrapSaga } from './bootstrap.saga'

function* rootSaga() {
    yield all([
        bootstrapSaga(),
        put(bootstrap()),
        //put(ready())
    ])
}

export { rootSaga }
