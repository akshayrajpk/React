import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
    function logout(){
        sessionStorage.setItem("token","null")
        window.location = "http://localhost:3000/"
    }
    return (
        <div className='topnav'>            
            <button onClick={logout}>Logout</button>
            <Link to="/updatepassword">
            <button>Change Password</button>
            </Link>
            
        </div>
    )
}
