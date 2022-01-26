import './write.css';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {Context} from '../context/Context';
import imageCompression from 'browser-image-compression';

export default function Write() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [catlist, setCatlist] = useState([]);

    useEffect(async () => {
        const cats = await axios.get('/categories');
        const temparr = cats.data.map((c) => c.name);
        setCategories(temparr);
    },[]);

    const handleAddCategory = (e) => {
        let temparr = catlist;
        if (!temparr.includes(e.target.value))
            temparr.push(e.target.value);
        setCatlist([...temparr]);
    }

    const handleRemoveCategory = (e) => {
        let temparr = catlist;
        temparr.pop();
        setCatlist([...temparr]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            categories: catlist,
            title,
            description,
        };
        if (file){
            const compressedFile = await imageCompression(file, {maxSizeMB: 0.5});    // handled image compression
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", compressedFile);

            try{
                console.log(data);
                const res = await axios.post('/upload', data);
                console.log(res);
                newPost.photo = res.data.Key;
            }catch(err){
                console.log("error1: " + err);
            }
            try{
                console.log(newPost); 
                const res = await axios.post('/posts', newPost);
                window.location.replace('/singlepost/' + res.data._id);
            }catch(err){
                console.log("error2: " + err);
            }
        }
        
    } 
    return (
        <div className = 'write'>
            <div className='write-title'>Write New Blog</div>
            <form className = 'write-form' onSubmit={handleSubmit}>
               
                <div className = 'write-form-group'> 

                    <label htmlFor='fileInput'>
                        <i className="write-icon far fa-plus-square fa-2x"></i>
                    </label>
                    <input type = 'file' id = 'fileInput' style={{display: 'none'}} 
                    onChange={e=>setFile(e.target.files[0])}></input>


                    {
                        file && (
                            <img
                            className = 'write-img'
                            src = {URL.createObjectURL(file)}
                            alt = ''
                        />)
                    }
                    
                </div>

                <div className='write-categories-container'>
                    <input className = 'write-input' type='text' placeholder='Enter Title'
                     id = 'TextInput' autoFocus = {true} onChange={(e) => setTitle(e.target.value)}/>
                    <div>
                        <div className='write-categories-all-selected' key={catlist}>
                            {catlist.map((c,i) => (
                                <div className='write-category' key={Math.random()}>{c}</div>
                            ))}
                        </div>
                        <select name="catlist" id="catlist" className='dropdown-categories-all' onChange={handleAddCategory}>
                            <option value=''>Select Categories</option>
                            {categories.map((c,i)=> (
                                <option value={c} key={Math.random()}>{c}</option>
                            ))}
                        </select>
                        
                        <i className="far fa-trash-alt fa-2x category-delete-icon" onClick={handleRemoveCategory}></i>
                    </div>
                    <textarea placeholder='tell your story...' type='text' className='write-story write-input'
                    onChange={e=>setDescription(e.target.value)}></textarea>
                    <button className = 'write-submit' type='submit'>Publish</button>
                </div>
                
            </form>
        </div>
    )
}
