import useVoteState from '../../hooks/useVoteState'

import ConnectButton from '../wallet/ConnectButton'

import { getVoteStatusLabel } from '../../helpers/vote'
import { VoteStatus } from '../../constants/voteStatus'

export default function Header() {
    const { voteStatus } = useVoteState()

    const computeStepIcon = (step) => {
        if (step === voteStatus) {
            return 'bi-arrow-repeat gly-spin'
        }

        return voteStatus >= step ? 'bi-check-circle-fill' : 'bi-check-circle'
    }

    const isVoteInProgress = voteStatus < VoteStatus.VotesTallied

    return (
        <header className="py-5">
            <div className="container px-lg-5">
                <div className="py-3 bg-light rounded-3 text-center">
                    <div className="m-md-5 m-3">
                        <h1 className="display-6 fw-bold">
                            Welcome to the annual company meeting !
                        </h1>
                        <p className="fs-5 mb-5">
                            In order to enhance the Firm’s relationship with its employees, everyone
                            who are remotely registered to the annual meeting will be able to vote
                            by using our new decentralized application.
                        </p>

                        {isVoteInProgress && <ConnectButton />}

                        <ul className="list-group list-group-horizontal-sm vote-stepper">
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(0)}`}></i>
                                <span>{getVoteStatusLabel(0)}</span>
                            </li>
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(1)}`}></i>
                                <span>{getVoteStatusLabel(1)}</span>
                            </li>
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(2)}`}></i>
                                <span>{getVoteStatusLabel(2)}</span>
                            </li>
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(3)}`}></i>
                                <span>{getVoteStatusLabel(3)}</span>
                            </li>
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(4)}`}></i>
                                <span>{getVoteStatusLabel(4)}</span>
                            </li>
                            <li className="list-group-item">
                                <i className={`bi ${computeStepIcon(5)}`}></i>
                                <span>{getVoteStatusLabel(5)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
