import { AppState } from 'reducers/index'
import { getInvalidLetters, getLetterById } from 'selectors/letters.selectors'

describe('selectors/letters.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: false,
        },
        letters: {
            invalidLetters: {
                0: 'A',
            },
            knownLetters: {
                0: { letter: 'B', valid: true },
                1: { letter: '', valid: null },
                2: { letter: '', valid: null },
                3: { letter: '', valid: null },
                4: { letter: '', valid: null },
            },
        },
    }
    it('Should get a known letter', () => {
        expect(getLetterById(0)(appState)).toStrictEqual({
            letter: 'B',
            valid: true,
        })
    })
    it('Should get the invalid letters', () => {
        expect(getInvalidLetters(appState)).toStrictEqual({ 0: 'A' })
    })
})
