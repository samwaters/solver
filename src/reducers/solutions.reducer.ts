import { Action } from 'actions/action.interface'
import { ADD_SOLUTIONS, CLEAR_SOLUTIONS } from 'actions/solutions.actions'

export interface SolutionsState {
    [workerId: number]: string[]
}

const initialState: SolutionsState = {}

export const solutionsReducer = (
    state: SolutionsState = initialState,
    action: Action
): SolutionsState => {
    switch (action.type) {
        case ADD_SOLUTIONS:
            return {
                ...state,
                [action.payload.workerId]: action.payload.solutions,
            }
        case CLEAR_SOLUTIONS:
            return initialState
        default:
            return state
    }
}
