import { Action } from 'actions/action.interface'
import { REGISTER_WORKER, UNREGISTER_WORKER } from 'actions/workers.actions'

export interface WorkersState {
    [id: string]: Worker
}

const initialState: WorkersState = {}

export const workersReducer = (
    state: WorkersState = initialState,
    action: Action
) => {
    switch (action.type) {
        case REGISTER_WORKER:
            return {
                ...state,
                [action.payload.id]: action.payload.worker,
            }
        case UNREGISTER_WORKER:
            // eslint-disable-next-line no-case-declarations
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        default:
            return state
    }
}
