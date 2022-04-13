import {
    ADD_KNOWN_LETTER,
    addKnownLetter,
    FOCUS_LETTER,
    focusLetter,
    removeKnownLetter,
    STORE_KNOWN_LETTER,
    storeKnownLetter,
} from 'actions/letters.actions'

describe('actions/letters.actions', () => {
    it('Creates the ADD_KNOWN_LETTER action', () => {
        expect(addKnownLetter('A', false)).toStrictEqual({
            payload: {
                letter: 'A',
                valid: false,
            },
            type: ADD_KNOWN_LETTER,
        })
    })
    it('Creates the FOCUS_LETTER action', () => {
        expect(focusLetter(0, 1)).toStrictEqual({
            type: FOCUS_LETTER,
            payload: {
                row: 0,
                index: 1,
            },
        })
    })
    it('Creates the REMOVE_KNOWN_LETTER action', () => {
        expect(removeKnownLetter(0, 1)).toStrictEqual({
            payload: {
                index: 1,
                letter: '',
                row: 0,
                valid: null,
            },
            type: STORE_KNOWN_LETTER,
        })
    })
    it('Creates the STORE_KNOWN_LETTER action', () => {
        expect(storeKnownLetter(0, 1, 'A', true)).toStrictEqual({
            payload: {
                index: 1,
                letter: 'A',
                row: 0,
                valid: true,
            },
            type: STORE_KNOWN_LETTER,
        })
    })
})
