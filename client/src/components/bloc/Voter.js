import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import useVoteState from '../../hooks/useVoteState'
import useWeb3 from '../../hooks/useWeb3'

import { shortenAddress } from '../../helpers/address'
import { VoteStatus } from '../../constants/voteStatus'

const Voter = ({ address }) => {
    // Global state
    const { voteStatus } = useVoteState()
    const { fetchVoterDetails } = useWeb3()

    // local state
    const [voterDetails, setVoterDetails] = useState(null)

    useEffect(() => {
        if (voteStatus < VoteStatus.VotingSessionEnded) {
            return
        }

        fetchVoterDetails(address, (voterData) => {
            setVoterDetails(voterData)
        })
    }, [voteStatus, address])

    return (
        <div className="col-lg-6 col-xxl-4 mb-5">
            <div className="card bg-light border-0 h-100">
                <div className="d-flex flex-column justify-content-center align-items-center p-4 p-lg-5 pt-0 pt-lg-0">
                    <div className="feature bg-dark bg-gradient text-white rounded-3 mb-4 mt-n4">
                        <i className="bi bi-person-circle"></i>
                    </div>
                    <h3>{shortenAddress(address)}</h3>
                    {voterDetails?.votedProposalId && (
                        <h4 className="fs-6">
                            <b>Vote</b> : Proposal #{voterDetails.votedProposalId}
                        </h4>
                    )}
                </div>
            </div>
        </div>
    )
}

Voter.propTypes = {
    address: PropTypes.string.isRequired,
}

export default Voter
