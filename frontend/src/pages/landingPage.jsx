import React from 'react'
import  "../App.css";
import { Link } from 'react-router-dom';


export default function landingPage() {
  return (
    <div className='landingPageContainer '>
      <nav>
        <div className='navheader'>
          <h1>StudyMeet</h1>
        </div>
        <div className='navlist'>
          <p>Join As Guest</p>
          <p>Register</p>
          <p>Login</p>
        </div>
      </nav>

      <div className='landingMainContainer'>
        <div>
          <h2><span style={{ color: "#FF9839" }}>Connect</span> with your Mentor</h2>
          
          <p>Cover a Learning by StudyMeet</p>
        <div role='button'>
          <Link to={'/auth'}>Get Started</Link>
        </div>
        </div>
        <div>
          <img src="/desktop.png" />
        </div>
      </div>
      
    </div>
  )
}
