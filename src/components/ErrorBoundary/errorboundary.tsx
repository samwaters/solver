import * as React from 'react'
import { Error } from 'components/ErrorBoundary/error'

interface ErrorBoundaryProps {
  children: React.ReactNode | React.ReactNode[]
}

interface ErrorBoundaryState {
  error: string
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { error: "", hasError: false };
  }

  static getDerivedStateFromError(e: Error) {
    return { error: e.message, hasError: true };
  }

  render() {
    return this.state.hasError ? <Error error={this.state.error} /> : this.props.children;
  }
}
