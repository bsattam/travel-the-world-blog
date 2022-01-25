import './sidebar.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    
    useEffect(() => {
        const getCats = async() => {
            const res = await axios.get('/categories');
            let sortedCategories = res.data.map(category => {
                return category.name;
            })
            await sortedCategories.sort();
            console.log(sortedCategories);
            setCats(sortedCategories);
        }
        getCats();
    },[])
    return (
        <div className = 'sidebar'>
            <div className='sidebar-item'>
                <span className='sidebar-title'>Welcome Note</span>
                <p className = 'sidebar-desc'>
                    Hello! Are you also someone born with itchy feet? 
                    Welcome! This is a travel-blog website, the perfect hangout zone for the crazy nomads. Here
                    you can read others' experiences of touring around the world, as well as
                    you can also write stories of your own adventures. So what are you waiting for? 
                    Let's start happy blogging and reading. Cheers.
                </p>
                <span className='sidebar-title'>Categories</span>
                <ul className = 'sidebar-list'>
                    {cats.map((category, i) => (
                        <Link to={`/?cat=${category}`} className='react-link'>
                            <li className = 'sidebar-list-item' key={Math.random()}> {category} </li>
                        </Link>
                    ))}
                </ul>
               
            </div>
        </div>
    )
}
