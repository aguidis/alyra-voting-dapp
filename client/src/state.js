import { atom } from 'jotai'

import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import VotingContract from './contracts/Voting.json'

import { VoteStatus } from './constants/voteStatus'

import { addressEqual } from './helpers/address'

export const loggedInAccountAtom = atom(null)
export const accountBalanceAtom = atom(0)

export const web3InstanceAtom = atom(async () => {
    const provider = await detectEthereumProvider()

    // Get network provider and web3 instance.
    const web3 = new Web3(provider)
    web3.eth.handleRevert = true

    return web3
})

export const votingContractAtom = atom(async (get) => {
    const web3 = get(web3InstanceAtom)
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = VotingContract.networks[networkId]

    return new web3.eth.Contract(VotingContract.abi, deployedNetwork && deployedNetwork.address)
})

export const contractOwnerAtom = atom(async (get) => {
    const contract = get(votingContractAtom)

    return await contract.methods.owner().call()
})

const rawVoteStatusAtom = atom(null)
export const voteStatusAtom = atom(
    (get) => get(rawVoteStatusAtom),
    (get, set, newStatus) => {
        set(rawVoteStatusAtom, Number(newStatus))
    },
)

export const whiteListedVotersAtom = atom([])

export const proposalsAtom = atom([])

export const winningProposalAtom = atom(null)

export const voterDetailsAtom = atom(null)

export const isOwnerAtom = atom((get) => {
    const contract = get(contractOwnerAtom)
    const account = get(loggedInAccountAtom)

    if (contract === null || account === null) {
        return false
    }

    return addressEqual(contract, account)
})

export const canSubmitProposalAtom = atom((get) => {
    const voteStatus = get(voteStatusAtom)
    const voterDetails = get(voterDetailsAtom)

    if (voteStatus === null || voterDetails === null) {
        return false
    }

    return voteStatus === VoteStatus.ProposalsRegistrationStarted && voterDetails.isRegistered
})

export const canVoteAtom = atom((get) => {
    const voteStatus = get(voteStatusAtom)
    const voterDetails = get(voterDetailsAtom)

    if (voteStatus === null || voterDetails === null) {
        return false
    }

    return (
        voteStatus === VoteStatus.VotingSessionStarted &&
        voterDetails.isRegistered &&
        voterDetails.hasVoted === false
    )
})
