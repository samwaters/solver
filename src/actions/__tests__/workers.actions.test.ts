import {
    INITIALISE_WORKER,
    initialiseWorker,
    REGISTER_WORKER,
    registerWorker,
    UNREGISTER_WORKER,
    unregisterWorker,
} from 'actions/workers.actions'

describe('actions/workers.actions', () => {
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
            onmessage: () => null,
            onmessageerror: () => null,
            postMessage: () => null,
            removeEventListener: () => null,
            terminate: () => null,
        }))
    })
    it('Creates the INITIALISE_WORKER action', () => {
        expect(initialiseWorker('A', ['A'])).toStrictEqual({
            payload: {
                id: 'A',
                letters: ['A'],
            },
            type: INITIALISE_WORKER,
        })
    })
    it('Creates the REGISTER_WORKER action', () => {
        const worker = new Worker('/foo')
        expect(registerWorker('A', worker)).toStrictEqual({
            payload: {
                id: 'A',
                worker,
            },
            type: REGISTER_WORKER,
        })
    })
    it('Creates the UNREGISTER_WORKER action', () => {
        expect(unregisterWorker('A')).toStrictEqual({
            payload: 'A',
            type: UNREGISTER_WORKER,
        })
    })
})
