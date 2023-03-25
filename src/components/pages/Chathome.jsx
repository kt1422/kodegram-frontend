import React from 'react';
import Sidebar from '../chat/Sidebar';
import Chat from '../chat/Chat';

const Chathome = () => {
    return (
        <div>
            <div className='home'>
                <div className='containers'>
                    <Sidebar/>
                    <Chat/>
                </div>
            </div>
        </div>
    )
}

export default Chathome;