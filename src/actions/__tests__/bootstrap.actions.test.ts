import { BOOTSTRAP, bootstrap, READY, ready } from 'actions/bootstrap.actions'

describe('actions/bootstrap.actions', () => {
    it('Creates the BOOTSTRAP action', () => {
        expect(bootstrap()).toStrictEqual({
            type: BOOTSTRAP,
        })
    })
    it('Creates the READY action', () => {
        expect(ready()).toStrictEqual({
            type: READY,
        })
    })
})
