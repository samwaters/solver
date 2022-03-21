import { AppState } from 'reducers/index'
import { getWordsStartingWith } from 'selectors/words.selectors'

describe('selectors/words.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: false,
        },
        letters: {
            knownLetters: {},
        },
        solutions: {},
        words: {
            A: ['ABC', 'ACD'],
            B: ['BCD', 'BDE'],
        },
        workers: {},
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
