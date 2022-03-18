export const INITIALISE_WORKER = 'INITIALISE_WORKER'
export const REGISTER_WORKER = 'REGISTER_WORKER'
export const UNREGISTER_WORKER = 'UNREGISTER_WORKER'

export const initialiseWorker = (id: string, letters: string[]) => ({
    type: INITIALISE_WORKER,
    payload: {
        id,
        letters,
    },
})

export const registerWorker = (id: string, worker: Worker) => ({
    type: REGISTER_WORKER,
    payload: {
        id,
        worker,
    },
})

export const unregisterWorker = (id: string) => ({
    type: UNREGISTER_WORKER,
    payload: id,
})
