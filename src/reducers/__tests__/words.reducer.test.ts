import { wordsReducer, WordsState } from 'reducers/words.reducer'
import { storeWords } from 'actions/words.actions'

describe('reducers/bootstrap.reducer', () => {
    it('Handles the STORE_WORDS action', () => {
        const newState: WordsState = wordsReducer(
            undefined,
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
})
