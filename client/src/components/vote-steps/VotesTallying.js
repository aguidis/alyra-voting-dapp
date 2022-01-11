import { useState, useEffect } from 'react'

import Header from '../sections/Header'
import Proposal from '../bloc/Proposal'

import useVoteState from '../../hooks/useVoteState'
import useWeb3 from '../../hooks/useWeb3'
import useWallet from '../../hooks/useWallet'

import { getVoteStatusLabel } from '../../helpers/vote'
import { getHumanErrorMessage } from '../../helpers/Metamask'

export default function VotesTallying() {
    const [transactionStatus, setTransactionStatus] = useState(null)

    const { isOwner, voteStatus } = useVoteState()
    const { addEventListener, computeVoteResult, onVoteStatusUpdate } = useWeb3()
    const { account } = useWallet()

    // Listen contract events :
    // - "WorkflowStatusChange" : to update the vote status
    useEffect(() => {
        addEventListener('WorkflowStatusChange', onVoteStatusUpdate)
    }, [])

    const onComputeVoteResultClick = async () => {
        computeVoteResult(account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    return (
        <>
            <Header />
            <section className="content">
                <div className="container px-lg-5 text-center">
                    <h2 className="fw-bold">{getVoteStatusLabel(voteStatus)}</h2>
                    <h3>The result will be soon announced</h3>

                    {transactionStatus && (
                        <div className="alert alert-danger my-3" role="alert">
                            {transactionStatus.message}
                        </div>
                    )}

                    {isOwner && (
                        <div className="btn-toolbar admin-toolbar">
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={onComputeVoteResultClick}
                                >
                                    Start votes tallying
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
