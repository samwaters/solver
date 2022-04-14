import * as React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { Icon, IconColors, Icons } from 'components/Icons/icon'
import TrashIcon from 'components/Icons/svg/trash'

describe('components/Icons', () => {
    it('Should render an icon', async () => {
        act(() => {
            render(
                <Icon
                    color={IconColors.BLACK}
                    height={20}
                    icon={Icons.TRASH}
                    width={20}
                />
            )
        })
        await waitFor(() =>
            expect(screen.queryByTestId('icon-svg')).toBeInTheDocument()
        )
    })

    it('Renders the trash icon', () => {
        let icon
        act(() => {
            icon = render(<TrashIcon />)
        })
        expect(icon).toMatchSnapshot()
    })
})
