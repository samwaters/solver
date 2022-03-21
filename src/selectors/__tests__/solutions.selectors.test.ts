import { AppState } from 'reducers/index'
import {
    getAllSolutions,
    getSolutionsById,
} from 'selectors/solutions.selectors'

describe('selectors/words.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: false,
        },
        letters: {
            knownLetters: {},
        },
        solutions: {
            0: ['FOO', 'BAR'],
            1: ['BAZ', 'BAT'],
        },
        words: {},
        workers: {},
    }
    it('Should get all solutions', () => {
        expect(getAllSolutions(appState)).toStrictEqual([
            'FOO',
            'BAR',
            'BAZ',
            'BAT',
        ])
    })
    it('Should get solutions for a specific worker', () => {
        expect(getSolutionsById(0)(appState)).toStrictEqual(['FOO', 'BAR'])
    })
})
