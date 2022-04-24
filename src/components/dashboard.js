import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navbar'

export default function Dashboard() {
    var user = JSON.parse(sessionStorage.user)

    console.log(user.role, user.name, user.email)
    console.log(sessionStorage.getItem('token'))

    let roleSwitch = {admin: "inline", manager: "inline", employee: "inline"}

    if(user.role == 'Admin'){
        roleSwitch.admin = "none"
    }
    else if(user.role == 'Manager'){
        roleSwitch.admin = "none"
        roleSwitch.manager = "none"
    }
    else if(user.role == 'Employee'){
        roleSwitch.admin = "none"
        roleSwitch.manager = "none"
        roleSwitch.employee = "none"
    }

    function manageAdmin(){
        sessionStorage.setItem("externalRole", "Admin")
        window.location = "http://localhost:3000/displayuser"
    }

    function manageManagers(){
        sessionStorage.setItem("externalRole", "Manager")
        window.location = "http://localhost:3000/displayuser"
    }

    function manageEmployees(){
        sessionStorage.setItem("externalRole", "Employee")
        window.location = "http://localhost:3000/displayuser"
    }

    return (
        <div>
            <Navbar/>
            <h1>Welcome: {user.name}</h1>
            <Link to="/editprofile">
            <button>Edit Profile</button>
            </Link>
            <button onClick={manageAdmin} style={{display:roleSwitch.admin}}>Manage Admins</button>
            <button onClick={manageManagers} style={{display:roleSwitch.manager}}>Manage Managers</button>
            <button onClick={manageEmployees} style={{display:roleSwitch.employee}}>Manage Employees</button>
        </div>
    )
}
