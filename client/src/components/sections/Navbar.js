import { Link } from 'react-router-dom'

import useToggle from '../../hooks/useToggle'

export default function Navbar() {
    // Handle responsive menu
    const { status: show, toggleStatus: toggleMenuShow } = useToggle()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-lg-5">
                <a className="navbar-brand" href="#!">
                    Alyra Voting
                </a>
                <button
                    className={`navbar-toggler ${!show && 'collapsed'}`}
                    type="button"
                    onClick={() => toggleMenuShow()}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${show && 'show'}`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/voters" className="nav-link">
                                Voters
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/proposals" className="nav-link">
                                Proposals
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
