import { AppState } from 'reducers/index'
import { getWordsStartingWith } from 'selectors/words.selectors'

describe('selectors/words.selectors', () => {
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
        words: {
            A: ['ABC', 'ACD'],
            B: ['BCD', 'BDE'],
        },
    }
    it('Should get words starting with valid letters', () => {
        expect(getWordsStartingWith('A')(appState)).toStrictEqual([
            'ABC',
            'ACD',
        ])
        expect(getWordsStartingWith('B')(appState)).toStrictEqual([
            'BCD',
            'BDE',
        ])
    })
    it('Should handle getting words starting with invalid letters', () => {
        expect(getWordsStartingWith('C')(appState)).toStrictEqual([])
    })
})
