import React, {useState, useEffect} from 'react'
import APIService from '../APIService';
import {useCookies} from 'react-cookie';


function PostForm(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cover, setCover] = useState(null)
    const [token] = useCookies(['mytoken'])

    // if there is any post data send in it will be updatePost
    useEffect(() => {
        setTitle(props.post.title)
        setDescription(props.post.description)
        // setCover(props.post.cover) // url string can't fill the input 
    }, [props.post])

    const insertPost = () => {
        if (title !== '' && description !== '' && cover !== null) {
            const newData = new FormData();
            newData.append('title', title);
            newData.append('description', description);
            newData.append('cover', cover, cover.name);
            // create new data in backend database then modify the frontend state
            APIService.InsertPost(newData, token['mytoken'])
            .then(resp => props.insertedInformation(resp))
            .catch(error => console.log(error))
        } else {
            alert("All the fields are mandatory!");
            return;
        }
    };

    const updatePost = () => {
        if (title !== '' && description !== '') {
            const updateData = new FormData();
            updateData.append('title', title);
            updateData.append('description', description);
            if (cover !== null) {
                updateData.append('cover', cover, cover.name);
            }
            // update the corresponding data in backend database then modify the frontend state
            APIService.PartialUpdatePost(props.post.id, updateData, token['mytoken'])
            .then(resp => props.updatedInformation(resp))
            .catch(error => console.log(error))
        } else {
            alert("All the fields are mandatory!");
            return;
        }
    };

    return ( 
        <div>
            {props.post ? (
                <div className = "m-3">
                    <label htmlFor="title" className="form-label h2 mt-4">Title</label>
                    <input 
                        className = "form-control" 
                        type="text" 
                        id="title" 
                        placeholder = "Enter The Title"
                        value = {title} 
                        onChange = {e => setTitle(e.target.value)}
                    />

                    <label htmlFor="description" className = "form-label h2 mt-4">Description</label>
                    <textarea 
                        className = "form-control" 
                        id="description" 
                        rows="5"
                        value = {description} 
                        onChange = {e => setDescription(e.target.value)}
                    />

                    <label htmlFor="cover" className = "form-label h2 mt-4">Cover Picture</label>
                    <p>
                        <input 
                            type="file" 
                            id="cover" 
                            onChange = {e => setCover(e.target.files[0])}
                        />
                    </p>

                    {
                        props.post.id ?   
                        <button onClick={updatePost} className = "btn btn-success">Update Post</button>:
                        <button onClick={insertPost} className = "btn btn-success">Insert Post</button>
                    }

                    <button className="btn btn-dark m-2" onClick={() => props.cancel()}>Cancel</button>
                </div>
            ) : null}
        </div>
     );
}

export default PostForm;