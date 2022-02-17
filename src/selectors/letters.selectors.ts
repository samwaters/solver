import { AppState } from 'reducers/index'

export const getLetterById = (id: number) => (state: AppState) => state.letters.knownLetters[id]
export const getInvalidLetters = (state: AppState) => state.letters.invalidLetters
