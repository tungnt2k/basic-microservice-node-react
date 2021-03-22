import React, { useState } from 'react';
import axios from 'axios';


function PostCreate() {

    const [title, setTitle ] = useState('');
    const handleChangeTitle = (e)=>{
        setTitle(e.target.value);
    }
    const handleSubmitForm = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:4000/posts',{
            title
        })
        setTitle('');
    }

    return (
      <div className="container">
        <form className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" value={title} onChange={handleChangeTitle}></input>
            <button type="button" className="btn btn-primary mt-2" onClick={handleSubmitForm}>Create</button>
        </form>
      </div>
    );
  }
  
  export default PostCreate;
