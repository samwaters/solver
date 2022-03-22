import { lettersReducer, LettersState } from 'reducers/letters.reducer'
import {
    addKnownLetter,
    removeKnownLetter,
    setKnownLetterValidity,
} from 'actions/letters.actions'

describe('reducers/letters.reducer', () => {
    const initialState: LettersState = {
        knownLetters: {
            0: {
                0: { letter: '', valid: null },
                1: { letter: '', valid: null },
                2: { letter: '', valid: null },
                3: { letter: '', valid: null },
                4: { letter: '', valid: null },
            },
        },
    }

    it('Handles the ADD_KNOWN_LETTER action', () => {
        const newStateInvalid: LettersState = lettersReducer(
            initialState,
            addKnownLetter(0, 0, 'A')
        )
        expect(newStateInvalid.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        const newStateValid: LettersState = lettersReducer(
            initialState,
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
            initialState,
            addKnownLetter(0, 0, 'A')
        )
        expect(newState.knownLetters[0][0]).toStrictEqual({
            letter: 'A',
            valid: false,
        })
        // Now remove it
        newState = lettersReducer(newState, removeKnownLetter(0, 0))
        expect(newState).toStrictEqual(initialState)
    })
    it('Handles the SET_KNOWN_LETTER_VISIBILITY action', () => {
        // Add the known letter
        let newState: LettersState = lettersReducer(
            initialState,
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
    it('Ignores other actions', () => {
        const newState: LettersState = lettersReducer(initialState, {
            type: 'FOO',
        })
        expect(newState).toStrictEqual(initialState)
    })
})
