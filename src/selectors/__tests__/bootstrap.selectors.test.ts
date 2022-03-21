import { AppState } from 'reducers/index'
import { isBootstrapped, isReady } from 'selectors/bootstrap.selectors'

describe('selectors/bootstrap.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: true,
        },
        letters: {
            knownLetters: {},
        },
        solutions: {},
        words: {},
        workers: {},
    }
    it('Should get the bootstrapped state', () => {
        expect(isBootstrapped(appState)).toBeFalsy()
    })
    it('Should get the ready state', () => {
        expect(isReady(appState)).toBeTruthy()
    })
})
