import { AppState } from 'reducers/index'

export const getWordsStartingWith = (letter: string) => (state: AppState) =>
    state.words[letter] || []
