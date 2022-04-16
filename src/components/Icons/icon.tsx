import * as React from 'react'
import { Suspense } from 'react'

export enum Icons {
    BACKSPACE = 'backspace',
    TRASH = 'trash',
}

const IconData = {
    [Icons.BACKSPACE]: {
        fill: '#ffffff',
        viewBox: 44.18,
    },
    [Icons.TRASH]: {
        fill: '#ffffff',
        viewBox: 30,
    },
}

interface IconProps {
    height: number
    icon: Icons
    width: number
}

export const Icon = ({ height, icon, width }: IconProps) => {
    const IconPath = React.lazy(() => import(`components/Icons/svg/${icon}`))
    return (
        <Suspense fallback={<>?</>}>
            <svg
                data-testid="icon-svg"
                fill={IconData[icon].fill}
                height={`${height}px`}
                viewBox={`0 0 ${IconData[icon].viewBox} ${IconData[icon].viewBox}`}
                width={`${width}px`}
            >
                <IconPath />
            </svg>
        </Suspense>
    )
}
