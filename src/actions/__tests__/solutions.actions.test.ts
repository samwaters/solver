import {
    ADD_SOLUTIONS,
    addSolutions,
    CLEAR_SOLUTIONS,
    clearSolutions,
} from 'actions/solutions.actions'

describe('actions/solutions.actions', () => {
    it('Creates the ADD_SOLUTIONS action', () => {
        expect(addSolutions(['apple'], 1)).toStrictEqual({
            payload: {
                solutions: ['apple'],
                workerId: 1,
            },
            type: ADD_SOLUTIONS,
        })
    })
    it('Creates the READY action', () => {
        expect(clearSolutions()).toStrictEqual({
            type: CLEAR_SOLUTIONS,
        })
    })
})
