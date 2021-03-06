import { useAtomValue } from 'jotai/utils'

import {
    contractOwnerAtom,
    voteStatusAtom,
    whiteListedVotersAtom,
    isOwnerAtom,
    proposalsAtom,
    canSubmitProposalAtom,
    voterDetailsAtom,
    canVoteAtom,
    winningProposalAtom,
    voteEqualityAtom,
} from '../state'

const useVoteState = () => {
    const contractOwner = useAtomValue(contractOwnerAtom)
    const voteStatus = useAtomValue(voteStatusAtom)
    const whiteListedVoters = useAtomValue(whiteListedVotersAtom)
    const proposals = useAtomValue(proposalsAtom)
    const canSubmitProposal = useAtomValue(canSubmitProposalAtom)
    const isOwner = useAtomValue(isOwnerAtom)
    const voterDetails = useAtomValue(voterDetailsAtom)
    const canVote = useAtomValue(canVoteAtom)
    const winningProposal = useAtomValue(winningProposalAtom)
    const voteEquality = useAtomValue(voteEqualityAtom)

    return {
        contractOwner,
        voteStatus,
        whiteListedVoters,
        proposals,
        canSubmitProposal,
        isOwner,
        voterDetails,
        canVote,
        winningProposal,
        voteEquality,
    }
}

export default useVoteState
