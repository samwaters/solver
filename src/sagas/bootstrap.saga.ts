import { call, put, takeEvery } from '@redux-saga/core/effects'
import { BOOTSTRAP, ready } from 'actions/bootstrap.actions'
import { storeWords } from 'actions/words.actions'
import { initialiseWorker } from 'actions/workers.actions'
import { WordsState } from 'reducers/words.reducer'

function* bootstrap() {
    const data = yield call(fetch, '/words.json')
    const parsedData: WordsState = yield data.json()
    yield put(storeWords(parsedData))
    yield put(initialiseWorker('AD', ['A', 'B', 'C', 'D']))
    yield put(initialiseWorker('EH', ['E', 'F', 'G', 'H']))
    yield put(initialiseWorker('IL', ['I', 'J', 'K', 'L']))
    yield put(initialiseWorker('MP', ['M', 'N', 'O', 'P']))
    yield put(initialiseWorker('QT', ['Q', 'R', 'S', 'T']))
    yield put(initialiseWorker('UX', ['U', 'V', 'W', 'X']))
    yield put(initialiseWorker('YZ', ['Y', 'Z']))
    yield put(ready())
}

export function* bootstrapSaga() {
    yield takeEvery(BOOTSTRAP, bootstrap)
}
