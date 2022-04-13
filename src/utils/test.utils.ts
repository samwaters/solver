import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store'
import { AppState } from 'reducers/index'
require('isomorphic-fetch')

const mockStoreState: AppState = {
    bootstrap: {
        bootstrap: true,
        ready: true,
    },
    letters: {
        focus: {
            index: -1,
            row: -1,
        },
        knownLetters: {
            0: {
                0: { letter: 'A', valid: true },
                1: { letter: 'B', valid: false },
                2: { letter: 'C', valid: null },
                3: { letter: '', valid: null },
                4: { letter: '', valid: null },
            },
        },
    },
    solutions: {
        'A-C': ['apple', 'banana', 'carrot'],
    },
    words: {},
    workers: {},
}

export const getStore = () => {
    const mockStore = configureStore<AppState>([])
    return mockStore(mockStoreState)
}
