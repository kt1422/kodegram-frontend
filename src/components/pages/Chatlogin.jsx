import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Chatlogin = () => {
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () =>{
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/chat/home")
        }catch(err){
            setErr(true);
        }
    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Kodegram Chat</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <button type="button" onClick={()=> handleSubmit()}>Sign in</button>
                    {err && <span>Invalid email or password!</span>}
                </form>
                <p>You don't have an account? <Link to="/chat/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Chatlogin;