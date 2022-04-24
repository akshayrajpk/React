import React, {useState}from 'react'
import axios from 'axios'

export default function EditUser() {

    let token = sessionStorage.getItem("token")

    var user = JSON.parse(sessionStorage.externalUser)
    
    const [credentials, setCredentials] = useState({
        email : user.email,
        name : user.name,
        address : user.address,
        id : user.id
    })
    
    const {email, name, address, id} = credentials

    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value})

    function validateForm() {
        return name.length > 0 && address.length > 10;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const Credentials = {
            email,
            name,
            address,
            id
        }

        console.log("LOGINCREDS"+Credentials)

        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token':token
                }
            }

            const body = JSON.stringify(Credentials)

            const response = await axios.post('/updateDetails', body, config)

            console.log(response);


            if(response.status === 200)
            {
                alert("Profile Updated")
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
                onChange={(e) => onChange(e)}
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
            <button type="submit" disabled={!validateForm()}>Save</button>
            </form>
        </div>
    )
}
