enum Commands {
    LOAD_DATA = 'LOAD_DATA',
    SET_ID = 'SET_ID',
    SET_INVALID_LETTERS = 'SET_INVALID_LETTERS',
    UPDATE_KNOWN_LETTERS = 'UPDATE_KNOWN_LETTERS',
}
let id = ''
let invalidLetters: string[] = []
const knownLetters = {
    0: [
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
    ],
    1: [
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
    ],
    2: [
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
    ],
    3: [
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
    ],
    4: [
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
        { letter: '', valid: false },
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
        case Commands.SET_INVALID_LETTERS:
            working = false
            invalidLetters = message.data.payload
            findSolutions()
            break
        case Commands.UPDATE_KNOWN_LETTERS:
            working = false
            knownLetters[message.data.payload.row] =
                message.data.payload.letters
            findSolutions()
            break
        default:
            console.error('Unknown command sent to worker:', message.data.type)
    }
}

const findSolutions = () => {
    working = true
    let solutions = []
    // Find the positions of the known letters
    const knownLetterPositions = Object.keys(knownLetters)
        .reduce(
            (acc, cur) => {
                return knownLetters[cur].map((l, i) =>
                    l.valid ? l.letter : acc[i]
                )
            },
            ['[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]', '[A-Z]']
        )
        .join('')
    const knownLetterPattern = new RegExp(knownLetterPositions)

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
        // Test the known letters
        if (!knownLetterPattern.test(word)) {
            // Doesn't match the known letters
            return true
        }
        // Find the positions of the
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
