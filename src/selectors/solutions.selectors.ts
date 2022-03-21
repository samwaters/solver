import { AppState } from 'reducers/index'

export const getAllSolutions = (state: AppState) =>
    Object.keys(state.solutions).reduce((acc, cur) => {
        return [...acc, ...state.solutions[cur]]
    }, [])

export const getSolutionsById = (workerId: number) => (state: AppState) =>
    state.solutions[workerId]
