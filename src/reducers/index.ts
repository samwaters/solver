import { combineReducers } from 'redux'
import { bootstrapReducer, BootstrapState } from './bootstrap.reducer'

export interface AppState {
  bootstrap: BootstrapState
}

export const createRootReducer = () => combineReducers({
  bootstrap: bootstrapReducer,
})
