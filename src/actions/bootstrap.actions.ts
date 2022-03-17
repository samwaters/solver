import { Action } from 'actions/action.interface'

export const BOOTSTRAP = 'BOOTSTRAP'
export const READY = 'READY'

export const bootstrap = (): Action => ({
    type: BOOTSTRAP,
})

export const ready = (): Action => ({
    type: READY,
})
