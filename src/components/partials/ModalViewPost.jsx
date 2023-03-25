import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { likePost, addComment, deletePost } from '../../service/api';
import Comment from './Comment';
import ModalLike from './ModalLike';
import ModalEditPost from './ModalEditPost';

const ModalViewPost = (props) => {
    let redirect = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const [caption, setCaption] = useState(props.caption);
    const [update, setUpdate] = useState(props.update);

    const [numLikes, setNumLikes] = useState(props.numLikes);
    const defaultWordLike = (props.numLikes>1)?"likes":"like";
    const [wordLike, setWordLike] = useState(defaultWordLike);
    const [heart, setHeart] = useState(props.isLiked);
    const likeHandle = async (postId, isLiked) =>{
        const response = await likePost({token: token, post_id: postId, isLiked: isLiked});
        if(response.data.status == "success") {
            if(isLiked){
                setHeart("Liked");
                setNumLikes(numLikes+1);
                (numLikes<1)?setWordLike("like"):setWordLike("likes");
            } else {
                setHeart("Unlike");
                setNumLikes(numLikes-1);
                (numLikes>2)?setWordLike("likes"):setWordLike("like");
            }
        } else {
            redirect('/user/login');
        }
    }

    const [comment, setComment] = useState("");
    const handleKeyDown =(e)=>{
        setComment(e.target.value);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }

    const [numComments, setNumComments] = useState(props.numComments);
    const defaultWordComment = (props.numComments>1)?"comments":"comment";
    const [wordComment, setWordComment] = useState(defaultWordComment);
    const [commentBox, setCommentBox] = useState([]);
    const commentHandle = async () =>{
        const response = await addComment({token: token, post_id: props.post_id, comment_to: "", comment: comment});
        if(response.data.status == "success") {
            const addedComment = response.data.commentAdded;
            const user = response.data.user;
            setComment("");
            setNumComments(numComments+1);
            setCommentBox(oldArray => [...oldArray, {
                comment_id: addedComment._id,
                user_id: addedComment.comment_user_id,
                comment_to: addedComment.comment_to,
                comment: addedComment.comment,
                username: user.username,
                pic: user.pic
            }]);
        } else {
            redirect('/user/login');
        }
    }

    const urlLists = props.attachment;
    const [image, setImage] = useState([]);

    useEffect( () =>{
        for(let i=0; i<urlLists.length; i++){
            const classes = (i==0)?"carousel-item active":"carousel-item";
            const img = new Image();
            img.src = urlLists[i];
            img.onload = () => {
                if(img.height>=img.width){
                    setImage(oldArray => [...oldArray, {flow: "h-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                } else {
                    setImage(oldArray => [...oldArray, {flow: "w-100", imgUrl: urlLists[i], imgClass: classes, height: img.height}]);
                }
            };
        }
    }, []);

    const deletePostHandle = async (post_id) =>{
        if (confirm('Are you sure you want to delete this post?')) {
            const response = await deletePost({token: token, post_id: post_id});
            if(response.data.status == "success") {
                const genericModalEl = document.getElementById(`viewPostModal${post_id}`);
                const modal = bootstrap.Modal.getInstance(genericModalEl);
                modal.hide();
                props.loadNumbers(token, props.paramId);
                props.loadPosts(token, props.paramId);
                alert("Your post has been deleted");
            } else {
                redirect('/user/login');
            }
        } else {
        // Do nothing!
        }
        
    }

    const isOwner = props.isOwner;
    const ownerBtn = (isOwner)?
    <div className="dropdown me-1">
        <button className='border-0 bg-transparent black-link fs-5 p-0' data-bs-toggle="dropdown">
            <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
            <li><p className="dropdown-item mb-0 nav-menu" data-bs-toggle="modal" data-bs-target={`#editPostModal${props.post_id}`} style={{cursor: "pointer"}}>Edit</p></li>
            <li onClick={()=>deletePostHandle(props.post_id)}><p className="dropdown-item mb-0 nav-menu" style={{cursor: "pointer"}}>Delete</p></li>
        </ul>
    </div>
    :
    <></>;
    

    return (
        <div>
            <div className="modal fade" id={`viewPostModal${props.post_id}`} tabIndex="-1" aria-hidden="true"style={{color: "black"}}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content d-flex flex-row" style = {{height:"90vh"}}>
                        <div id={`viewcarousel${props.post_id}`} className="carousel slide w-50 h-100">
                            <div className="carousel-inner h-100 w-100 bg-black">
                            {
                            image.map((data)=>(
                                <div key={data.imgUrl} className={data.imgClass} style={{height: "100%"}}>
                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center' style={{overflow: "hidden"}}>
                                        <img className={data.flow} src={data.imgUrl}/>
                                    </div>
                                </div>
                            ))
                            }
                            </div>
                            {
                            (image.length>1)?
                            <div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#viewcarousel${props.post_id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#viewcarousel${props.post_id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                            :
                            <div></div>
                            }
                        </div>
                        <div className='w-50 h-100 d-flex flex-column border-start'>
                            <div className="modal-header">
                                <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold d-flex">
                                    <img className="rounded-circle border me-3" src={props.pic} alt="" style={{width: 40, height: 40}}/>
                                    <p className='name-link pt-2 m-0'>{props.username}</p>
                                </Link>
                                <div className='d-flex align-items-start'>
                                    <div>{ownerBtn}</div>
                                    <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                            <div id='style-4' className="modal-body overflow-auto h-100">
                                <div className=''>
                                    {
                                        (caption!=="")?
                                        <div className='d-flex align-items-start mb-3'>
                                            <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold d-flex" reloadDocument>
                                                <img className="rounded-circle border me-3" src={props.pic} alt="img" style={{width: 40, height: 40}}/>
                                            </Link>
                                            <div className=''>
                                                <div className='pt-2 m-0'>
                                                    <Link to={`/user/profile?id=${props.user_id}`} className="nav-link fw-semibold name-link me-2 d-inline" reloadDocument>
                                                    {props.username}
                                                    </Link>
                                                    {caption}
                                                </div>
                                                <div style={{fontSize: 13, color: "gray"}}>{update}</div>
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    {(numComments>0) && (
                                        <Comment key={props.post_id} post_id={props.post_id} numComments={numComments}></Comment>
                                    )}
                                </div>
                            </div>
                            <div className="modal-body d-flex flex-column border-top pt-1">
                                <div className="d-flex justify-content-between mt-1">
                                    <div className='d-flex gap-3'>
                                        {
                                        (heart=="Liked")?
                                        <button className='name-link border-0 bg-transparent fs-4 p-0' onClick={()=>likeHandle(props.post_id, false)} >
                                            <FontAwesomeIcon icon="fa-solid fa-heart" className='text-danger'/>
                                        </button>
                                        :
                                        <button className='test-link border-0 bg-transparent fs-4 p-0' onClick={()=>likeHandle(props.post_id, true)} >
                                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                                        </button>
                                        }
                                        <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-comment"></i></button>
                                        <button className='name-link border-0 bg-transparent fs-4 p-0'><i className="fa-regular fa-paper-plane"></i></button>
                                    </div>
                                    <div>
                                        <p className='fs-4 name-link mb-1'><i className="fa-regular fa-bookmark"></i></p>
                                    </div>
                                </div>
                                {
                                (numLikes>0)?
                                <p className='fw-semibold mb-1' data-bs-toggle="modal" data-bs-target={`#modalLike${props.post_id}`} style={{cursor: "pointer"}}>{numLikes} {wordLike}</p>
                                :
                                <div></div>
                                }
                                <p style={{fontSize: 10, color: "gray"}}>{props.date}</p>
                                <div className='d-flex align-items-start'>
                                    <textarea className='border-0 comment-box col' rows={1} id='comment' name='post' placeholder='Add a comment...' style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)} value={comment}></textarea>
                                    {
                                    (comment!=="")?
                                    <button className='border-0 bg-transparent text-primary-emphasis fw-semibold col-auto' onClick={()=>commentHandle()}>
                                        Post
                                    </button>
                                    :
                                    <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLike post_id={props.post_id} heart={heart} 
            likeModal={props.likeModal} setLikeModal={props.setLikeModal} 
            loadNumbers={props.loadNumbers} paramId={props.paramId}></ModalLike>
            <ModalEditPost user_id={props.user_id} username={props.username} 
            pic={props.pic} post_id={props.post_id} caption={caption} 
            setCaption={setCaption} viewImage={image} setUpdate={setUpdate}></ModalEditPost>
        </div>
    )
}

export default ModalViewPost;