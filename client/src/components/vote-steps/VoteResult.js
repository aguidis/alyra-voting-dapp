import { useState, useEffect } from 'react'

import Header from '../sections/Header'
import WinnerProposal from '../bloc/WinnerProposal'
import PartialLoading from '../PartialLoading'

import useVoteState from '../../hooks/useVoteState'
import useWeb3 from '../../hooks/useWeb3'

import { getVoteStatusLabel } from '../../helpers/vote'

export default function VoteResult() {
    // Global state
    const { voteStatus, winningProposal, voteEquality } = useVoteState()
    const { fetchWinner } = useWeb3()

    // Fetch winner
    useEffect(() => {
        fetchWinner()
    }, [])

    return (
        <>
            <Header />
            <section className="content">
                <div className="container px-lg-5 text-center">
                    <h2 className="fw-bold">{getVoteStatusLabel(voteStatus)}</h2>

                    {!voteEquality && winningProposal === null && <PartialLoading />}

                    {winningProposal && (
                        <div className="row gx-lg-5 my-5 justify-content-center">
                            <WinnerProposal
                                description={winningProposal.description}
                                voteCount={winningProposal.voteCount}
                            />
                        </div>
                    )}

                    {voteEquality && (
                        <h3 className="mb-5">
                            No winner ! There is an equality between vote counts.
                        </h3>
                    )}
                </div>
            </section>
        </>
    )
}
