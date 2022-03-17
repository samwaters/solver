import { AppState } from 'reducers/index'

export const isBootstrapped = (state: AppState) => state.bootstrap.bootstrap
export const isReady = (state: AppState) => state.bootstrap.ready
