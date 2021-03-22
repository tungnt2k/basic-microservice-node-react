import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CommentList({postId}) {
    const [comments, setComments] = useState(null);
    
    const fetchComments = async () =>{
        const res = await axios.get(`http://localhost:5000/posts/${postId}/comments`)

        setComments(res.data)
    }

    useEffect( () => {
        fetchComments();
    }, [])

    return (
      <div className="container">
         <ul>
            {comments && Object.values(comments).map((item)=>(
                 <li key={item.id}>{item.content}</li>
             ))}
         </ul>
      </div>
    );
  }
  
  export default CommentList;
