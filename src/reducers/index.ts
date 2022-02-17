import { combineReducers } from 'redux'
import { bootstrapReducer, BootstrapState } from './bootstrap.reducer'
import { lettersReducer, LettersState } from 'reducers/letters.reducer'

export interface AppState {
  bootstrap: BootstrapState
  letters: LettersState
}

export const createRootReducer = () => combineReducers({
  bootstrap: bootstrapReducer,
  letters: lettersReducer
})
