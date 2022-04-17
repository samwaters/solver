import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from 'styled-components'
import { AppState } from 'reducers/index'
import { theme } from 'theme/theme'
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

export const testStore = getStore()
export const TestWrapper = ({
    children,
}: {
    children: ReactNode | ReactNode[]
}) => (
    <Provider store={testStore}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
)
