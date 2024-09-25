import React, {useState } from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';

function Post(props) {
    const [token] = useCookies(['mytoken'])
    const currentUser = localStorage.getItem('username')
    const [body, setBody] = useState('')
    const [comments, setComments] = useState(props.post.postComments)

    const deleteBtn = (post) => {
        // delete the corresponding data in backend database then modify the frontend state
        APIService.DeletePost(post.id, token['mytoken'])
        .then(() => props.deleteBtn(post))
        .catch(error => console.log(error))
    };

    const insertComment = () => {
        if (body !== '') {
            const newData = new FormData();
            newData.append('body', body);
            newData.append('post', props.post.id);
            // create new data in backend database then modify the frontend state
            APIService.InsertComment(newData, token['mytoken'])
            .then(resp => {
                const udpatedComments = [...comments, resp]
                setComments(udpatedComments)
            })
            .catch(error => console.log(error))
            setBody('')
        } else {
            alert("Please Comment something!");
            return;
        }
    };

    const deleteComment = (comment) => {
        APIService.DeleteComment(comment.id, token['mytoken'])
        .then(() => {
            const udpatedComments = comments.filter(myComment => {
                if(myComment.id === comment.id) {
                    return false
                }
                return true;
            })
            setComments(udpatedComments)
        })
        .catch(error => console.log(error))
    }

    return ( 
        <div className="d-flex justify-content-center flex-wrap p-2">
            <div className="card border border-dark rounded-lg shadow-lg my-2 col-12 col-lg-5">
                {/* row to show the user who post it and place the edit/delter button */}
                <div className="d-flex align-items-center justify-content-between p-2">
                    <h4 className="ml-2 font-weight-bolder">{props.post.author}</h4>

                    {currentUser === props.post.author && 
                        <div>
                            <button className="btn btn-info btn-sm text-white m-1" onClick={() => props.editBtn(props.post)}>
                                <i className="material-icons">edit</i>
                            </button>

                            <button className="btn btn-danger btn-sm m-1" onClick={() => deleteBtn(props.post)}>
                                <i className="material-icons">delete</i>
                            </button>   
                        </div>
                    }
                </div>

                {/* card image */}
                {props.post.cover && <div className="d-flex align-items-center justify-content-center bg-dark" style={{height:'400px'}}>
                    <img 
                        src={props.post.cover}
                        style={{maxHeight:'100%', maxWidth:'100%'}}
                        alt="..."
                    />
                </div>}

                {/* card body */}
                <div className="card-body text-center border-top border-dark">
                    <h3 className="font-weight-bolder d-flex justify-content-center align-items-center" style={{height:'40px'}}>
                        {props.post.title}
                    </h3>
                    <hr/>
                    
                    <div className="d-flex justify-content-center">
                        <h5>{props.post.description}</h5>
                    </div>
                    <hr/>

                    {/* the comments input */}
                    <div className="input-group mb-3">
                        <input 
                            className = "form-control" 
                            type="text" 
                            value = {body}
                            onChange={e => setBody(e.target.value)}
                        />

                        <div className="input-group-append">
                            <button className="btn btn-info btn-sm text-white m-1" onClick={insertComment}> Add Comments</button>
                        </div>
                    </div>

                    {/* render each comment in this post*/}
                    <div>
                        {comments && comments.map(comment =>{
                            return (
                                <div className="d-flex justify-content-between align-items-center" key={comment.id}>
                                    <p>
                                        <span className="font-weight-bolder mr-2">{comment.author}: </span>
                                        {comment.body}
                                    </p>

                                    {currentUser === comment.author &&
                                        <button className="btn btn-danger btn-sm m-1" onClick={()=> deleteComment(comment)}>
                                            x
                                        </button> 
                                    }  
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;