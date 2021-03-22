import React from 'react';


function CommentList({comments}) {

    return (
      <div className="container">
         <ul>
            {comments && Object.values(comments).map((item)=>(
                 <li key={item.id}>{ item.status === 'approved'?  item.content : `The comment was ${item.status}`}</li>
             ))}
         </ul>
      </div>
    );
  }
  
  export default CommentList;
