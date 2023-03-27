import React from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllUsers, followUser } from '../../service/api';

const ModalSearch = (props) => {
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState('');

    useEffect(() =>{
        getUsers();
    }, [props.likeModal]);

    const getUsers = async () =>{
        const response = await getAllUsers({token: token});
        if(response.data.status == "success") {
            setUsers(response.data.allUsers);
        } else {
            redirect('/user/login');
        }
    }

    const handleSearch = (e) =>{
        setSearchName(e.target.value);
    }
    const filterNameUser = users.filter(user =>{
        return user.fname.toLowerCase().includes(searchName.toLowerCase()) 
        || user.username.toLowerCase().includes(searchName.toLowerCase());
    })
    
    const followHandle = async (userId, isFollowing) =>{
        const response = await followUser({token: token, id: userId, isFollowing: isFollowing});
        if(response.data.status == "success") {
            // loadLikers(token, post_id);
            props.setLikeModal(props.likeModal+1);
            try {
                props.loadNumbers(token, props.paramId);
            } catch (error) {
                // console.log(error);
            }
        } else {
            redirect('/user/login');
        }
    }

    const [unfollowId, setUnfollowId] = useState("");
    const [unfollowName, setUnfollowName] = useState("");
    const setUnfollowModal = (userId, username) =>{
        setUnfollowId(userId);
        setUnfollowName(username);
    }

    return (
        <div>
            <div className="modal fade" id={`modalSearch`} tabIndex="-1" aria-labelledby="modalSearchLabel" aria-hidden="true" style={{color: "black"}}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header d-flex">
                            <h1 className="modal-title fs-5 flex-fill text-center">Search</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{height: 500}}>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-white border-info border-end-0" id="search"><FontAwesomeIcon icon="fa fa-search" style={{color: "#aaa"}} /></span>
                                <input type="text" className="form-control shadow-none ps-0 border-info border-start-0" placeholder="Search name or username" aria-label="Username" aria-describedby="basic-addon1" style={{textAlign: "left"}} onChange={(e)=>handleSearch(e)}/>
                            </div>
                            {
                            (users.length>0)?
                                filterNameUser.map((data)=>(
                                <div key={data.user_id} className='d-flex align-items-start mb-3'>
                                    <Link to={`/user/profile?id=${data.user_id}`} className="nav-link fw-semibold d-flex" reloadDocument>
                                        <img className="rounded-circle border me-3" src={data.pic} alt="img" style={{width: 50, height: 50}}/>
                                    </Link>
                                    <div className='m-0'>
                                        <Link to={`/user/profile?id=${data.user_id}`} className="nav-link fw-semibold name-link me-2" reloadDocument>
                                        {data.username}
                                        </Link>
                                        <span className='fw-light'>{data.fname}</span>
                                    </div>
                                    <div className='flex-fill'>
                                        {
                                        (data.btnFollow=="Follow")?
                                        <button className="btn btn-primary my-1 float-end" onClick={()=>followHandle(data.user_id, true)} >&nbsp;Follow&nbsp;</button>
                                        :
                                        (data.btnFollow=="Following")?
                                        <button className="btn btn-info my-1 float-end" onClick={()=>setUnfollowModal(data.user_id, data.username)} data-bs-toggle="modal" data-bs-target={`#unfollowSearch`}>Following</button>
                                        :
                                        <div></div>
                                        }
                                    </div>
                                </div>
                            ))
                            :
                            <div>No following yet</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={`unfollowSearch`} tabIndex="-1" aria-labelledby="unfollowModalLabel4" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="unfollowModalLabel4">Unfollow</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        Do you want to unfollow {unfollowName}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={()=>followHandle(unfollowId, false)} data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSearch