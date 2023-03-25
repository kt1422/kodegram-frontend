import React, { useState, useEffect} from 'react';
import Navbar from '../partials/Navbar';
import Cookies from 'universal-cookie';
import { TabTitle } from '../../utilities/title';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, getUserProfile, getProfilePostsFromToken, getFollows, followUser } from '../../service/api';
import Thumbnail from '../partials/Thumbnail';
import ModalLogout from '../partials/ModalLogout';
import ModalCreatePost from '../partials/ModalCreatePost';
import ModalViewPost from '../partials/ModalViewPost';
import ModalLoading from '../partials/ModalLoading';
import ModalComplete from '../partials/ModalComplete';
import ModalFollower from '../partials/ModalFollower';
import ModalFollowing from '../partials/ModalFollowing';
import SideNav from '../partials/SideNav/SideNav';

export default function Profile(props) {
    TabTitle('Profile');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    const queryParameters = new URLSearchParams(window.location.search);
    const paramId = queryParameters.get("id");
    const [likeModal, setLikeModal] = useState(0);

    useEffect( () =>{
        loadNavnVerify(token);
        loadProfile(token, paramId);
        loadNumbers(token, paramId);
        loadPosts(token, paramId);
    }, []);

    const [user, setUser] = useState({});
    const {user_id, username, pic} = user;
    const loadNavnVerify = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        if(response.data.status == "success") {
            setUser(response.data.user);
        } else {
            redirect('/user/login');
        }
    }

    const [follow, setFollow] = useState("Follow");
    const followHandle = async (isFollowing) =>{
        const response = await followUser({token: token, id: paramId, isFollowing: isFollowing});
        if(response.data.status == "success") {
            await loadNumbers(token, paramId);
        } else {
            redirect('/user/login');
        }
        if(isFollowing){
            setFollow("Following");
        } else {
            setFollow("Follow");
        }
    }

    const [profile, setProfile] = useState({});
    const loadProfile = async (getToken, getProfileId) =>{
        const response = await getUserProfile({token: getToken, id: getProfileId});
        if(response.data.status == "success") {
            setProfile(response.data.user);
            setFollow(response.data.btnFollow);
        } else {
            redirect('/user/login');
        }
    }

    const [numFollower, setNumFollower] = useState("");
    const [numFollowing, setNumFollowing] = useState("");
    const [numPost, setNumPost] = useState("");
    const loadNumbers = async (getToken, getProfileId) =>{
        const response = await getFollows({token: getToken, id: getProfileId});
        if(response.data.status == "success") {
            const getNumFollower = response.data.numFollower;
            const getNumFollowing = response.data.numFollowing;
            const followerX = (getNumFollower>1)?" followers":" follower";
            setNumFollower(getNumFollower+followerX);
            setNumFollowing(getNumFollowing+" following");

            const postX = (response.data.numPost>1)?" posts":" post";
            setNumPost(response.data.numPost+postX);
        } else {
            redirect('/user/login');
        }
    }

    const [posts, setPosts] = useState(['loading']);
    const loadPosts = async (getToken, getProfileId) =>{
        const response = await getProfilePostsFromToken({token: getToken, id: getProfileId});
        if(response.data.status == "success") {
            setPosts(response.data.allPosts);
            loadNumbers(token, paramId);
        } else {
            redirect('/user/login');
        }
    }

    return (
        <div className={`${props.isDarkMode ? "dark" : ""}`}>
            {/* <Navbar user_id={user_id} username={username} pic={pic} ></Navbar> */}
            <div>
                <SideNav user_id={user_id} username={username} pic={pic} isDarkMode={props.isDarkMode} setIsDarkMode={props.setIsDarkMode} likeModal={likeModal} setLikeModal={setLikeModal}></SideNav>
            </div>
            <div className='media2'>
                <ModalLogout></ModalLogout>
                <ModalCreatePost user_id={user_id} username={username} pic={pic} reloadPosts={loadPosts} page={"profile"} paramId={paramId}></ModalCreatePost>
                <button id="modalLoadingBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLoading" hidden></button>
                <ModalComplete></ModalComplete>
                <button id="modalCompleteBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalComplete" hidden></button>
                <ModalLoading></ModalLoading>
                <ModalFollower profile_id={paramId} follow={follow} loadNumbers={loadNumbers} likeModal={likeModal} setLikeModal={setLikeModal}></ModalFollower>
                <ModalFollowing profile_id={paramId} follow={follow} loadNumbers={loadNumbers} likeModal={likeModal} setLikeModal={setLikeModal}></ModalFollowing>
                <div className='media3 container d-flex justify-content-center flex-column pt-5'>
                    <div className='d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5'>
                        <div className='col-3 d-flex justify-content-center'>
                            <img className='rounded-circle' src={profile.pic} alt="" style={{height: 150, width: 150}}/>
                        </div>
                        <div className='d-flex flex-column col-auto col-lg-8'>
                            <div className='d-flex align-items-start'>
                                <p className='fs-5 me-4 py-1'>{profile.username}</p>
                                {
                                (profile.isOwner==true)?
                                <Link to={"/user/settings"} className="btn btn-info">Edit profile</Link>
                                :
                                <div className='d-flex align-items-center gap-3'>
                                    {
                                    (follow=="Follow")?
                                    <button className="btn btn-primary" onClick={()=>followHandle(true)} >&nbsp;Follow&nbsp;</button>
                                    :
                                    <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#unfollowModal">Following</button>
                                    }
                                    <Link to={"/user/message"} className="btn btn-info">Message</Link>
                                    <div className="dropdown">
                                        <button className='border-0 bg-transparent fs-4' data-bs-toggle="dropdown">
                                            <i className={`bi bi-three-dots ${props.isDarkMode ? "dark" : ""}`}></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-start">
                                            <li><p className="dropdown-item mb-0">Block</p></li>
                                            <li><p className="dropdown-item mb-0">Report</p></li>
                                        </ul>
                                    </div>
                                </div>
                                }
                                
                            </div>
                            <div className='d-flex gap-5'>
                                <p>{numPost}</p>
                                <p className='follow-count' style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#modalFollower">{numFollower}</p>
                                <p className='follow-count' style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#modalFollowing">{numFollowing}</p>
                            </div>
                            <div>
                                <p className='fw-semibold mb-0'>{profile.fname}</p>
                            </div>
                            <div>
                                <p>{profile.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5' style={{minHeight: 477}}>
                        <ul className="d-flex justify-content-center nav nav-tabs gap-5" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">POSTS</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">REELS</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">TAGGED</button>
                            </li>
                        </ul>
                        <div className="tab-content pt-4 mb-5" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            {
                            (posts.length>0 && posts[0]!=="loading")?
                            <div className='d-flex flex-wrap gap-3'>
                                {
                                posts.map((data)=>(
                                    <div key={data.id}>
                                        <Thumbnail post_id={data.id} attachment={data.attachment}/>
                                        <ModalViewPost post_id={data.id} user_id={data.user_id} username={data.username} 
                                        pic={data.pic} caption={data.caption} attachment={data.attachment} date={data.date} 
                                        update={data.update} isLiked={data.isLiked} numLikes={data.numLikes} 
                                        numComments={data.numComments} likeModal={likeModal} setLikeModal={setLikeModal} 
                                        loadNumbers={loadNumbers} paramId={paramId} isOwner={profile.isOwner} loadPosts={loadPosts}/>
                                    </div>
                                ))
                                }
                            </div>
                            :
                            <div>
                                {
                                (posts[0]=="loading")?
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                <p className='ms-5'>No post to show</p>
                                }
                            </div>
                            }
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">Coming soon</div>
                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">Coming soon</div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="unfollowModal" tabIndex="-1" aria-labelledby="unfollowModalLabel4" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="unfollowModalLabel4">Unfollow</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            Do you want to unfollow {profile.fname}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={()=>followHandle(false)} data-bs-dismiss="modal">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}