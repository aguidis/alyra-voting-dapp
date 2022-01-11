import { useEffect } from 'react'

import useVoteState from '../hooks/useVoteState'
import useWeb3 from '../hooks/useWeb3'

import Layout from '../components/sections/Layout'
import Voter from '../components/bloc/Voter'

export default function Voters() {
    const { whiteListedVoters } = useVoteState()
    const { fetchVoters } = useWeb3()

    // Fetch proposals
    useEffect(() => {
        fetchVoters()
    }, [])

    return (
        <Layout>
            <section className="content py-5">
                <div className="container px-lg-5 text-center">
                    <h2 className="fw-bold">Voters</h2>

                    <div className="row gx-lg-5 my-5">
                        {whiteListedVoters.length ? (
                            whiteListedVoters.map((address, index) => (
                                <Voter key={index.toString()} address={address} />
                            ))
                        ) : (
                            <p className="text-center fs-3">No voters yet.</p>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
