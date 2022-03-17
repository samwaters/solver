import { combineReducers } from 'redux'
import { bootstrapReducer, BootstrapState } from './bootstrap.reducer'
import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import { wordsReducer, WordsState } from 'reducers/words.reducer'

export interface AppState {
    bootstrap: BootstrapState
    letters: LettersState
    words: WordsState
}

export const createRootReducer = () =>
    combineReducers({
        bootstrap: bootstrapReducer,
        letters: lettersReducer,
        words: wordsReducer,
    })
