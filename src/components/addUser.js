import React , {useState} from 'react'
import axios from 'axios'

export default function AddUser() {

    let token = sessionStorage.getItem("token")

    let rolePassed = sessionStorage.getItem("externalRole")

    const [credentials, setCredentials] = useState({
        email : "",
        name : "",
        address : "",
        age: "",
        password:"",
        role: rolePassed
    })

    const {email, name, address, age, password} = credentials

    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value})

    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length > 0 && address.length > 10 && age>18;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token':token
                }
            }

            const body = JSON.stringify(credentials)

            const response = await axios.post('/register', body, config)

            console.log(response);


            if(response.status === 200)
            {
                alert("User Registered")
                window.location = "http://localhost:3000/displayuser"
            }

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
                autoFocus
                name="email"
                type="email"
                value={email}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <label>Name</label>
            <input
                autoFocus
                name="name"
                type="text"
                value={name}
                onChange={(e) =>{let val = e.target.value.replace(/[^A-Za-z]/gi, "")
                                setCredentials({...credentials, name:val})
                            }}
            />
            <br/>
            <label>Address</label>
            <textarea
                autoFocus
                name="address"
                type="text"
                value={address}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <label>Age</label>
            <input
                autoFocus
                name="age"
                type="number"
                value={age}
                onChange={(e) => onChange(e)}
            />
            <label>Password</label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <button type="submit" disabled={!validateForm()}>Save</button>
            </form>
        </div>
    )
}
