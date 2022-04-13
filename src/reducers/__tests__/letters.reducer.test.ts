import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import {
    focusLetter,
    removeKnownLetter,
    storeKnownLetter,
} from 'actions/letters.actions'
import { reset } from 'actions/reset.actions'

describe('reducers/letters.reducer', () => {
    it('Handles the FOCUS_LETTER action', () => {
        const newState: LettersState = lettersReducer(
            undefined,
            focusLetter(2, 1)
        )
        expect(newState.focus).toStrictEqual({
            index: 1,
            row: 2,
        })
    })
    it('Handles the REMOVE_KNOWN_LETTER action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            undefined,
            storeKnownLetter(0, 1, 'A', false)
        )
        expect(newState.knownLetters[0][1]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        // Now remove it
        newState = lettersReducer(newState, removeKnownLetter(0, 1))
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: '',
            valid: null,
        })
    })
    it('Handles RESET', () => {
        // Add a known letter
        let newState: LettersState = lettersReducer(
            undefined,
            storeKnownLetter(0, 0, 'A', false)
        )
        // Now remove it
        newState = lettersReducer(newState, reset())
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: '',
            valid: null,
        })
    })
    it('Handles the STORE_KNOWN_LETTER action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            undefined,
            storeKnownLetter(0, 0, 'A', false)
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        newState = lettersReducer(newState, storeKnownLetter(0, 0, 'A', true))
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: true,
        })
    })
})
