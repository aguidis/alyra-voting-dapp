import useVoteState from '../hooks/useVoteState'

import Layout from '../components/sections/Layout'

import VotersRegistration from '../components/vote-steps/VotersRegistration'
import ProposalsRegistration from '../components/vote-steps/ProposalsRegistration'
import VotingSession from '../components/vote-steps/VotingSession'
import VotesTallying from '../components/vote-steps/VotesTallying'
import VoteResult from '../components/vote-steps/VoteResult'

export default function Home() {
    const { voteStatus } = useVoteState()

    const contentMapping = {
        0: <VotersRegistration />,
        1: <ProposalsRegistration />,
        2: <VotingSession />,
        3: <VotingSession />,
        4: <VotesTallying />,
        5: <VoteResult />,
    }

    return <Layout>{contentMapping[voteStatus]}</Layout>
}
