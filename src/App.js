import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Main } from './Contexts/Main';
import Home from './Home';
import Personal from './Personal';

function App() {
  return (
    <div className="App">
      <Main>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/personal' element={<Personal />} />
       </Routes> 
      </Main>
    </div>
  );
}

export default App;
