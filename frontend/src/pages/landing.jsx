import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
        <div className='navHeader' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/call.png" alt="logo" style={{ height: '24px', width: '24px' }} />
                    <h2 style={{ fontWeight: 'bold', margin: 0 }}>FaceGrid</h2>

                
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

                    <p>"Closer than ever with <span style={{ color: "#FF9839" }} >FaceGrid</span>"</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/desktop.png" alt="" />

                </div>
            </div>



        </div>
    )
}