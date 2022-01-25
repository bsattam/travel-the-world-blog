import './topbar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {Context} from '../../context/Context';

export default function Topbar(){
    const PF = "http://localhost:5050/images/";
    const S3PF = "https://bsattam-travel-the-world-blog.s3.ap-south-1.amazonaws.com/"
    const {user, dispatch} = useContext(Context);
    const [imageKey, setImageKey] = useState("");
    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
    }
    console.log(user);
    

    useEffect(()=>{
        if(user){
            console.log("topbar profile pic updated");
            var dp = user.profilePic ? S3PF+user.profilePic : PF+'user.png';
            console.log("dp = " + dp);
            setImageKey(dp);
        }
        
    }, [])
    

    
    return(
        <div className = 'top'>
            <div className = "top-left"> 
                <Link to='/' className='react-link'> 
                    {/* <img className = 'topbar-icon' src={PF + 'icon.png'} alt='...' /> */}
                    <div className = 'topbar-icon'>Travel The World</div>
                </Link>
            </div>
            <div className = "top-center">
                <ul className='top-list'>
                    <li className = 'top-list-item'> 
                        <Link to='/' className='react-link'> Home </Link> 
                    </li>
                    <li className = 'top-list-item'> 
                    <Link to='/write' className='react-link'> Write </Link>
                    </li>
                </ul>
            </div>
            <div className = "top-right">
                { user && 
                    <Link to='/userinfo'>
                        <img 
                        className = 'topbar-img'
                        src = {imageKey}
                        alt = '...'
                        />
                    </Link>
                }
                {user ? 
                    <ul className = 'top-list'>
                        <li className = 'top-list-item' onClick={handleLogout}> Log Out </li>
                    </ul>
                        : 
                    <ul className = 'top-list'>
                        <li className = 'top-list-item'> 
                        <Link to='/login' className='react-link'> Login </Link>
                        </li>
                        <li className = 'top-list-item'> 
                        <Link to='/register' className='react-link'> Sign Up </Link>
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}