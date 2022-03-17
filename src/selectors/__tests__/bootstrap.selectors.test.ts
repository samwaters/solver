import { AppState } from 'reducers/index'
import { isBootstrapped, isReady } from 'selectors/bootstrap.selectors'

describe('selectors/bootstrap.selectors', () => {
    const appState: AppState = {
        bootstrap: {
            bootstrap: false,
            ready: true,
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
        words: {},
    }
    it('Should get the bootstrapped state', () => {
        expect(isBootstrapped(appState)).toBeFalsy()
    })
    it('Should get the ready state', () => {
        expect(isReady(appState)).toBeTruthy()
    })
})
