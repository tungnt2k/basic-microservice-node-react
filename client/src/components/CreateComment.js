import React, { useState } from 'react';
import axios from 'axios';


function CommentCreate({postId}) {

    const [content, setContent ] = useState('');
    const handleChangeContent = (e)=>{
        setContent(e.target.value);
    }
    const handleSubmitForm = async (e) =>{
        e.preventDefault();
        await axios.post(`http://localhost:5000/posts/${postId}/comments`,{
            content
        })
        setContent('');
    }

    return (
      <div className="container">
        <form className="form-group">
            <label>Comment</label>
            <input type="text" className="form-control" value={content} onChange={handleChangeContent}></input>
            <button type="button" className="btn btn-primary mt-2" onClick={handleSubmitForm}>Comment</button>
        </form>
      </div>
    );
  }
  
  export default CommentCreate;
