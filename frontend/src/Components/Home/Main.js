//importing react library from react in to this file
import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./Header"
import Footer from "./Footer"
//Arrow function 
const Main = () => {
  return (
    <div>
      {/* Rendering means adding here we rendering header,outlet,footer components*/}
      <Header/>
      <Outlet/>
      <Footer/>
        
    </div>
  )
}

export default Main