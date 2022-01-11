import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, show, title, closeCallback, formValid, saveCallback }) => {
    useEffect(() => {
        // prevent body scroll while modal opened
        document.body.style.overflow = show ? 'hidden' : 'unset'
    }, [show])

    return (
        <div className={`modal ${show ? ' modal-show' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={closeCallback}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className={`btn btn-primary ${!formValid && 'disabled'}`}
                            onClick={saveCallback}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={closeCallback}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    closeCallback: PropTypes.func.isRequired,
    formValid: PropTypes.bool.isRequired,
    saveCallback: PropTypes.func.isRequired,
}

export default Modal
