import React from 'react';

const ModalLoading = () => {
    
    return (
        <div className="modal fade" id="modalLoading" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLoadingLabel" aria-hidden="true" style={{color: "black"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalLoadingLabel">Your post is being processed</h1>
                    </div>
                    <div className="modal-body d-flex justify-content-center align-items-center pb-5" style={{height: 200}}>
                        <div className="spinner-border" role="status"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLoading;