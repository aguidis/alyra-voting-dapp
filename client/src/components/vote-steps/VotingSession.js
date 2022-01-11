import { useState, useEffect } from 'react'

import Header from '../sections/Header'
import Modal from '../Modal'
import Proposal from '../bloc/Proposal'

import useVoteState from '../../hooks/useVoteState'
import useWeb3 from '../../hooks/useWeb3'
import useWallet from '../../hooks/useWallet'
import useToggle from '../../hooks/useToggle'

import { VoteStatus } from '../../constants/voteStatus'

import { getVoteStatusLabel } from '../../helpers/vote'
import { getHumanErrorMessage } from '../../helpers/Metamask'

export default function VotingSession() {
    // Global state
    const { isOwner, voteStatus, proposals, voterDetails, canVote } = useVoteState()
    const {
        addEventListener,
        fetchProposals,
        fetchVoterDetails,
        startVotingSession,
        voteForProposal,
        endVotingSession,
        onVoteStatusUpdate,
    } = useWeb3()
    const { account } = useWallet()

    // local state
    const [selectedProposalId, setSelectedProposalId] = useState(null)
    const [transactionStatus, setTransactionStatus] = useState(null)

    // Handle modal display
    const { status: show, toggleStatus: toggleModalShow } = useToggle()

    // Fetch proposals
    useEffect(() => {
        fetchProposals()
    }, [])

    // Fetch voter details
    useEffect(() => {
        if (account === null) {
            return
        }

        fetchVoterDetails(account)
    }, [account])

    // Admin flags to manage vote status
    const canStartVote = voteStatus === VoteStatus.ProposalsRegistrationEnded
    const canEndVote = voteStatus === VoteStatus.VotingSessionStarted

    // Listen contract events :
    // - "ProposalRegistered" : to confirm the registration of a new proposal
    // - "WorkflowStatusChange" : to update the vote status
    useEffect(() => {
        addEventListener('Voted', async (contractEvent) => {
            const votedProposalId = contractEvent.returnValues.proposalId
            const voter = contractEvent.returnValues.voter
            const transactionStatus = {
                successful: true,
                message: `Vote for proposal #${votedProposalId} has been successfully registered.`,
            }

            fetchVoterDetails(voter)

            setSelectedProposalId(null)
            setTransactionStatus(transactionStatus)
        })

        addEventListener('WorkflowStatusChange', onVoteStatusUpdate)
    }, [])

    const onStartVotingSession = async () => {
        await startVotingSession(account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onVoteForProposalSubmit = async () => {
        await voteForProposal(selectedProposalId, account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onEndVotingSessionClick = async () => {
        endVotingSession(account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onModalOpen = (proposalId) => {
        // Save select proposal Id
        setSelectedProposalId(proposalId)

        // ... and open modal for confirm vote
        toggleModalShow()
    }

    const onModalClose = () => {
        // reset local state
        setSelectedProposalId(null)
        setTransactionStatus(null)

        // ... and hide modal
        toggleModalShow()
    }

    return (
        <>
            <Header />
            <section className="content">
                <div className="container px-lg-5 text-center">
                    <h2 className="fw-bold">{getVoteStatusLabel(voteStatus)}</h2>

                    {isOwner && (
                        <div className="btn-toolbar admin-toolbar">
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className={`btn btn-success ${!canStartVote && 'disabled'}`}
                                    onClick={onStartVotingSession}
                                >
                                    Start voting session
                                </button>
                            </div>
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className={`btn btn-danger ${!canEndVote && 'disabled'}`}
                                    onClick={onEndVotingSessionClick}
                                >
                                    End voting session
                                </button>
                            </div>
                        </div>
                    )}

                    {voterDetails && voterDetails.hasVoted && (
                        <div className="alert alert-success mt-3" role="alert">
                            Congratulation ! Your vote has been registered.
                        </div>
                    )}

                    <div className="row gx-lg-5 my-5">
                        {proposals.length ? (
                            proposals.map((proposal, index) => (
                                <Proposal
                                    key={index.toString()}
                                    proposalId={index}
                                    description={proposal.description}
                                    voteCallback={() => onModalOpen(index)}
                                    canVote={canVote}
                                />
                            ))
                        ) : (
                            <p className="text-center fs-3">No proposal yet.</p>
                        )}
                    </div>
                </div>

                <Modal
                    show={show}
                    title="Vote confirmation"
                    closeCallback={onModalClose}
                    formValid={selectedProposalId !== null}
                    saveCallback={onVoteForProposalSubmit}
                >
                    {transactionStatus && (
                        <div
                            className={`alert ${
                                transactionStatus.successful ? 'alert-success' : 'alert-danger'
                            }`}
                            role="alert"
                        >
                            {transactionStatus.message}
                        </div>
                    )}

                    <p>Do you confirm your vote for proposal #{selectedProposalId} ?</p>
                </Modal>
            </section>
        </>
    )
}
