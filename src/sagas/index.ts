import { all, put } from '@redux-saga/core/effects'

import { bootstrap } from 'actions/bootstrap.actions'
import { bootstrapSaga } from './bootstrap.saga'

function* rootSaga() {
    yield all([bootstrapSaga(), put(bootstrap())])
}

export { rootSaga }
