import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { MyContext } from './Contexts/Main';
import { Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const sendToPersonal = () => {
      if(context.user[0]=== "")
      {
        context.loginModal[1](true);
      }
      else{
        var temp = context.blogs[0].filter(user => user.name === context.user[0]);
        context.soloBlogs[1](temp);
        navigate('/personal');
      }
    }

    useEffect(()=>{
      if(context.user[0]==="")
      {
        navigate("/");
        return;
      }
    },[context.user[0]])
  return (
    <div className='Navbar'>
      <Tooltip title="Home">
        <div className='logoArea' onClick={()=>{navigate('/'); context.currentBlog[1]([])}}>
            <img src={require('./Logo.png')} alt="Logo" />
            <h1>BloG</h1>
        </div>
        </Tooltip>
        <div className='contentsArea'>
            <button onClick={sendToPersonal}>Your Posts</button>
            {context.user[0]==="" ? <button onClick={()=>{context.loginModal[1](true)}}>Login/Register</button> : <><h3>Hi, {context.user[0]}</h3> <Tooltip title="Log Out"><LogoutIcon sx={{color: 'white', fontSize: '3vw', cursor: 'pointer'}} onClick={()=>{context.user[1]("")}}/></Tooltip></>}
        </div>
    </div>
  )
}

export default Navbar