import { call, put, takeEvery } from '@redux-saga/core/effects'
import { BOOTSTRAP, ready } from 'actions/bootstrap.actions'

function* bootstrap() {
    const data = yield call(fetch, '/words.json')
    const parsedData = yield data.json()
    yield put(ready())
}

export function* bootstrapSaga() {
    yield takeEvery(BOOTSTRAP, bootstrap)
}
