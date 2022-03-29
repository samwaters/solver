import {
    ADD_KNOWN_LETTER,
    addKnownLetter,
    REMOVE_KNOWN_LETTER,
    removeKnownLetter,
    SET_KNOWN_LETTER_VALIDITY,
    setKnownLetterValidity,
} from 'actions/letters.actions'

describe('actions/letters.actions', () => {
    it('Creates the ADD_KNOWN_LETTER action', () => {
        expect(addKnownLetter(0, 1, 'A', false)).toStrictEqual({
            payload: {
                index: 1,
                letter: 'A',
                row: 0,
                valid: false,
            },
            type: ADD_KNOWN_LETTER,
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
            type: REMOVE_KNOWN_LETTER,
        })
    })
    it('Creates the SET_KNOWN_LETTER_VALIDITY action', () => {
        expect(setKnownLetterValidity(0, 1, 'A', true)).toStrictEqual({
            payload: {
                index: 1,
                letter: 'A',
                row: 0,
                valid: true,
            },
            type: SET_KNOWN_LETTER_VALIDITY,
        })
    })
})
