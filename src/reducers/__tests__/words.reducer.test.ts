import { wordsReducer, WordsState } from 'reducers/words.reducer'
import { storeWords } from 'actions/words.actions'

describe('reducers/bootstrap.reducer', () => {
    const initialState: WordsState = {}

    it('Handles the STORE_WORDS action', () => {
        const newState: WordsState = wordsReducer(
            initialState,
            storeWords({
                A: ['ABC'],
                B: ['BCD'],
            })
        )
        expect(newState).toStrictEqual({
            A: ['ABC'],
            B: ['BCD'],
        })
    })
    it('Ignores other actions', () => {
        const newState: WordsState = wordsReducer(initialState, {
            type: 'FOO',
        })
        expect(newState).toStrictEqual(initialState)
    })
})
