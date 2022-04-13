import * as React from 'react'
import { Error } from 'components/ErrorBoundary/error'

interface ErrorBoundaryProps {
    children: React.ReactNode | React.ReactNode[]
}

interface ErrorBoundaryState {
    error: string
    hasError: boolean
    stack: string
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props) {
        super(props)
        this.state = { error: '', hasError: false, stack: '' }
    }

    static getDerivedStateFromError(e: Error) {
        return { error: e.message, hasError: true, stack: e.stack }
    }

    render() {
        return this.state.hasError ? (
            <Error error={this.state.error} stack={this.state.stack} />
        ) : (
            this.props.children
        )
    }
}
