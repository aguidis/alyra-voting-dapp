import PropTypes from 'prop-types'

const Proposal = ({
    description,
    voteCount,
    proposalId = 0,
    voteCallback,
    canVote = false,
}) => {
    return (
        <div className="col-lg-6 col-xxl-4 mb-5">
            <div className="card bg-light border-0 h-100">
                <div className="d-flex flex-column justify-content-center align-items-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <div className="feature bg-gradient text-white rounded-3 mb-4 mt-n4 bg-dark">
                        <i className="bi bi-file-earmark-text"></i>
                    </div>
                    {canVote && (
                        <button
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={voteCallback}
                        >
                            Vote
                        </button>
                    )}

                    <h3>Proposal #{proposalId}</h3>

                    {voteCount && (
                        <h4 className="fs-6">
                            <b>Vote count</b>: {voteCount}
                        </h4>
                    )}

                    <h4 className="fs-6">
                        <b>Description</b>: {description}
                    </h4>
                </div>
            </div>
        </div>
    )
}

Proposal.propTypes = {
    description: PropTypes.string.isRequired,
    voteCount: PropTypes.string,
    proposalId: PropTypes.number,
    voteCallback: PropTypes.func,
    canVote: PropTypes.bool,
}

export default Proposal
