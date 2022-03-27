import { solutionsReducer, SolutionsState } from 'reducers/solutions.reducer'
import { addSolutions, clearSolutions } from 'actions/solutions.actions'
import { reset } from 'actions/reset.actions'

describe('reducers/bootstrap.reducer', () => {
    it('Handles the ADD_SOLUTIONS action', () => {
        const newState: SolutionsState = solutionsReducer(
            undefined,
            addSolutions(['FOO', 'BAR'], 0)
        )
        expect(newState).toStrictEqual({
            0: ['FOO', 'BAR'],
        })
    })
    it('Handles the CLEAR_SOLUTIONS action', () => {
        const newState: SolutionsState = solutionsReducer(
            undefined,
            addSolutions(['FOO', 'BAR'], 0)
        )
        expect(solutionsReducer(newState, clearSolutions())).toStrictEqual({})
    })
    it('Handles the RESET action', () => {
        const newState: SolutionsState = solutionsReducer(
            undefined,
            addSolutions(['FOO', 'BAR'], 0)
        )
        expect(solutionsReducer(newState, reset())).toStrictEqual({})
    })
})
