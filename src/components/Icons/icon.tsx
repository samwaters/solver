import * as React from 'react'
import { Suspense } from 'react'

export enum Icons {
    TRASH = 'trash',
}

export enum IconColors {
    BLACK = '#000000',
    WHITE = '#ffffff',
}

interface IconProps {
    color: IconColors
    height: number
    icon: Icons
    width: number
}

export const Icon = ({ color, height, icon, width }: IconProps) => {
    const IconPath = React.lazy(() => import(`components/Icons/svg/${icon}`))
    return (
        <Suspense fallback={<>?</>}>
            <svg
                data-testid="icon-svg"
                fill={color}
                height={`${height}px`}
                viewBox={`0 0 30 30`}
                width={`${width}px`}
            >
                <IconPath />
            </svg>
        </Suspense>
    )
}
