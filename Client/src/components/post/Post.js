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
            {post.photo && (
                    //<img className='post-img' src={imageKey} alt='...'/>
                    <img className='post-img' src={imageKey} alt='...'/>
                )}
            
            <div className = 'post-info'> 
                <div className = 'post-cats'>
                    {post.categories.map((c,i) => (
                        <Link to={`/?cat=${c}`} className = 'react-link'>
                            <span className = 'post-cat-item' key={i}> {c + ','} </span>
                        </Link>
                        
                    ))}
                </div>
                <Link to={`/singlepost/${post._id}`} className="react-link"> 
                    <span className = 'post-title'> {post.title} </span> 
                </Link>
                <div className="react-box">
                    <span className = 'post-author'> {post.username}</span>
                    <span className = 'post-created-at'> {new Date(post.updatedAt).toDateString()}</span>
                </div>
                <p className = 'post-description'> 
                    {post.description}
                </p>
            </div>
        </div>
    )
}
