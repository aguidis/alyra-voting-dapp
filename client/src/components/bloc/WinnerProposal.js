import PropTypes from 'prop-types'

const WinnerProposal = ({ description, voteCount = 0 }) => {
    return (
        <div className="col-lg-6 col-xxl-4 mb-5">
            <div className="card bg-light border-0 h-100">
                <div className="d-flex flex-column justify-content-center align-items-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <div className="feature bg-gradient text-white rounded-3 mb-4 mt-n4 bg-warning">
                        <i className="bi bi-trophy"></i>
                    </div>

                    <h3>
                        <b>Vote count</b>: {voteCount}
                    </h3>

                    <h4 className="fs-6">
                        <b>Description</b>: {description}
                    </h4>
                </div>
            </div>
        </div>
    )
}

WinnerProposal.propTypes = {
    description: PropTypes.string.isRequired,
    voteCount: PropTypes.string.isRequired,
}

export default WinnerProposal
