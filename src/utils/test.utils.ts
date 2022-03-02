import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import { AppState } from 'reducers/index'

const mockStoreState: AppState = {
    bootstrap: {
        ready: true,
    },
    letters: {
        invalidLetters: {},
        knownLetters: {
            0: { letter: 'A', valid: true },
            1: { letter: 'B', valid: false },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
    },
}

export const getStore = () => {
    const mockStore = configureStore<AppState>([])
    return mockStore(mockStoreState)
}
