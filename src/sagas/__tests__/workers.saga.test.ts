import { expectSaga } from 'redux-saga-test-plan'
import { workersSaga } from 'sagas/workers.saga'
import { RESET } from 'actions/reset.actions'
import { select } from '@redux-saga/core/effects'
import { getAllWorkers } from 'selectors/workers.selectors'
import {
    ADD_KNOWN_LETTER,
    REMOVE_KNOWN_LETTER,
    SET_KNOWN_LETTER_VALIDITY,
} from 'actions/letters.actions'
import { INITIALISE_WORKER, REGISTER_WORKER } from 'actions/workers.actions'

jest.mock('../../store', () => ({
    sagaMiddleware: () => null,
    store: () => null,
}))

jest.mock('../../selectors/words.selectors', () => ({
    getWordsStartingWith: () => () => ['apple'],
}))

describe('sagas/workers', () => {
    const mockOnMessage = jest.fn()
    const mockPostMessage = jest.fn()
    afterAll(() => {
        jest.resetAllMocks()
    })
    afterEach(() => {
        mockOnMessage.mockClear()
        mockPostMessage.mockClear()
    })
    beforeAll(() => {
        if (!global.Worker) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            global.Worker = () => null
        }
        jest.spyOn(global, 'Worker').mockImplementation(() => ({
            addEventListener: () => null,
            dispatchEvent: () => true,
            onerror: () => null,
            onmessage: mockOnMessage,
            onmessageerror: () => null,
            postMessage: mockPostMessage,
            removeEventListener: () => null,
            terminate: () => null,
        }))
    })
    it('handles adding a letter', () => {
        return expectSaga(workersSaga)
            .provide([[select(getAllWorkers), { test: new Worker('/foo') }]])
            .dispatch({
                payload: { index: 0, letter: 'A', row: 0, valid: true },
                type: ADD_KNOWN_LETTER,
            })
            .run()
            .then(() => {
                expect(mockPostMessage).toHaveBeenCalledWith({
                    payload: {
                        index: 0,
                        letter: 'A',
                        row: 0,
                        valid: true,
                    },
                    type: 'UPDATE_LETTERS',
                })
            })
    })
    it('handles initialising the workers', () => {
        const testWorker = new Worker('/foo')
        return expectSaga(workersSaga)
            .provide([[select(getAllWorkers), { test: testWorker }]])
            .dispatch({
                payload: { id: 'A', letters: ['A'] },
                type: INITIALISE_WORKER,
            })
            .put.like({
                action: {
                    payload: {
                        id: 'A',
                    },
                    type: REGISTER_WORKER,
                },
            })
            .run()
            .then(() => {
                expect(mockPostMessage).toHaveBeenNthCalledWith(1, {
                    payload: 'A',
                    type: 'SET_ID',
                })
                expect(mockPostMessage).toHaveBeenNthCalledWith(2, {
                    payload: ['apple'],
                    type: 'LOAD_DATA',
                })
            })
    })
    it('handles removing a letter', () => {
        return expectSaga(workersSaga)
            .provide([[select(getAllWorkers), { test: new Worker('/foo') }]])
            .dispatch({
                payload: { index: 0, letter: '', row: 0, valid: null },
                type: REMOVE_KNOWN_LETTER,
            })
            .run()
            .then(() => {
                expect(mockPostMessage).toHaveBeenCalledWith({
                    payload: {
                        index: 0,
                        letter: '',
                        row: 0,
                        valid: null,
                    },
                    type: 'UPDATE_LETTERS',
                })
            })
    })
    it('handles reset', () => {
        return expectSaga(workersSaga)
            .provide([[select(getAllWorkers), { test: new Worker('/foo') }]])
            .dispatch({ type: RESET })
            .run()
            .then(() => {
                expect(mockPostMessage).toHaveBeenCalledWith({ type: RESET })
            })
    })
    it('handles setting validity', () => {
        return expectSaga(workersSaga)
            .provide([[select(getAllWorkers), { test: new Worker('/foo') }]])
            .dispatch({
                payload: { index: 0, letter: 'A', row: 0, valid: false },
                type: SET_KNOWN_LETTER_VALIDITY,
            })
            .run()
            .then(() => {
                expect(mockPostMessage).toHaveBeenCalledWith({
                    payload: {
                        index: 0,
                        letter: 'A',
                        row: 0,
                        valid: false,
                    },
                    type: 'UPDATE_LETTERS',
                })
            })
    })
})
