import React from 'react'

type ErrorBoundaryProps = {
    children: React.ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
    errorMessage: string | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps){
        super(props)
        this.state = {
            hasError: false,
            errorMessage: null
        }
    }

    static getDerivedStateFromError(error: Error){
        return { hasError: true, errorMessage: error.message }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error caught by ErrorBoundary", error, errorInfo)
    }

    render(){
        if(this.state.hasError){
            return (
                <div className='flex flex-col items-center justify-center min-h-screen text-center'>
                    <h1 className='text-2xl font-semibold text-red-600'>
                        Something went wrong 😢
                    </h1>
                    <p className='text-lg mt-2'>
                        We couldn't connect to the database. Please try again later.
                    </p>
                    <details className='mt-4 text-sm text-gray-500'>
                        <summary>Details</summary>
                        <pre>{this.state.errorMessage}</pre>
                    </details>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary