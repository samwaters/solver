import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Icon, IconColors, Icons } from 'components/Icons/icon'
import TrashIcon from 'components/Icons/svg/trash'

describe('components/Icons', () => {
    it('Should render an icon', () => {
        render(
            <Icon
                color={IconColors.BLACK}
                height={20}
                icon={Icons.TRASH}
                width={20}
            />
        )
        expect(screen.queryByTestId('icon-svg')).toBeInTheDocument()
    })

    it('Renders the trash icon', () => {
        const icon = render(<TrashIcon />)
        expect(icon).toMatchSnapshot()
    })
})
