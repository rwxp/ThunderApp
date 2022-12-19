//Contact Page This component is created to just show rendering
import React from 'react'
import "../../App.css";
import { useEffect } from 'react';
import Navbar from './Navbar.js';

const Contact = () => {
    useEffect(() => {
        window.scroll(0, 0);
      }, []);
    return (
        // Contact Page
        <div className='mt-5 pt-5 mainPage container d-flex justify-contnt-center align-items-center'>
            <Navbar />  
            <h1>Contact Comming Soon....</h1>
        </div>
    )
}

export default Contact;
// CODE BY GRACY PATEL