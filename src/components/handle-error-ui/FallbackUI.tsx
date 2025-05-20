type FallbackProps = {
    error: Error
}

function FallbackUI({ error }: FallbackProps) {
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
                <pre>{error.message}</pre>
            </details>
        </div>
    )
}

export default FallbackUI