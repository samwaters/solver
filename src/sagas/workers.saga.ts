import { all, put, select, takeEvery } from '@redux-saga/core/effects'
import { INITIALISE_WORKER } from 'actions/workers.actions'
import { registerWorker } from 'actions/workers.actions'
import { Action } from 'actions/action.interface'
import { getWordsStartingWith } from 'selectors/words.selectors'
import { addSolutions } from 'actions/solutions.actions'
import {
    ADD_KNOWN_LETTER,
    REMOVE_KNOWN_LETTER,
    SET_KNOWN_LETTER_VALIDITY,
} from 'actions/letters.actions'
import { getAllWorkers } from 'selectors/workers.selectors'
import { store } from '../index'

function* initialise(params: Action) {
    const worker = new Worker('/worker.prod.js')
    const words: string[][] = yield all(
        params.payload.letters.map((letter: string) =>
            select(getWordsStartingWith(letter))
        )
    )
    worker.postMessage({
        type: 'SET_ID',
        payload: params.payload.id,
    })
    worker.onmessage = (message) => {
        switch (message.data?.type) {
            case 'SOLUTIONS':
                store.dispatch(
                    addSolutions(
                        message.data.payload.solutions,
                        message.data.payload.id
                    )
                )
                break
            default:
                console.error(
                    'Unknown message type received from worker:',
                    message.data.type
                )
        }
    }
    worker.postMessage({
        type: 'LOAD_DATA',
        payload: words.flat(),
    })
    yield put(registerWorker(params.payload.id, worker))
}

function* updateWorkers(params: Action) {
    const workers = yield select(getAllWorkers)
    Object.keys(workers).forEach((id) => {
        workers[id].postMessage({
            payload: {
                ...params.payload,
            },
            type: 'UPDATE_LETTERS',
        })
    })
}

export function* workersSaga() {
    yield takeEvery(INITIALISE_WORKER, initialise)
    yield takeEvery(ADD_KNOWN_LETTER, updateWorkers)
    yield takeEvery(REMOVE_KNOWN_LETTER, updateWorkers)
    yield takeEvery(SET_KNOWN_LETTER_VALIDITY, updateWorkers)
}
