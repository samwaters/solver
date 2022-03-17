import { Action } from 'actions/action.interface'
import { STORE_WORDS } from 'actions/words.actions'

export interface WordsState {
    [letter: string]: string[]
}

const initialState: WordsState = {}

export const wordsReducer = (
    state: WordsState = initialState,
    action: Action
): WordsState => {
    switch (action.type) {
        case STORE_WORDS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
