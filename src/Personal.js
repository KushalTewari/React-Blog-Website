import { Tooltip } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { MyContext } from './Contexts/Main';
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Personal.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Personal = () => {
    const context = useContext(MyContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minHeight: '50vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const editBlog = (id) => {
        var pos = -1;
        var temp = [...context.blogs[0]];
        temp.map((item, index) => item.id === id ? pos=index : null);
        context.currentPos[1](pos);
        context.blogEditModal[1](true);
    }
    
    const deleteBlog = (id) => {
        var temp = [...context.blogs[0]];
        var pos = -1;
        temp.map((item, index) => item.id === id ? pos=index : null)
        temp.splice(pos, 1);
        context.blogs[1](temp);
    }

    const updateBlog = (e) => {
        e.preventDefault();
        var newtitle = document.getElementById('newTitle').value;
        var newcontent = document.getElementById('newContent').value;
        var newimage = document.getElementById('newImage').files[0];
        if(newimage === undefined)
        {
            var temp = [...context.blogs[0]];
            temp[context.currentPos[0]].title = newtitle;
            temp[context.currentPos[0]].content = newcontent;
            context.blogs[1](temp);
        }
        else{
            temp = [...context.blogs[0]];
            temp[context.currentPos[0]].title = newtitle;
            temp[context.currentPos[0]].content = newcontent;
            var image = URL.createObjectURL(newimage);
            temp[context.currentPos[0]].image = image;
            context.blogs[1](temp);
        }
        context.blogEditModal[1](false);
    }
       
    
    useEffect(()=>{
        var temp = context.blogs[0].filter(user => user.name === context.user[0]);
        context.soloBlogs[1](temp);
    }, [context.blogs[0]]);    

  return (
    <div className='Personal'>
        <Navbar />
        <div className='rowArea'>
            <div className='blogArea'>
            {context.soloBlogs[0].length === 0 ? <><h1 style={{margin: 'auto', fontSize: '3vw'}}>You haven't posted any Blogs.</h1></> :
            <>
            {context.soloBlogs[0].map((item, index) => <div key={index} className="soloBlogCard">
                <h1>{item.title}</h1>
                <div className="soloContents">
                    <p>{item.content}</p>
                    <img src={item.image} alt="" />
                </div>
                <span style={{display: 'flex', width: '50%', justifyContent: 'space-evenly'}}><Tooltip title="Edit Blog"><EditIcon sx={{cursor: 'pointer', fontSize: '2.8vw'}} onClick={()=>{editBlog(item.id)}} /></Tooltip><Tooltip title="Delete Blog"><DeleteForeverIcon sx={{cursor: 'pointer', fontSize: '3vw', color: 'red'}} onClick={()=>{deleteBlog(item.id)}}/></Tooltip></span>
            </div>)}
            </> 
            }
            </div>
            <div className="styleImage">
                <img src={require('./SidePic2.jpg')} alt='' />
            </div>
        </div>
        <Modal
        open={context.blogEditModal[0]}
        onClose={()=>{ context.blogEditModal[1](false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: "'Fredericka the Great', cursive", fontWeight: '900', fontSize: '3.5vw', fontVariant: 'small-caps', textAlign: 'center', color: 'dodgerblue'}}>
            Update your Blog
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form className='updateForm' action="" onSubmit={updateBlog}>
                <input type="text" id="newTitle" defaultValue={context.blogs[0][context.currentPos[0]].title} />
                <textarea id="newContent" defaultValue={context.blogs[0][context.currentPos[0]].content} />
                <input type="file" id="newImage" />
                <button type='submit'>Update</button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Personal