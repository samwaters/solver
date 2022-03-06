import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import {
    addInvalidLetter,
    addKnownLetter,
    removeInvalidLetter,
    removeKnownLetter,
    setKnownLetterValidity,
} from 'actions/letters.actions'

describe('reducers/letters.reducer', () => {
    const initialState: LettersState = {
        invalidLetters: {},
        knownLetters: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
    }

    it('Handles the ADD_INVALID_LETTER action', () => {
        const newState: LettersState = lettersReducer(
            initialState,
            addInvalidLetter('0', 'A')
        )
        expect(newState.invalidLetters).toStrictEqual({
            '0': 'A',
        })
    })
    it('Handles the ADD_KNOWN_LETTER action', () => {
        const newStateInvalid: LettersState = lettersReducer(
            initialState,
            addKnownLetter(0, 'A')
        )
        expect(newStateInvalid.knownLetters['0']).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        const newStateValid: LettersState = lettersReducer(
            initialState,
            addKnownLetter(1, 'B', true)
        )
        expect(newStateValid.knownLetters['1']).toStrictEqual({
            letter: 'B',
            valid: true,
        })
    })
    it('Handles the REMOVE_INVALID_LETTER action', () => {
        // First add the invalid letter
        let newState: LettersState = lettersReducer(
            initialState,
            addInvalidLetter('0', 'A')
        )
        expect(newState.invalidLetters).toStrictEqual({
            '0': 'A',
        })
        // Now remove it
        newState = lettersReducer(newState, removeInvalidLetter('0'))
        expect(newState).toStrictEqual(initialState)
    })
    it('Handles the REMOVE_KNOWN_LETTER action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            initialState,
            addKnownLetter(0, 'A')
        )
        expect(newState.knownLetters['0']).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        // Now remove it
        newState = lettersReducer(newState, removeKnownLetter(0))
        expect(newState).toStrictEqual(initialState)
    })
    it('Handles the SET_KNOWN_LETTER_VISIBILITY action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            initialState,
            addKnownLetter(0, 'A')
        )
        expect(newState.knownLetters['0']).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        newState = lettersReducer(newState, setKnownLetterValidity(0, true))
        expect(newState.knownLetters['0']).toStrictEqual({
            letter: 'A',
            valid: true,
        })
    })
    it('Ignores other actions', () => {
        const newState: LettersState = lettersReducer(initialState, {
            type: 'FOO',
        })
        expect(newState).toStrictEqual(initialState)
    })
})
