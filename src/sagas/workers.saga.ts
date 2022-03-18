import { all, put, select, takeEvery } from '@redux-saga/core/effects'
import { INITIALISE_WORKER } from 'actions/workers.actions'
import { registerWorker } from 'actions/workers.actions'
import { Action } from 'actions/action.interface'
import { getWordsStartingWith } from 'selectors/words.selectors'

function* initialise(params: Action) {
    const worker = new Worker('/worker.prod.js')
    const words: string[][] = yield all(
        params.payload.letters.map((letter: string) =>
            select(getWordsStartingWith(letter))
        )
    )
    worker.postMessage({
        type: 'LOAD_DATA',
        payload: words.flat(),
    })
    yield put(registerWorker(params.payload.id, worker))
}

export function* workersSaga() {
    yield takeEvery(INITIALISE_WORKER, initialise)
}
