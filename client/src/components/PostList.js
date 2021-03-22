import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CreateComment';
import CommentList from './CommentList';


function PostList() {
    const [posts, setPosts] = useState(null);
    
    const fetchPosts = async () =>{
        const res = await axios.get('http://localhost:3002/posts')

        console.log(res.data);

        setPosts(res.data)
    }

    useEffect( () => {
        fetchPosts();
    }, [])

    return (
      <div className="container">
         <div className="d-flex flex-wrap justify-content-between flex-row">
            {posts && Object.values(posts).map((item)=>(
                 <div className="card" style={{width:'30%', marginBottom:'20px'}} key={item.id}>
                     <div className="card-body">
                       <h3>{item.title}</h3>
                       <CommentList comments={item.comments}/>
                       <CommentCreate postId={item.id}/>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    );
  }
  
  export default PostList;
