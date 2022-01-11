import { useState, useEffect } from 'react'

import useVoteState from '../../hooks/useVoteState'
import useWeb3 from '../../hooks/useWeb3'

import useToggle from '../../hooks/useToggle'
import useWallet from '../../hooks/useWallet'

import { isValidProposal } from '../../helpers/proposal'
import { getVoteStatusLabel } from '../../helpers/vote'
import { getHumanErrorMessage } from '../../helpers/Metamask'

import Header from '../sections/Header'
import Modal from '../Modal'
import Proposal from '../bloc/Proposal'

export default function ProposalRegistration() {
    // Global state
    const { isOwner, voteStatus, proposals, canSubmitProposal } = useVoteState()
    const {
        addEventListener,
        fetchProposals,
        addProposal,
        endProposalsRegistration,
        fetchVoterDetails,
        onVoteStatusUpdate,
    } = useWeb3()
    const { account } = useWallet()

    // local state
    const [voterProposal, setVoterProposal] = useState('')
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

    // Listen contract events :
    // - "ProposalRegistered" : to confirm the registration of a new proposal
    // - "WorkflowStatusChange" : to update the vote status
    useEffect(() => {
        addEventListener('ProposalRegistered', async (contractEvent) => {
            const newProposalId = contractEvent.returnValues.proposalId
            const transactionStatus = {
                successful: true,
                message: `Proposal #${newProposalId} has been successfully registered.`,
            }

            fetchProposals()

            setVoterProposal('')
            setTransactionStatus(transactionStatus)
        })

        addEventListener('WorkflowStatusChange', onVoteStatusUpdate)
    }, [])

    const onAddProposalSubmit = async () => {
        await addProposal(voterProposal, account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onEndProposalRegistrationClick = async () => {
        if (proposals.length < 2) {
            return
        }

        endProposalsRegistration(account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onModalClose = () => {
        // reset local state
        setVoterProposal('')
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

                    {account && (
                        <div className="btn-toolbar admin-toolbar">
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className={`btn btn-primary ${
                                        !canSubmitProposal && 'disabled'
                                    }`}
                                    onClick={toggleModalShow}
                                >
                                    Add proposal
                                </button>
                            </div>
                            {isOwner && (
                                <div className="btn-group me-2">
                                    <button
                                        type="button"
                                        className={`btn btn-danger ${
                                            !isOwner || (proposals.length < 2 && 'disabled')
                                        }`}
                                        onClick={onEndProposalRegistrationClick}
                                    >
                                        End proposals registration
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="row gx-lg-5 my-5">
                        {proposals.length ? (
                            proposals.map((proposal, index) => (
                                <Proposal
                                    key={index.toString()}
                                    proposalId={index}
                                    description={proposal.description}
                                    voteCount={proposal.voteCount}
                                />
                            ))
                        ) : (
                            <p className="text-center fs-3">No proposal yet.</p>
                        )}
                    </div>
                </div>

                <Modal
                    show={show}
                    title="Add new proposal"
                    closeCallback={onModalClose}
                    formValid={isValidProposal(voterProposal)}
                    saveCallback={onAddProposalSubmit}
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

                    <form>
                        <div className="mb-3">
                            <label forhtml="proposal" className="form-label">
                                Proposal content ({voterProposal.length} / 60)
                            </label>
                            <div className="input-group has-validation">
                                <input
                                    type="text"
                                    className={`form-control ${
                                        isValidProposal(voterProposal) ? 'is-valid' : 'is-invalid'
                                    }`}
                                    id="proposal"
                                    onChange={(e) => setVoterProposal(e.target.value)}
                                    value={voterProposal}
                                />
                                {isValidProposal(voterProposal) ? (
                                    <div className="valid-feedback">Looks good!</div>
                                ) : (
                                    <div className="invalid-feedback">
                                        Please write a valid proposal (alphanumeric characters and
                                        between 5 and 60 characters).
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    )
}
