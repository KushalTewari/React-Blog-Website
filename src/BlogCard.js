import React, { useContext, useEffect } from 'react';
import './BlogCard.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from './Contexts/Main';
import Drawer from '@mui/material/Drawer';


const BlogCard = (props) => {

  const context = useContext(MyContext);
  

  const drawerHandler = (e) => {
    var id = e.target.parentNode.id;
    var temp = context.blogs[0].filter(item => item.id === id)
    context.currentBlog[1](temp);
  }

  useEffect(()=>{

    if(context.currentBlog[0].length === 0)
    {
      return;
    }
    context.drawerState[1](true);
  }, [context.currentBlog[0]])

  return (
    <div className="BlogCard">
      <div className="detailsArea">
        <div className="userArea">
          <AccountCircleIcon sx={{color: 'dodgerblue', fontSize: '3vw', marginRight: '2%'}}/>
          {props.name}
          <Tooltip title="Read in Full Screen">
          <button id={props.id} onClick={drawerHandler}><ReadMoreIcon sx={{fontSize: '3.5vw', marginLeft: 'auto', cursor: 'pointer'}} onClick={drawerHandler}/></button>
          </Tooltip>
        </div>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
      </div>
      <div className="imageArea">
        <img src={props.photo} alt="" />
      </div>

      <Drawer anchor="top" open={context.drawerState[0]} onClose={()=>{context.drawerState[1](false)}} transitionDuration={{ enter: 800, exit: 300 }}>
        {context.currentBlog[0].length !== 0 ? 
        <div className="drawerArea">
          <button onClick={()=>{ context.drawerState[1](false) }}>X</button>
          <img src={context.currentBlog[0][0].image} alt=""/>
          <h1>{context.currentBlog[0][0].title}</h1>
          <h6>{context.currentBlog[0][0].content}</h6>
          <p>Posted By : {context.currentBlog[0][0].name}</p>
        </div>
        : null}
      </Drawer>
    </div>
  )
}

export default BlogCard