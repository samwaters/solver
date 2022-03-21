import { combineReducers } from 'redux'
import { bootstrapReducer, BootstrapState } from './bootstrap.reducer'
import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import { wordsReducer, WordsState } from 'reducers/words.reducer'
import { workersReducer, WorkersState } from 'reducers/workers.reducer'
import { solutionsReducer, SolutionsState } from 'reducers/solutions.reducer'

export interface AppState {
    bootstrap: BootstrapState
    letters: LettersState
    solutions: SolutionsState
    words: WordsState
    workers: WorkersState
}

export const createRootReducer = () =>
    combineReducers({
        bootstrap: bootstrapReducer,
        letters: lettersReducer,
        solutions: solutionsReducer,
        words: wordsReducer,
        workers: workersReducer,
    })
