export default function Warning() {
    return (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1>Service unavailable</h1>
            <p>Please select Ropsten or your local node and reload the page.</p>
            <button className="btn btn-primary " onClick={() => window.location.reload()}>
                Refresh Page
            </button>
        </div>
    )
}
