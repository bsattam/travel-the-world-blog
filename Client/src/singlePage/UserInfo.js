import './userInfo.css'
import {Context} from '../context/Context';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';


export default function UserInfo() {
    const [imageKey, setImageKey] = useState("");
    const PF = "http://localhost:5050/images/"
    const S3PF = "https://bsattam-travel-the-world-blog.s3.ap-south-1.amazonaws.com/"
    const {user, dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [userinfo, setUserinfo] = useState(user); 
    useEffect(()=>{
        if (user){
            var dp = user.profilePic ? S3PF+user.profilePic : PF+'user.png';
            setImageKey(dp);
        }
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_START'});
        const oldImage = user.profilePic;
        console.log('old image is: ', oldImage);
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (updatedUser.username === "") updatedUser.username = user.username;
        if (updatedUser.email === "") updatedUser.email = user.email;
        if (updatedUser.password === "") updatedUser.password = user.password;
        if (file){
            const compressedFile = await imageCompression(file, {maxSizeMB: 0.2});
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", compressedFile);
            

            try{
                const res = await axios.post('/upload', data);
                updatedUser.profilePic = res.data.key;
                console.log("New profile pic: " + updatedUser.profilePic);
            }catch(err){
                console.log("error1: " + err);
            }
            // try{
            //     const res = await axios.post('/deleteOldImage', {oldImage});
            // }catch(err){
            //     console.log(err);
            // }
            try{
                const res = await axios.put('/users/' + user._id, updatedUser);
                console.log("Updated user: ", res);
                setSuccess(true);
                console.log('success set');
                dispatch({type: 'UPDATE_SUCCESS', payload: res.data});
                console.log('dispatched');

                //const res2 = await axios.delete('/image/' + oldImage);
                //console.log('old image deleted');

                window.location.replace('/');

            }catch(err){
                console.log("error2: " + err);
                dispatch({type: 'UPDATE_FAILURE'});
            }
        }
        
    } 

    useEffect(() => {
        setUserinfo(user);
    }, [user])

    return (
        <div className = 'user-info'>
            <div className = 'user-info-wrapper'> 
                <div className = 'user-info-title'> Update Your Account </div>
                <form className = 'user-info-form' onSubmit={handleSubmit}>
                    {userinfo && 
                    (<>
                        
                        <div className = 'user-profile-img'>
                            <label>Profile picture</label>
                            <img
                                src = {file ? URL.createObjectURL(file) : imageKey}
                                alt = ''
                            />
                            <label htmlFor = "fileInput">
                                <i className="user-profile-icon fas fa-user"></i>
                            </label>
                            <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}></input>
                        </div>
                        <div className='user-description'>
                            <label>Username</label>
                            <input type='text' placeholder={userinfo.username} onChange = {(e) => setUsername(e.target.value)}></input>
                            <label>Email</label>
                            <input type='email' placeholder={userinfo.email} onChange = {(e) => setEmail(e.target.value)}></input>
                            <label>Password</label>
                            <input type='password' placeholder='********' onChange = {(e) => setPassword(e.target.value)}></input>
                            <button className = 'user-profile-update' type='submit'>Update</button>
                        </div>

                    </>)}
                    {success && <span>Profile has been updated</span>}
                </form>
            </div>
        </div>
    )
}
