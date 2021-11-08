import React from 'react'
import Post from './Post';


function PostList(props) {
    return (
        <div>
            {props.posts && [...props.posts].reverse().map(post => {
                return (
                    <Post key={post.id} editBtn={props.editBtn} deleteBtn={props.deleteBtn} post={post} />
                )
            })}
        </div>
    )
}

export default PostList;
