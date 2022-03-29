import { STORE_WORDS, storeWords } from 'actions/words.actions'

describe('actions/words.actions', () => {
    it('Creates the STORE_WORDS action', () => {
        expect(storeWords({ A: ['apple'] })).toStrictEqual({
            payload: { A: ['apple'] },
            type: STORE_WORDS,
        })
    })
})
