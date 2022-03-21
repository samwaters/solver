import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getAllSolutions } from 'selectors/solutions.selectors'

const SolutionsContainer = styled.div`
    margin: 10px 0 0 10px;
    width: 300px;
`

const SolutionsTitle = styled.h1`
    background-color: #454545;
    border-radius: 5px 5px 0 0;
    color: white;
    padding: 10px;
    width: 100%;
`

const SolutionsListContainer = styled.div`
    border-color: #454545;
    border-style: solid;
    border-width: 0 1px 1px 1px;
    max-height: 380px;
    overflow-y: auto;
`

const SolutionsList = styled.ul``

const SolutionsListItem = styled.li`
    color: white;
    padding: 5px 10px;
    :nth-child(even) {
        background-color: #777c7e;
    }
`

export const Solutions = () => {
    const solutions = useSelector(getAllSolutions)
    return (
        <SolutionsContainer>
            <SolutionsTitle>Possible Solutions</SolutionsTitle>
            <SolutionsListContainer>
                <SolutionsList>
                    {solutions.map((solution, id) => (
                        <SolutionsListItem key={id}>
                            {solution}
                        </SolutionsListItem>
                    ))}
                </SolutionsList>
            </SolutionsListContainer>
        </SolutionsContainer>
    )
}
