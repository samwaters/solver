import { bootstrapReducer, BootstrapState } from 'reducers/bootstrap.reducer'
import { bootstrap, ready } from 'actions/bootstrap.actions'

describe('reducers/bootstrap.reducer', () => {
    const initialState: BootstrapState = {
        bootstrap: false,
        ready: false,
    }
    it('Handles the BOOTSTRAP action', () => {
        const newState: BootstrapState = bootstrapReducer(
            initialState,
            bootstrap()
        )
        expect(newState.bootstrap).toBeTruthy()
        expect(newState.ready).toBeFalsy()
    })
    it('Handles the READY action', () => {
        const newState: BootstrapState = bootstrapReducer(initialState, ready())
        expect(newState.bootstrap).toBeFalsy()
        expect(newState.ready).toBeTruthy()
    })
    it('Ignores other actions', () => {
        const newState: BootstrapState = bootstrapReducer(initialState, {
            type: 'FOO',
        })
        expect(newState).toStrictEqual(initialState)
    })
})
