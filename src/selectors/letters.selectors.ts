import { AppState } from 'reducers/index'

export const getFocussedLetter = (state: AppState) => state.letters.focus

export const getLetterById =
    (row: number, index: number) => (state: AppState) =>
        state.letters.knownLetters[row][index]

export const isLetterFocussed =
    (row: number, index: number) => (state: AppState) =>
        state.letters.focus.row === row && state.letters.focus.index === index
