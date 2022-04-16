import * as React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Icon, Icons } from 'components/Icons/icon'
import BackspaceIcon from 'components/Icons/svg/backspace'
import TrashIcon from 'components/Icons/svg/trash'

describe('components/Icons', () => {
    it('Should render an icon', async () => {
        act(() => {
            render(<Icon height={20} icon={Icons.TRASH} width={20} />)
        })
        await waitFor(() =>
            expect(screen.queryByTestId('icon-svg')).toBeInTheDocument()
        )
    })

    it('Renders the backspace icon', () => {
        let icon
        act(() => {
            icon = render(<BackspaceIcon />)
        })
        expect(icon).toMatchSnapshot()
    })

    it('Renders the trash icon', () => {
        let icon
        act(() => {
            icon = render(<TrashIcon />)
        })
        expect(icon).toMatchSnapshot()
    })
})
