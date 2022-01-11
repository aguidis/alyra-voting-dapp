import { useState, useEffect } from 'react'

import useVoteState from '../../hooks/useVoteState'
import useWallet from '../../hooks/useWallet'
import useWeb3 from '../../hooks/useWeb3'
import useToggle from '../../hooks/useToggle'

import { isValidAddress, shortenAddress } from '../../helpers/address'
import { getVoteStatusLabel } from '../../helpers/vote'
import { getHumanErrorMessage } from '../../helpers/Metamask'

import Header from '../sections/Header'
import Modal from '../Modal'
import Voter from '../bloc/Voter'

export default function VotersRegistration() {
    // Global state
    const { isOwner, voteStatus, whiteListedVoters } = useVoteState()
    const { addEventListener, fetchVoters, addVoter, endVotersRegistration, onVoteStatusUpdate } =
        useWeb3()
    const { account } = useWallet()

    // local state
    const [address, setAddress] = useState('')
    const [transactionStatus, setTransactionStatus] = useState(null)
    // Handle modal display
    const { status: show, toggleStatus: toggleModalShow } = useToggle()

    // Fetch voters
    useEffect(() => {
        fetchVoters()
    }, [])

    // Listen contract events :
    // - "VoterRegistered" : to confirm the registration of a new voter
    // - "WorkflowStatusChange" : to update the vote status
    useEffect(() => {
        addEventListener('VoterRegistered', async (contractEvent) => {
            const newVoterAddress = contractEvent.returnValues.voterAddress
            const transactionStatus = {
                successful: true,
                message: `Voter ${shortenAddress(
                    newVoterAddress,
                )} has been successfully registered.`,
            }

            fetchVoters()

            setAddress('')
            setTransactionStatus(transactionStatus)
        })

        addEventListener('WorkflowStatusChange', onVoteStatusUpdate)
    }, [])

    const onAddVoterSubmit = async () => {
        await addVoter(address, account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const onEndVotersRegistrationClick = async () => {
        if (whiteListedVoters.length < 2) {
            return
        }

        endVotersRegistration(account, (error) => {
            const errorMessageToShow = getHumanErrorMessage(error)

            const transactionStatus = {
                successful: false,
                message: errorMessageToShow,
            }
            setTransactionStatus(transactionStatus)
        })
    }

    const isFormValid = () => {
        if (!isValidAddress(address)) {
            return false
        }

        if (whiteListedVoters.includes(address)) {
            console.log('coucou')
            return false
        }

        return true
    }

    const onModalClose = () => {
        // reset local state
        setAddress('')
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
                                    className="btn btn-primary"
                                    onClick={toggleModalShow}
                                >
                                    Add voter
                                </button>
                            </div>
                            <div className="btn-group me-2">
                                <button
                                    type="button"
                                    className={`btn btn-success ${
                                        !isOwner || (whiteListedVoters.length < 2 && 'disabled')
                                    }`}
                                    onClick={onEndVotersRegistrationClick}
                                >
                                    Start proposals registration
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="row gx-lg-5 my-5">
                        {whiteListedVoters.length ? (
                            whiteListedVoters.map((address, index) => (
                                <Voter key={index.toString()} address={address} />
                            ))
                        ) : (
                            <p className="text-center fs-3">No voter yet.</p>
                        )}
                    </div>
                </div>

                <Modal
                    show={show}
                    title="Add new voter"
                    closeCallback={onModalClose}
                    formValid={isFormValid()}
                    saveCallback={onAddVoterSubmit}
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
                            <label forhtml="voterAddress" className="form-label">
                                ETH address
                            </label>
                            <div className="input-group has-validation">
                                <input
                                    type="text"
                                    className={`form-control ${
                                        address && (isFormValid() ? 'is-valid' : 'is-invalid')
                                    }`}
                                    id="voterAddress"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                />
                                {address &&
                                    (isFormValid() ? (
                                        <div className="valid-feedback">Looks good!</div>
                                    ) : (
                                        <div className="invalid-feedback">
                                            Please choose a valid ETH address or check if voter is
                                            already added.
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    )
}
