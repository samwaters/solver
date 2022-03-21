import { AppState } from 'reducers/index'
import { getLetterById } from 'selectors/letters.selectors'

describe('selectors/letters.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: false,
        },
        letters: {
            knownLetters: {
                0: {
                    0: { letter: 'B', valid: true },
                    1: { letter: '', valid: null },
                    2: { letter: '', valid: null },
                    3: { letter: '', valid: null },
                    4: { letter: '', valid: null },
                },
            },
        },
        solutions: {},
        words: {},
        workers: {},
    }
    it('Should get a known letter', () => {
        expect(getLetterById(0, 0)(appState)).toStrictEqual({
            letter: 'B',
            valid: true,
        })
    })
})
