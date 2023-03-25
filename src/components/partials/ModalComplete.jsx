import React from 'react'

const ModalComplete = () => {
    return (
        <div className="modal fade" id="modalComplete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalCompleteLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalCompleteLabel">Your post has been shared</h1>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center">
                        <img src="../../src/assets/img/success.gif" style={{width:100}} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComplete