import React from 'react';
import {useState, useEffect} from 'react'
import PostList from './PostList';
import PostForm from './PostForm';
import {useCookies} from 'react-cookie';

function MainPage(props) {
    const [posts, setPosts] = useState([])
    const [editPost, setEditPost] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])

    // read all data from the backend database to the frontend
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/', {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => setPosts(resp))
        .catch(error => console.log(error))
      }, [])

    useEffect(() => {
        if(!token['mytoken']) {
            props.history.push("/");
            //window.location.href = '/'    
        }
    }, [token])

    // switch to the Form component for inserting (because state editPost != null)
    const insertBtn = () => {
        setEditPost({title:'', description:''})
    }
    // modify the frontend state baseed on the backend response
    const insertedInformation = (post) => {
        const udpatedPosts = [...posts, post]
        setPosts(udpatedPosts)
        // switch to the postList component (because state editPost = null)
        setEditPost(null)
    }

    // switch to the Form component for updating (because state editPost != null, and with corresponding post data)
    const editBtn = (post) => {
        setEditPost(post)
    }
    // modify the frontend state baseed on the backend response
    const updatedInformation = (post) => {
        const udpatedPosts = posts.map(mypost => {
            if(mypost.id === post.id) {
            return post;
            }
            else {
            return mypost;
            }
        })
        setPosts(udpatedPosts)
        // switch to the PostList component (because state editPost = null)
        setEditPost(null)
    }

    // delete the corresponding post data in frontend state
    const deleteBtn = (post) => {
        const udpatedPosts = posts.filter(mypost => {
            if(mypost.id === post.id) {
                return false
            }
            return true;
        })
        setPosts(udpatedPosts)
    }

    // back to PostList component (because state editPost = null)
    const cancel = () => {
        setEditPost(null);
    }

    // logout clear username in local storage and remove Token in cookies
    const logoutBtn = () => {
        localStorage.clear();
        removeToken(['mytoken'])
    };

    return ( 
        <div>
            <div className="d-flex align-items-center justify-content-between p-3 text-white bg-dark">
                <h1 >React-Django-Blog-App</h1>

                <div>
                    <button className="btn btn-primary btn-lg m-3" onClick={insertBtn}>New Post</button>
                    <button className="btn btn-secondary btn-lg" onClick={logoutBtn}>Logout</button>
                </div>
            </div>
            
            {editPost? null: <PostList posts={posts} editBtn={editBtn} deleteBtn={deleteBtn}/>}
            {editPost ? <PostForm post={editPost} insertedInformation={insertedInformation} updatedInformation={updatedInformation} cancel={cancel}/> : null}
            
        </div>
     );
}

export default MainPage;