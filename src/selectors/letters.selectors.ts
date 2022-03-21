import { AppState } from 'reducers/index'

export const getLetterById = (row: number, id: number) => (state: AppState) =>
    state.letters.knownLetters[row][id]
