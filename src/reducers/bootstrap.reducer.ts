import { Action } from 'actions/action.interface'
import { BOOTSTRAP, READY } from 'actions/bootstrap.actions'

export interface BootstrapState {
    bootstrap: boolean
    ready: boolean
}

const initialState: BootstrapState = {
    bootstrap: false,
    ready: false,
}

export const bootstrapReducer = (
    state: BootstrapState = initialState,
    action: Action
) => {
    switch (action.type) {
        case BOOTSTRAP:
            return { ...state, bootstrap: true }
        case READY:
            return { ...state, ready: true }
        default:
            return state
    }
}
