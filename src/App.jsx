import React from 'react'
import './App.css';
import Header from './Header.jsx';
import Editjob from './Editjob.jsx';
import Addjob from './Addjob.jsx';
import Editprofile from './editProfile.jsx';

function App() {
  return (
    <>
    <Header /> 
    {/* <Editjob /> edit this later after addjob is done */}
    {/* <Addjob /> */}
    <Editprofile />
    </>

  )
}

export default App
