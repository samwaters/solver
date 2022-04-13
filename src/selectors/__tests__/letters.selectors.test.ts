import { AppState } from 'reducers/index'
import {
    getFocussedLetter,
    getLetterById,
    isLetterFocussed,
} from 'selectors/letters.selectors'

describe('selectors/letters.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: false,
        },
        letters: {
            focus: {
                index: 1,
                row: 2,
            },
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
    it('Should get the focussed letter', () => {
        expect(getFocussedLetter(appState)).toStrictEqual({
            index: 1,
            row: 2,
        })
    })
    it('Should check if a letter is focussed', () => {
        expect(isLetterFocussed(2, 1)(appState)).toBeTruthy()
        expect(isLetterFocussed(1, 2)(appState)).toBeFalsy()
    })
})
