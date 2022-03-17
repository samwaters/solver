import { call, put, takeEvery } from '@redux-saga/core/effects'
import { BOOTSTRAP, ready } from 'actions/bootstrap.actions'
import { storeWords } from 'actions/words.actions'
import { WordsState } from 'reducers/words.reducer'

function* bootstrap() {
    const data = yield call(fetch, '/words.json')
    const parsedData: WordsState = yield data.json()
    yield put(storeWords(parsedData))
    yield put(ready())
}

export function* bootstrapSaga() {
    yield takeEvery(BOOTSTRAP, bootstrap)
}
