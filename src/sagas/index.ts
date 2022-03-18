import { all, put } from '@redux-saga/core/effects'

import { bootstrap } from 'actions/bootstrap.actions'
import { bootstrapSaga } from './bootstrap.saga'
import { workersSaga } from './workers.saga'

function* rootSaga() {
    yield all([bootstrapSaga(), workersSaga(), put(bootstrap())])
}

export { rootSaga }
