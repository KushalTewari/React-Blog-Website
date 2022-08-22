import React, { createContext, useState } from "react";

const MyContext = createContext();

const Main = (props) => {
    
    const [bloggers, setBloggers] = useState([
        {name: 'Kushal', email: 'Kushal@gmail.com', password: '12345'},
        {name: 'Geet', email: 'geet@gmail.com', password: '123'},
    ]);
    const [user, setUser] = useState("");
    const [blogs, setBlogs] = useState([
        {id: '3', name: 'Kushal', title: 'React and its Usage', content: 'React.js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It’s used for handling the view layer for web and mobile apps. React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple. It works only on user interfaces in the application. This corresponds to the view in the MVC template.', image: 'https://railsware.com/blog/wp-content/uploads/2019/07/Why-we-use-ReactJS-for-our-projects-Illustration.jpg'},
        
        {id: '2', name: 'Geet', title: 'Parenting', content: 'Parenting or child rearing promotes and supports the physical, emotional, social, and intellectual development of a child from infancy to adulthood. Parenting refers to the intricacies of raising a child and not exclusively for a biological relationship. The most common caretaker in parenting is the father or mother, or both, the biological parents of the child in question. However, a surrogate may be an older sibling, a step-parent, a grandparent, a legal guardian, aunt, uncle, other family members, or a family friend.', image: 'https://gurukul.org/wp-content/uploads/2019/10/parenting-internatiaonal-school-gurukul-21st-century-parenting.jpg'},

        {id: '1', name: 'Riyansh', title: 'Good Eating habits', content: 'All humans eat to survive. They also eat to express appreciation, for a sense of belonging, as part of family customs, and for self-realization. For example, someone who is not hungry may eat a piece of cake that has been baked in his or her honor.People eat according to learned behaviors regarding etiquette, meal and snack patterns, acceptable foods, food combinations, and portion sizes. Etiquette refers to acceptable behaviors.', image: 'https://tastykitchen.com/recipes/wp-content/uploads/sites/2/2012/03/Customizable-Bread-Bowl-Breakfast-410x273.jpg'},
    ]);

    const [drawerState, setDrawerState] = useState(false);
    const [currentBlog, setCurrentBlog] = useState([]);
    const [addPostModal, setAddPostModal] = useState(false);
    const [imageAddress, setImageAddress] = useState('');
    const [idCounter, setIdCounter] = useState(4);
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [message, setMessage] = useState("");
    const [soloBlogs, setSoloBlogs] = useState([]);
    const [blogEditModal, setBlogEditModal] = useState(false);
    const [currentPos, setCurrentPos] = useState('0');
    
    
return (
    <MyContext.Provider value={{user: [user, setUser], blogs: [blogs, setBlogs], drawerState: [drawerState, setDrawerState], currentBlog: [currentBlog, setCurrentBlog], addPostModal: [addPostModal, setAddPostModal], imageAddress: [imageAddress, setImageAddress], idCounter: [idCounter, setIdCounter], loginModal: [loginModal, setLoginModal], registerModal: [registerModal, setRegisterModal], bloggers: [bloggers, setBloggers], messageModal: [messageModal, setMessageModal], message: [message, setMessage], soloBlogs: [soloBlogs, setSoloBlogs], blogEditModal: [blogEditModal, setBlogEditModal], currentPos: [currentPos, setCurrentPos]}}>
    {props.children}
    </MyContext.Provider>
    )
}

export  { Main, MyContext };