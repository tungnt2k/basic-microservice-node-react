import React from 'react';


function CommentList({comments}) {

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
