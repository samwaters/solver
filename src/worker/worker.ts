enum Commands {
    LOAD_DATA = 'LOAD_DATA',
    RESET = 'RESET',
    SET_ID = 'SET_ID',
    UPDATE_LETTERS = 'UPDATE_LETTERS',
}
let id = ''
const knownLetters = {
    0: [
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
    ],
    1: [
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
    ],
    2: [
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
    ],
    3: [
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
    ],
    4: [
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
        { letter: '', valid: null },
    ],
}
let words: string[] = []
let working = false

onmessage = (message: MessageEvent) => {
    switch (message.data.type) {
        case Commands.LOAD_DATA:
            working = false
            words = message.data.payload
            break
        case Commands.RESET:
            Object.keys(knownLetters).forEach((row) => {
                knownLetters[row] = knownLetters[row].map(() => ({
                    letter: '',
                    valid: null,
                }))
            })
            break
        case Commands.SET_ID:
            id = message.data.payload
            break
        case Commands.UPDATE_LETTERS:
            working = false
            knownLetters[message.data.payload.row][message.data.payload.index] =
                {
                    letter: message.data.payload.letter,
                    valid: message.data.payload.valid,
                }
            findSolutions()
            break
        default:
            console.error('Unknown command sent to worker:', message.data.type)
    }
}

const findSolutions = () => {
    working = true
    // Get all the invalid letters
    const invalidLetters = Object.keys(knownLetters).reduce(
        (invalidLettersAccumulator, currentRow) => {
            return [
                ...invalidLettersAccumulator,
                ...Object.keys(knownLetters[currentRow]).reduce(
                    (rowAccumulator, currentKey) => {
                        const currentLetter =
                            knownLetters[currentRow][currentKey]
                        if (
                            currentLetter.letter !== '' &&
                            currentLetter.valid === null
                        )
                            rowAccumulator.push(currentLetter.letter)
                        return rowAccumulator
                    },
                    []
                ),
            ]
        },
        []
    )
    /*
        TODO:
        Fix issue with valid and invalid letters, e.g. BEERS
     */
    const mustContain: string[] = []
    let solutions: string[] = []
    // Find the positions of the known letters
    const letterPositions = Object.keys(knownLetters)
        .reduce(
            (acc, cur) => {
                return Object.keys(knownLetters[cur]).map(
                    (k: string, i: string | number) => {
                        const letter = knownLetters[cur][k]
                        // Already a known letter?
                        if (typeof acc[i] === 'string' && acc[i] !== '.')
                            return acc[i]
                        // Valid letter, priority
                        if (letter.valid) return letter.letter
                        // No letter
                        if (letter.letter === '' || letter.valid === null)
                            return acc[i]
                        // Invalid letter
                        if (!mustContain.includes(letter.letter))
                            mustContain.push(letter.letter)
                        return Array.isArray(acc[i])
                            ? [...acc[i], letter.letter]
                            : [letter.letter]
                    }
                )
            },
            ['.', '.', '.', '.', '.']
        )
        .map((letter: string | string[]) =>
            Array.isArray(letter) ? ['[^', ...letter, ']'].join('') : letter
        )
        .join('')
    const letterPattern = new RegExp(letterPositions)
    // Find the positions of the letters that are in the wrong place
    words.every((word: string) => {
        if (!working) {
            solutions = []
            return false
        }
        const upperWord = word.toUpperCase()
        // Does this word contain any of the invalid letters?
        if (invalidLetters.some((letter) => upperWord.includes(letter))) {
            // There's at least one invalid letter, skip this word
            return true
        }
        // Test against the pattern
        if (!letterPattern.test(upperWord)) {
            // Doesn't match the known letters
            return true
        }
        // Make sure the word contains the letters in the invalid positions
        const doesContain = mustContain.reduce(
            (acc, cur) => (upperWord.includes(cur) ? acc : false),
            true
        )
        if (!doesContain) return true
        // If we get this far, it's valid
        solutions.push(word)
        return true
    })
    // Now send the possible solutions back to the main thread
    postMessage({
        type: 'SOLUTIONS',
        payload: {
            id,
            solutions,
        },
    })
}
