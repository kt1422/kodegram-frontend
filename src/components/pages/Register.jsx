import React, { useState } from 'react';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createNewUser } from '../../service/api';
import logo from '../../assets/img/logo.png';

export default function Register() {
    TabTitle('Register');

    const defaultUserInput = {
        fname: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const [userInput, setUserInput] = useState(defaultUserInput);
    const {fname, username, email, password, confirm_password} = userInput;

    const [msg, setMsg] = useState({});
    const {status, message} = msg;

    const onValueChange =(e)=>{
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    let redirect = useNavigate();
    const handleSubmit = async ()=>{
        const response = await createNewUser(userInput);

        if(response.data.status == "success") {
            redirect('/user/login');
        } else {
            setMsg(response.data);
        }
    }
    
    return (
        <div>
            <div style={{height: 80}} className='pt-1'>
            {
            (status=="error")?
            <div className="alert alert-primary mx-2 mb-0" role="alert">
            {message}
            </div>
            :
            <div></div>
            }
            </div>
            <div className="container-fluid d-flex align-items-center justify-content-center gap-5">
                <img src={logo} alt="" style={{height: 400}} />
                <div className="bg-dark rounded rounded-4 d-flex justify-content-center flex-column px-4 text-light" style={{height: 600, width: 500}}>
                    <h1 className="align-self-center mb-3">Register</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="fname" className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fname" id="fname" onChange={(e)=> onValueChange(e)} value={fname} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" name="username" id="username" onChange={(e)=> onValueChange(e)} value={username} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={(e)=> onValueChange(e)} value={email} required/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={(e)=> onValueChange(e)} value={password} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="confirm_password" id="confirm_password" onChange={(e)=> onValueChange(e)} value={confirm_password} required/>
                        </div>
                        <div className="mb-3">
                            <p className="form-label">Already have an account?&nbsp;
                                <Link to={"/user/login"}>
                                Sign In  
                                </Link>
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary rounded-pill" style={{width: 150}} onClick={()=> handleSubmit()}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}