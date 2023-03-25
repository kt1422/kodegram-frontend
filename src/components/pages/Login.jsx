import React, { useState } from 'react';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../service/api';
import Cookies from 'universal-cookie';
import logo from '../../assets/img/logo.png';

export default function Login() {
    TabTitle('Login');

    const defaultUserInput = {
        email: "",
        password: ""
    }
    const [userInput, setUserInput] = useState(defaultUserInput);
    const {email, password} = userInput;

    const [msg, setMsg] = useState({});
    const {status, message} = msg;

    const onValueChange =(e)=>{
        setUserInput({...userInput, [e.target.name]: e.target.value});
    }

    let redirect = useNavigate();
    const handleSubmit = async ()=>{
        const response = await loginUser(userInput);

        if(response.data.status == "success") {
            const cookies = new Cookies();
            cookies.set('userToken', response.data.token, { path: '/' });
            cookies.set('theme', false, { path: '/' });
            redirect('/home');
        } else {
            setMsg(response.data);
        }
    }

    return (
        <div>
            <div style={{height: 150}} className="pt-1">
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
                <div className="bg-dark rounded rounded-4 d-flex justify-content-center flex-column px-4 text-light" style={{height: 400, width: 500}}>
                    <h1 className="align-self-center mb-3">Login</h1>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={(e)=> onValueChange(e)} value={email} required/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="password" onChange={(e)=> onValueChange(e)} value={password} required/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="checkBoxPass" onClick={()=> showPassword()}/>
                            <label className="form-check-label" htmlFor="checkBoxPass">Show Password</label>
                        </div>
                        <div className="mb-3">
                            <p className="form-label">Dont have an account yet?&nbsp;
                                <Link to={"/user/register"}>
                                Sign Up 
                                </Link>
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary rounded-pill" style={{width: 150}} onClick={()=> handleSubmit()}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}