import { useEffect } from 'react'

import useVoteState from '../hooks/useVoteState'
import useWeb3 from '../hooks/useWeb3'

import Layout from '../components/sections/Layout'
import Proposal from '../components/bloc/Proposal'

export default function Voters() {
    const { proposals } = useVoteState()
    const { fetchProposals } = useWeb3()

    // Fetch proposals
    useEffect(() => {
        fetchProposals()
    }, [])

    return (
        <Layout>
            <section className="content py-5">
                <div className="container px-lg-5 text-center">
                    <h2 className="fw-bold">Proposals</h2>

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
            </section>
        </Layout>
    )
}
