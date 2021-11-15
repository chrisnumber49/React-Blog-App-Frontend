import React from 'react';
import {useState, useEffect} from 'react'
import PostList from './PostList';
import PostForm from './PostForm';
import {useCookies} from 'react-cookie';

function MainPage(props) {
    const [posts, setPosts] = useState([])
    const [editPost, setEditPost] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [search, setSearch] = useState('')

    //function for fetch the backend API
    const fetchPosts = () =>{
        fetch(`http://127.0.0.1:8000/api/posts/?search=${search}`, {
          'method':'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Token ${token['mytoken']}`
          }
        })
        .then(resp => resp.json())
        .then(resp => setPosts(resp))
        .catch(error => console.log(error))
    };

    // read all data from the backend database to the frontend
    useEffect(() => {
        fetchPosts();
      }, [])


    // when search form submitted, fetch the backend API with search parameters
    const searchPost = (e) =>{
        e.preventDefault();

        fetchPosts();
        setSearch('');
    };

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

    useEffect(() => {
        if(!token['mytoken']) {
            props.history.push("/");
            //window.location.href = '/'    
        }
    }, [token])

    return ( 
        <div>
            <div className="d-flex align-items-center justify-content-between p-3 text-white bg-dark">
                <h1 className="col d-flex align-items-center justify-content-start">React-Django-Blog-App</h1>

                <div className="col d-flex align-items-center justify-content-end">
                    <button className="btn btn-primary btn-lg m-1" onClick={insertBtn}>New Post</button>
                    <button className="btn btn-secondary btn-lg m-1" onClick={logoutBtn}>Logout</button>
                </div>
            </div>

            {/* search input */}
            {editPost? null:
                <div className="d-flex justify-content-center flex-wrap mt-3 mb-1">
                    <form onSubmit={searchPost} className="col-12 col-lg-5">
                        <div className="form-group text-center">
                            <label className="h3 text-white">Post Searching Bar</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Search Posts..."
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            }

            {editPost? null: <PostList posts={posts} editBtn={editBtn} deleteBtn={deleteBtn}/>}
            {editPost ? <PostForm post={editPost} insertedInformation={insertedInformation} updatedInformation={updatedInformation} cancel={cancel}/> : null}
            
        </div>
     );
}

export default MainPage;