import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import {
    addKnownLetter,
    removeKnownLetter,
    setKnownLetterValidity,
} from 'actions/letters.actions'
import { reset } from 'actions/reset.actions'

describe('reducers/letters.reducer', () => {
    it('Handles the ADD_KNOWN_LETTER action', () => {
        const newStateInvalid: LettersState = lettersReducer(
            undefined,
            addKnownLetter(0, 0, 'A')
        )
        expect(newStateInvalid.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        const newStateValid: LettersState = lettersReducer(
            undefined,
            addKnownLetter(0, 1, 'B', true)
        )
        expect(newStateValid.knownLetters[0][1]).toStrictEqual({
            letter: 'B',
            valid: true,
        })
    })
    it('Handles the REMOVE_KNOWN_LETTER action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            undefined,
            addKnownLetter(0, 0, 'A')
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        // Now remove it
        newState = lettersReducer(newState, removeKnownLetter(0, 0))
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: '',
            valid: null,
        })
    })
    it('Handles RESET', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            undefined,
            addKnownLetter(0, 0, 'A')
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        // Now remove it
        newState = lettersReducer(newState, reset())
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: '',
            valid: null,
        })
    })
    it('Handles the SET_KNOWN_LETTER_VISIBILITY action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            undefined,
            addKnownLetter(0, 0, 'A')
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        newState = lettersReducer(
            newState,
            setKnownLetterValidity(0, 0, 'A', true)
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: true,
        })
    })
})
