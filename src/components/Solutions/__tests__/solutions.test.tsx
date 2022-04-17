import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from 'utils/test.utils'
import { Solutions } from 'components/Solutions/solutions'

describe('components/solutions', () => {
    it('Renders the solutions', () => {
        render(
            <TestWrapper>
                <Solutions />
            </TestWrapper>
        )
        expect(screen.getByTestId('solutions-container')).toBeInTheDocument()
        expect(screen.getByTestId('solutions-title')).toBeInTheDocument()
        expect(
            screen.getByTestId('solutions-list-container')
        ).toBeInTheDocument()
        expect(screen.getByTestId('solutions-container')).toHaveStyle(`
            margin: 10px 0 0 10px;
            width: 300px;
        `)
        expect(screen.getByTestId('solutions-title')).toHaveTextContent(
            'Possible Solutions'
        )
        expect(
            screen.getByTestId('solutions-list-container')
        ).toHaveTextContent('applebananacarrot')
        expect(screen.getByTestId('solutions-list-container')).toHaveStyle(`
            border-color: #454545;
            border-style: solid;
            border-width: 0 1px 1px 1px;
            max-height: 380px;
            overflow-y: auto;
        `)
    })
})
