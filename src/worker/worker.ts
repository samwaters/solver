enum Commands {
    LOAD_DATA = 'LOAD_DATA',
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
                ...knownLetters[currentRow].reduce(
                    (rowAccumulator, currentLetter) => {
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
    let solutions = []
    // Find the positions of the known letters
    const letterPositions = Object.keys(knownLetters)
        .reduce(
            (acc, cur) => {
                return knownLetters[cur].map(
                    (
                        l: { valid: boolean; letter: string },
                        i: string | number
                    ) => {
                        // Already a known letter?
                        if (typeof acc[i] === 'string' && acc[i] !== '.')
                            return acc[i]
                        // Valid letter, priority
                        if (l.valid) return l.letter
                        // No letter
                        if (l.letter === '') return acc[i]
                        // Invalid letter
                        return Array.isArray(acc[i])
                            ? [...acc[i], l.letter]
                            : [l.letter]
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
    words.every((word) => {
        if (!working) {
            solutions = []
            return false
        }
        // Does this word contain any of the invalid letters?
        if (invalidLetters.some((letter) => word.includes(letter))) {
            // There's at least one invalid letter, skip this word
            return true
        }
        // Test against the pattern
        if (!letterPattern.test(word)) {
            // Doesn't match the known letters
            return true
        }
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
