import { AppState } from 'reducers/index'
import { getAllWorkers } from 'selectors/workers.selectors'

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
        words: {},
        workers: {
            A: null,
        },
    }
    it('Should get workers', () => {
        expect(getAllWorkers(appState)).toHaveProperty('A')
    })
})
