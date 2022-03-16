import { AppState } from 'reducers/index'

export const isReady = (state: AppState) => state.bootstrap.ready
