import './post.css';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function Post({post}) {
    console.log(post);
    const PF = 'https://bsattam-travel-the-world-blog.s3.ap-south-1.amazonaws.com/';
    const [imageKey, setImageKey] = useState("");

    useEffect(()=>{
        console.log("Image key set");
        setImageKey(PF + post.photo);
        console.log("post photo is: ", post.photo);
    }, [imageKey])
    
    return (
        <div className = 'post'>
            <Link to={`/singlepost/${post._id}`} className="react-link"> 
                {post.photo && (
                        <img className='post-img' src={imageKey} alt='...'/>
                    )}
                
                <div className = 'post-info'> 
                                        
                    <span className = 'post-title'> {post.title} </span> 
                    
                    <div className="post-short-description">
                        <span className = 'post-author'> Author: {post.username}</span>
                        <span className = 'post-created-at'> Date: {new Date(post.updatedAt).toDateString()}</span>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}
