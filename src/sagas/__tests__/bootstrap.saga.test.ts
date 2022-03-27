import { call } from '@redux-saga/core/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { BOOTSTRAP, READY } from 'actions/bootstrap.actions'
import { STORE_WORDS } from 'actions/words.actions'
import { INITIALISE_WORKER } from 'actions/workers.actions'
import { bootstrapSaga } from 'sagas/bootstrap.saga'

describe('sagas/bootstrap.saga', () => {
    it('Performs the bootstrap actions', () => {
        return expectSaga(bootstrapSaga)
            .provide([
                [
                    call(fetch, '/words.json'),
                    { json: () => ({ A: ['apple'], B: ['banana'] }) },
                ],
            ])
            .dispatch({ type: BOOTSTRAP })
            .call(global.fetch, '/words.json')
            .put({
                type: STORE_WORDS,
                payload: {
                    A: ['apple'],
                    B: ['banana'],
                },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'AD', letters: ['A', 'B', 'C', 'D'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'EH', letters: ['E', 'F', 'G', 'H'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'IL', letters: ['I', 'J', 'K', 'L'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'MP', letters: ['M', 'N', 'O', 'P'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'QT', letters: ['Q', 'R', 'S', 'T'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'UX', letters: ['U', 'V', 'W', 'X'] },
            })
            .put({
                type: INITIALISE_WORKER,
                payload: { id: 'YZ', letters: ['Y', 'Z'] },
            })
            .put({ type: READY })
            .run()
    })
})
