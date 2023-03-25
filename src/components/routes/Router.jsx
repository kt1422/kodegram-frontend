import React, { useState, useEffect } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Setting from '../pages/Setting';
import Chatlogin from '../pages/Chatlogin';
import Chatregister from '../pages/Chatregister';
import Chathome from '../pages/Chathome';
import Cookies from 'universal-cookie';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { Route, Routes, Navigate } from 'react-router-dom';

export default function RouterConvention() {
    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to="/chat/login"/>;
        }
        return children;
    }
    const cookies = new Cookies();
    const theme = cookies.get('theme');
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect( () =>{
        try {
            if(theme=="false"){
                setIsDarkMode(false);
            } else if(theme=="true") {
                setIsDarkMode(true);
            }
        } catch (error) {
            //nothing
        }
    }, []);
    
    // console.log(theme);

    return (
        <Routes>
            <Route index element={<Navigate to='/home'/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/home' element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/user/login' element={<Login isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/user/register' element={<Register isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/user/profile' element={<Profile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/user/settings' element={<Setting isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/chat/login' element={<Chatlogin isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/chat/register' element={<Chatregister isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>} />
            <Route path='https://awful-snaps-bull.cyclic.app/chat/home' element={
                <ProtectedRoute>
                    <Chathome isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                </ProtectedRoute>} />
        </Routes>   
    )
}