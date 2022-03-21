export const ADD_SOLUTIONS = 'ADD_SOLUTIONS'
export const CLEAR_SOLUTIONS = 'CLEAR_SOLUTIONS'

export const addSolutions = (solutions: string[], workerId: number) => ({
    type: ADD_SOLUTIONS,
    payload: {
        solutions,
        workerId,
    },
})

export const clearSolutions = () => ({
    type: CLEAR_SOLUTIONS,
})
