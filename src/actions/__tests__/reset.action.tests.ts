import { RESET, reset } from 'actions/reset.actions'

describe('actions/reset.actions', () => {
    it('Creates the RESET action', () => {
        expect(reset()).toStrictEqual({
            type: RESET,
        })
    })
})
