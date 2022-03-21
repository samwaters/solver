import { solutionsReducer, SolutionsState } from 'reducers/solutions.reducer'
import { addSolutions, clearSolutions } from 'actions/solutions.actions'

describe('reducers/bootstrap.reducer', () => {
    const initialState: SolutionsState = {}

    it('Handles the ADD_SOLUTIONS action', () => {
        const newState: SolutionsState = solutionsReducer(
            initialState,
            addSolutions(['FOO', 'BAR'], 0)
        )
        expect(newState).toStrictEqual({
            0: ['FOO', 'BAR'],
        })
    })
    it('Handles the CLEAR_SOLUTIONS action', () => {
        const newState: SolutionsState = solutionsReducer(
            initialState,
            addSolutions(['FOO', 'BAR'], 0)
        )
        expect(solutionsReducer(newState, clearSolutions())).toStrictEqual(
            initialState
        )
    })
    it('Ignores other actions', () => {
        const newState: SolutionsState = solutionsReducer(initialState, {
            type: 'FOO',
        })
        expect(newState).toStrictEqual(initialState)
    })
})
