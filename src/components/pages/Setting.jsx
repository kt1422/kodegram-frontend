import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { TabTitle } from '../../utilities/title';
import { getUserFromToken } from '../../service/api';
import Cookies from 'universal-cookie';
import SideNav from '../partials/SideNav/SideNav';
import '../partials/Setting/setting.css';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { updateUser } from '../../service/api';

export default function Setting(props) {
    TabTitle('Home');
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    const [likeModal, setLikeModal] = useState(0);
    const [upload, setUpload] = useState("");

    const [user, setUser] = useState({});
    const {user_id, username, pic} = user;

    const [userpic, setUserpic] = useState("");
    const [userfname, setUserFname] = useState("");
    const [userbio, setUserbio] = useState("");
    const loadNavnVerify = async (getToken) =>{
        const response = await getUserFromToken({token: getToken});
        if(response.data.status == "success") {
            setUser(response.data.user);
            setUserpic(response.data.user.pic);
            setUserFname(response.data.user.fname);
            setUserbio(response.data.user.bio);
        } else {
            redirect('/user/login');
        }
    }

    useEffect( () =>{
        loadNavnVerify(token);
    }, []);

    const handlePic = (file) =>{
        const getUrl = URL.createObjectURL(file[0]);
        setUserpic(getUrl);
        const imageRef = ref(storage, `images/${file[0].name + v4()}`);
        uploadBytes(imageRef, file[0]).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUpload(url);
            });
        });
    }

    const handleUpdate = async () =>{
        const picture = (upload)?upload:pic;
        const response = await updateUser({token: token, pic: picture, fname: userfname, bio: userbio});
        redirect(0);
    }

    const [selected, setSelected] = useState('yes');
    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    };
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className=''>
            <div>
                <SideNav user_id={user_id} username={username} pic={pic} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} likeModal={likeModal} setLikeModal={setLikeModal}></SideNav>
            </div>
            <div className={`container-fluid ${isDarkMode ? "dark" : ""}`} style={{minHeight: "100vh"}}>
                <div className="media4 d-flex flex-column flex-sm-row align-items-start" style={{paddingTop: 50, paddingBottom: 75}}>
                    <div className="setbtn nav flex-row flex-sm-column gap-3 nav-pills me-3 col col-sm-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Edit Profile</button>
                        <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Change Password</button>
                        <button className="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false">Email notification</button>
                        <button className="nav-link" id="v-pills-PushNotif-tab" data-bs-toggle="pill" data-bs-target="#v-pills-PushNotif" type="button" role="tab" aria-controls="v-pills-PushNotif" aria-selected="false">Push notification</button>

                        <button className="nav-link" id="v-pills-WYS-tab" data-bs-toggle="pill" data-bs-target="#v-pills-WYS" type="button" role="tab" aria-controls="v-pills-WYS" aria-selected="false">What you see</button>

                        <button className="nav-link" id="v-pills-WCSYC-tab" data-bs-toggle="pill" data-bs-target="#v-pills-WCSYC" type="button" role="tab" aria-controls="v-pills-WCSYC" aria-selected="false">Who can see <br />your content</button>

                        <button className="nav-link" id="v-pills-HOCIWY-tab" data-bs-toggle="pill" data-bs-target="#v-pills-HOCIWY" type="button" role="tab" aria-controls="v-pills-HOCIWY" aria-selected="false">How others can <br />interact with you</button>

                        <button className="nav-link" id="v-pills-superVision-tab" data-bs-toggle="pill" data-bs-target="#v-pills-superVision" type="button" role="tab" aria-controls="v-pills-superVision" aria-selected="false">Supervision</button>

                        <button className="nav-link mb-2" id="v-pills-YDAM-tab" data-bs-toggle="pill" data-bs-target="#v-pills-YDAM" type="button" role="tab" aria-controls="v-pills-YDAM" aria-selected="false">Your data and media</button>
                    </div>
                    <div className="tab-content border rounded p-4 col col-sm-8" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                            <h3 className='mb-3'>Edit profile</h3>
                            <main>
                                <form>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-auto">
                                                <img src={userpic} className="img img-thumbnail rounded-circle " alt="Profile Picture" style={{width: 150, height: 150}} />
                                            </div>
                                            <div className="col">
                                                <p className='fs-5 mt-2'>{username}</p>
                                                <input id='chooseFile' type='file' accept="image/png, image/jpeg, image/gif" onChange={(e) => handlePic(e.target.files)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-2 align-self-center">
                                            <span className="bold">Name</span>
                                            </div>
                                            <div className="col-10">  
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput1" placeholder="Website" value={userfname} onChange={(e)=>{setUserFname(e.target.value)}}/>
                                                <label htmlFor="floatingInput1">Name:</label>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-2 align-self-center">
                                                <span className="bold">Bio</span>
                                            </div>
                                            <div className="col-10">  
                                                <div className="form-group">
                                                    <textarea className="form-control" rows="5" id="comment" value={userbio} onChange={(e)=>{setUserbio(e.target.value)}}></textarea>
                                                </div>                 
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="container">
                                        <div className="row float-end">
                                            <div className="form-group">
                                                <button type='button' className='btn btn-primary' onClick={()=>{handleUpdate()}}>&nbsp;Update&nbsp; </button>
                                            </div>  
                                        </div>
                                    </div>
                                </form>
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                            <h3>Reset Password</h3>
                            <main>
                                <p><span className="gray">You’ll be logged out of all sessions except this one to protect your account if anyone is trying to gain access.</span></p>
                                <p><span className="gray">Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).
                                </span></p>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput3" placeholder="Current Password" />
                                    <label htmlFor="floatingInput3">Current Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="New Password" />
                                    <label htmlFor="floatingPassword">New Password</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="confirmPass" placeholder="Reapeat Password" />
                                    <label htmlFor="confirmPass">Confirm Password</label>
                                </div>
                                <p className='mt-2 ms-2 text-danger'><span className="blue">Not Working yet</span></p>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">
                            <h3>Email notification</h3>
                            <main>
                                <h6>Likes</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio1" name="optradio" value="yes" checked={selected === 'yes'}
                                    onChange={handleChange} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio2" name="optradio" value="no" checked={selected === 'no'}
                                    onChange={handleChange} /> On
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>            
                                <hr />
                                <h6>Reminder Emails</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio2" name="optradio2" value="yes" checked={selected === 'yes'}
                                    onChange={handleChange} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio2" name="optradio2" value="no" checked={selected === 'no'}
                                    onChange={handleChange} /> On
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>            
                                <hr />
                                <h6>Product Emails</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio3" name="optradio3" value="yes" checked={selected === 'yes'}
                                    onChange={handleChange} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio3" name="optradio3" value="no" checked={selected === 'no'}
                                    onChange={handleChange} /> On
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>
                                <hr />
                                <h6>News Emails</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio4" name="optradio4" value="yes" checked={selected === 'yes'}
                                    onChange={handleChange} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio4" name="optradio4" value="no" checked={selected === 'no'}
                                    onChange={handleChange} /> On
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>  
                                <hr />
                                <h6>Support Emails</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio5" name="optradio5" value="yes" checked={selected === 'yes'}
                                    onChange={handleChange} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio5" name="optradio5" value="no" checked={selected === 'no'}
                                    onChange={handleChange} /> On
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div> 
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-PushNotif" role="tabpanel" aria-labelledby="v-pills-PushNotif-tab">
                            <h3>Push notification </h3>
                            <main>
                                <h6>Push Notifications</h6>
                                <p>Pause all</p>
                                <label className="switch">
                                <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <br />
                                <h6>Likes</h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio1" name="optradio" value="option1" defaultChecked={true} /> Off
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio2" name="optradio" value="option2" /> From People I Follow
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio3" name="optradio" value="option3" /> From Everyone
                                    <label className="form-check-label1" htmlFor="radio3"></label>       
                                </div>  
                                <hr />
                                <h6>Comments</h6>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio2" value="option1" defaultChecked={true} /> Off
                                    <label className="form-check-label1" htmlFor="radio2"></label>
                                </div>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio2" value="option2" /> From People I Follow
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio2" value="option2" /> From Everyone
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div> 
                                <hr />
                                <h6>Comment Likes</h6>
                                <div className="form-check3">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio3" value="option2" /> On
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio3" value="option2" /> Off
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div> 
                                <hr />
                                <h6>First Posts and Stories</h6>
                                    <div className="form-check4">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio4" value="option2" /> Off
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio4" value="option2" /> From People I Follow
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio4" value="option2" /> From Everyone
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div> 
                                <br />
                                <br />
                                <h6>New Followers</h6>
                                <div className="form-check5">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio5" value="option2" /> Off
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check5">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio5" value="option2" /> On
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <hr />
                                <h6>Accepted Follow Requests</h6>
                                <div className="form-check6">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio6" value="option2" /> Off
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check6">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio6" value="option2" /> On
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <hr />
                                <h6>Account Suggestions</h6>
                                <div className="form-check7">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio7" value="option2" /> Off
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check7">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio7" value="option2" /> On
                                    <label className="form-check-label2" htmlFor="radio2"></label>       
                                </div>
                                <br />
                                <br />
                                        <h6>Message Requests</h6>
                                        <div className="form-check8">
                                            <input type="radio" className="form-check-input2" id="radio2" name="optradio8" value="option2" /> Off
                                            <label className="form-check-label2" htmlFor="radio2"></label>       
                                        </div>
                                        <div className="form-check8">
                                            <input type="radio" className="form-check-input2" id="radio2" name="optradio8" value="option2" /> On
                                            <label className="form-check-label2" htmlFor="radio2"></label>       
                                        </div>
                                        <br />
                                        <br />
                                        <h6>Message</h6>
                                        <div className="form-check9">
                                            <input type="radio" className="form-check-input2" id="radio2" name="optradio9" value="option2" /> Off
                                            <label className="form-check-label2" htmlFor="radio2"></label>       
                                        </div>
                                        <div className="form-check9">
                                            <input type="radio" className="form-check-input2" id="radio2" name="optradio9" value="option2" /> On
                                            <label className="form-check-label2" htmlFor="radio2"></label>       
                                        </div>
                                        <hr />
                                    </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-WYS" role="tabpanel" aria-labelledby="v-pills-WYS-tab">
                            <h3>What you see</h3>
                            <main>
                                <h6>Likes and Views</h6>
                                <h6><span className="thin">Hide likes</span></h6>
                                    <label className="switch">
                                    <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p><span className="gray">The number of likes on posts from other accounts will be hidden. You can hide the number of likes on your own posts by going to Advanced Settings before sharing. </span><span>Learn more</span></p> 
                                <hr />
                                <h6>Interest Topics</h6>
                                <p><span>Manage Interests</span></p>
                                <hr />
                                <h6>Privacy and security help</h6>
                                <p><span>Support</span></p>
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-WCSYC" role="tabpanel" aria-labelledby="v-pills-WCSYC-tab">
                            <h3>Who can see your content</h3>
                            <main>
                                <h6>Account privacy</h6>
                                <p><input type="checkbox" id="private" /> Private Account</p>
                                <p>When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don’t have an Instagram account.</p>
                                <p>When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. <span>Learn More</span></p>
                                <hr />
                                <h6>Blocked accounts</h6>
                                <p><span>See and manage accounts you've blocked
                                </span></p>
                                <hr />
                                <h6>Privacy and security help</h6>
                                <p><span>Support</span></p>
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-HOCIWY" role="tabpanel" aria-labelledby="v-pills-HOCIWY-tab">
                            <h3>How other can interact with you</h3>
                            <main>
                            <h6>Messages</h6>
                                <p><span>Manage message settings</span></p>
                            <hr />
                            <h6>Activity Status</h6>
                                <p><input type="checkbox" id="private" /> Show Activity Status</p>
                                <p>Allow accounts you follow and anyone you message to see when you were last active or are currently active on Instagram apps. When this is turned off, you won't be able to see the Activity Status of other accounts.</p>
                                <span>Learn More</span>
                                <p>You can continue to use our services if active status is off.</p>
                            <hr />
                            <h6>Story</h6>
                                <p><span>Edit story settings</span></p>
                            <hr />
                            <h6>Comments</h6>
                                <p><span>Manage comment settings</span></p>
                            <hr />
                            <h6>Mentions</h6>
                                <h6><span className="bold">Allow @mentions From</span></h6>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio1" name="optradio" value="option1" defaultChecked={true} />Everyone
                                    <label className="form-check-label1" htmlFor="radio1"></label>
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio2" name="optradio" value="option2" />People You Follow
                                    <label className="form-check-label1" htmlFor="radio2"></label>       
                                </div>
                                <div className="form-check1">
                                    <input type="radio" className="form-check-input1" id="radio3" name="optradio" value="option3" />No one
                                    <label className="form-check-label1" htmlFor="radio3"></label>       
                                </div>     
                                <p> <span className="gray">Choose who can @mention you to link your account in their stories, comments, live videos, and captions. When people try to @mention you, they'll see if you don't allow @mentions.</span></p>
                                <hr />
                                <h6>Your Post</h6>
                                <p>Allow Others to Use Your Posts </p>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label> 
                                <span className="gray">Other people can add your posts to their guides. Your username will always show up with your posts.</span>  
                                <hr />
                                <h6>Who can tag you</h6>
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio1" name="optradio2" value="option1" defaultChecked={true} />Everyone
                                    <label className="form-check-label2" htmlFor="radio1"></label>
                                </div> 
                                <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio2" name="optradio2" value="option2" />People You Follow
                                        <label className="form-check-label2" htmlFor="radio2"></label>       
                                    </div>
                                    <div className="form-check2">
                                    <input type="radio" className="form-check-input2" id="radio3" name="optradio2" value="option3" />No one
                                        <label className="form-check-label2" htmlFor="radio3"></label>       
                                    </div> 
                                <hr />
                                <h6>Manually approve tags</h6>
                                <div className="form-check3">
                                    <input type="radio" className="form-check-input3" id="radio1" name="optradio3" value="option1" />Automatically show tagged posts on your profile
                                    <label className="form-check-label3" htmlFor="radio1"></label>       
                                </div> 
                                <div className="form-check3">
                                    <input type="radio" className="form-check-input3" id="radio2" name="optradio3" value="option2" />Manually approve posts when you’re tagged in them
                                    <label className="form-check-label3" htmlFor="radio2"></label>       
                                </div> 
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-superVision" role="tabpanel" aria-labelledby="v-pills-superVision-tab">
                            <h3>Supervision</h3>    
                            <main>
                                <h6>Accounts you supervise You're not supervising any accounts. Your teen can send you an invite by going to Supervision in their Instagram settings. </h6>
                            </main>
                        </div>
                        <div className="tab-pane fade" id="v-pills-YDAM" role="tabpanel" aria-labelledby="v-pills-YDAM-tab">
                            <h3>Your data and media</h3>
                            <main>
                                <h5>Data Download</h5>
                                <h5>Request Download</h5>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
