import { expectSaga } from 'redux-saga-test-plan'
import { lettersSaga } from 'sagas/letters.saga'
import { ADD_KNOWN_LETTER, STORE_KNOWN_LETTER } from 'actions/letters.actions'
import { getFocussedLetter } from 'selectors/letters.selectors'

jest.mock('../../selectors/letters.selectors', () => ({
    getFocussedLetter: () => ({ row: 0, index: 1 }),
    getLetterById: () => () => ({ row: 0, index: 1, letter: 'A', valid: true }),
}))

describe('sagas/letters.saga', () => {
    it('Performs the store letter actions when a letter is selected', () => {
        return expectSaga(lettersSaga)
            .dispatch({ type: ADD_KNOWN_LETTER, payload: { letter: 'A' } })
            .select(getFocussedLetter)
            .put({
                type: STORE_KNOWN_LETTER,
                payload: {
                    index: 1,
                    letter: 'A',
                    row: 0,
                    valid: true,
                },
            })
            .run()
    })
})
