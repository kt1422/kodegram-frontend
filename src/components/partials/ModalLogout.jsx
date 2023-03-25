import React from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const ModalLogout = () => {
    let redirect = useNavigate();
    const cookies = new Cookies();
    
    const logout =()=>{
        cookies.remove('userToken');
        redirect('/user/login');
    }

    return (
        <div className="modal fade" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel4">Log out</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    Are you sure you want to logout?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={()=>logout()} data-bs-dismiss="modal">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLogout;