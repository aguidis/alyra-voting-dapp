import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import useWeb3 from './hooks/useWeb3'
import useWallet from './hooks/useWallet'

import Home from './pages/Home'
import Voters from './pages/Voters'
import Proposals from './pages/Proposals'

const App = () => {
    const { fetchVoteStatus } = useWeb3()
    const { onAccountChange } = useWallet()

    // Fetch required state
    useEffect(() => {
        fetchVoteStatus()
    }, [])

    // Handle chain change
    useEffect(() => {
        const onChainChange = () => {
            // Metamask doc: "We recommend reloading the page, unless you must do otherwise"
            window.location.reload()
        }

        window.ethereum.on('chainChanged', onChainChange)

        // remove listener when the component is unmounted
        return () => {
            window.ethereum.removeListener('chainChanged', onChainChange)
        }
    }, []) // Only execute on component mount

    // Handle account change
    useEffect(() => {
        window.ethereum.on('accountsChanged', onAccountChange)

        return () => {
            window.ethereum.accountsChanged('accountsChanged', onAccountChange)
        }
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/voters" element={<Voters />} />
                <Route path="/proposals" element={<Proposals />} />
            </Routes>
        </HashRouter>
    )
}

export default App
