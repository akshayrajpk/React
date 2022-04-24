import { useState, useEffect } from 'react'

import axios from 'axios'
import './login.css';


const Login = () => {

    const [credentials, setCredentials] = useState({
        email : '',
        password : ''
    })

    useEffect(() => {  
           window.history.forward(1);
     });
    
    const {email, password} = credentials

    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value})

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const loginCredentials = {
            email,
            password
        }

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(loginCredentials)

            const response = await axios.post('/login', body, config)

            if(response.status === 200)
            {
                sessionStorage.user = JSON.stringify(response.data.payload.user)
                sessionStorage.setItem("token", response.data.token)
                window.location = "http://localhost:3000/dashboard"
            }

        }catch(err){
            alert("Invalid Credentials")
            console.log(err)
        }
    }

    return (
        <div className="container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit} >
            <label><b>Email</b></label>
            <input
                className="form-control"
                autoFocus
                name="email"
                type="email"
                value={email}
                onChange={(e) => onChange(e)}
            />
            <br/>

            <label><b>Password</b></label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <button  type="submit" disabled={!validateForm()}>Login</button>

        </form>
      </div>
    )
}

export default Login;
