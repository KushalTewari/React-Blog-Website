import React, { useContext } from 'react';
import './Home.css';
import { MyContext } from './Contexts/Main';
import Navbar from './Navbar';
import BlogCard from './BlogCard';
import CreateIcon from '@mui/icons-material/Create';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';


const Home = () => {
    const context = useContext(MyContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minHeight: '35vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      };
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        minHeight: '35vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const style3 = {
        position: 'absolute',
        top: '50%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        minHeight: '50vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const style4 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        minHeight: '15vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    
    const addNewPost = () => {
      if(context.user[0]==="")
      {
        context.loginModal[1](true);
      }
      else
      {
        context.addPostModal[1](true);
      }
    }

    const uploadImage = (e) => {
        var image = URL.createObjectURL(e.target.files[0]);
        context.imageAddress[1](image);
    }

    const validate = (e) => {
        e.preventDefault();
        var id = context.idCounter[0].toString();
        var title = document.getElementById('newTitle').value;
        var content = document.getElementById('newContent').value;
        var image = context.imageAddress[0];
        var temp = [...context.blogs[0]];
        temp.unshift({id: id, name: context.user[0], title: title, content: content, image: image });
        context.blogs[1](temp);
        document.getElementById('newTitle').value = "";
        document.getElementById('newContent').value = "";
        context.imageAddress[1]("");
        context.idCounter[1](context.idCounter[0] + 1);
        context.addPostModal[1](false);
    }

    const validateLogin = (e) => {
      e.preventDefault();
      var email = document.getElementById('loginEmail').value;
      var password = document.getElementById('loginPassword').value;
      var temp = context.bloggers[0].filter(user => user.email.toLowerCase()=== email.toLowerCase() && user.password === password);

      if(temp.length === 0)
      {
        context.message[1]("Invalid Credentials !!");
        context.messageModal[1](true);
      }
      else
      {
        context.user[1](temp[0].name);
        context.loginModal[1](false);
      }
    }

    const validateRegistration = (e) => {
      e.preventDefault();
      var name = document.getElementById('registerName').value;
      var email = document.getElementById('registerEmail').value;
      var password = document.getElementById('registerPassword').value;
      var confPassword = document.getElementById('confirmRegisterPassword').value;
      if(password !== confPassword)
      {
        context.message[1]("Password and Confirm Passwords must be same !!");
        context.messageModal[1](true);
      }
      else
      {
        var temp = [...context.bloggers[0]];
        temp.push({name: name, email: email, password: password})
        context.bloggers[1](temp);
        context.registerModal[1](false);
      }
    }

  return (
    <div className='Home'>
        <Navbar />
        <div className='rowArea'>
            <div className='styleImage'>
                <img src={require('./SidePic.jpg')} alt="" />
            </div>
            <div className='blogArea' id="blogArea">
                {context.blogs[0].map((item, index) => <BlogCard key={index} id={item.id} name={item.name} title={item.title} content={item.content} photo={item.image} />)}
            </div>
        </div> 

        <Tooltip title="Write a New Blog">
        <button onClick={addNewPost} className='addPost'><CreateIcon sx={{color: 'white', fontSize: '3vw'}}/></button>
        </Tooltip>

        {/* Modal for new blog */}
        <Modal
        open={context.addPostModal[0]}
        onClose={()=> { context.addPostModal[1](false); context.imageAddress[1]("")}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: "'Fredericka the Great', cursive", fontWeight: '900', fontSize: '3.5vw', fontVariant: 'small-caps', textAlign: 'center', color: 'dodgerblue'}}>
            Share your Knowledge
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={validate} className="form">
                <input type="text" placeholder="Blog Title" id="newTitle" required/>
                <textarea placeholder="Your Content here" id="newContent" required/>
                {context.imageAddress[0]==="" ? null : <div className="uploadedImage">
                <img src={context.imageAddress[0]} alt="" />
                </div>}
                <input type="file" id="image" onChange={uploadImage} required/>
                <button type="submit">Post</button>
            </form>
          </Typography>
        </Box>
      </Modal>

      {/* Modal for login */}
      <Modal
        open={context.loginModal[0]}
        onClose={()=> { context.loginModal[1](false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: "'Fredericka the Great', cursive", fontWeight: '900', fontSize: '3.5vw', fontVariant: 'small-caps', textAlign: 'center', color: 'dodgerblue'}}>
            Login
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={validateLogin} className="loginForm">
                <input type="text" placeholder="Email Address" id="loginEmail" required/>
                <input type="password" placeholder="Password" id="loginPassword" required/>
                <button type="submit">Log In</button>
                <p>Not a user? <span className="blueText" onClick={()=>{context.registerModal[1](true)}}> Register now</span></p>
            </form>
          </Typography>
        </Box>
      </Modal>

      {/* Modal for Registration Form */}
      <Modal
        open={context.registerModal[0]}
        onClose={()=> { context.registerModal[1](false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: "'Fredericka the Great', cursive", fontWeight: '900', fontSize: '3.5vw', fontVariant: 'small-caps', textAlign: 'center', color: 'dodgerblue'}}>
            Register
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form action="" onSubmit={validateRegistration} className="registerForm">
                <input required type="text" id="registerName" placeholder="Username"/>
                <input required type="email" id="registerEmail" placeholder="E-Mail Address"/>
                <input required type="password" id="registerPassword" placeholder="Password"/>
                <input required type="password" id="confirmRegisterPassword" placeholder="Confirm Password"/>
                <button>Register Me</button>
                <p>Already a user? <span className="blueText" onClick={()=>{context.registerModal[1](false)}}> Log In</span></p>
            </form>
          </Typography>
        </Box>
      </Modal>

      {/* Modal for Messages and Warnings */}
      <Modal
        open={context.messageModal[0]}
        onClose={()=> { context.messageModal[1](false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style4}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontFamily: "'Fredericka the Great', cursive", fontWeight: '900', fontSize: '3.5vw', fontVariant: 'small-caps', textAlign: 'center', color: 'red'}}>
            Message!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center'}}>
            {context.message[0]}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Home