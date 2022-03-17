import { Action } from 'actions/action.interface'
import { WordsState } from 'reducers/words.reducer'

export const STORE_WORDS = 'STORE_WORDS'

export const storeWords = (words: WordsState): Action => ({
    type: STORE_WORDS,
    payload: words,
})
