import React, {useState} from 'react'
import axios from 'axios'

export default function PasswordUpdate() {

    let token = sessionStorage.getItem("token")

    var user = JSON.parse(sessionStorage.user)

    console.log(user.role, user.name, user.email, user.address, typeof(user.id))

    const [credentials, setCredentials] = useState({
        id : user.id,
        password:"",
        repeatpassword:""
    })

    const {repeatpassword, password, id} = credentials

    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value})

    function validateForm() {
        return password.length >0 && repeatpassword.length>0
    }

    async function handleSubmit(event) {
        if(password != repeatpassword){
            alert("Please Enter Same Passwords in Both the Fields")
        }

        event.preventDefault();
        const Credentials = {
            password,
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

            const response = await axios.post('/updatePassword', body, config)

            console.log(response);


            if(response.status === 200)
            {
                alert("Password Updated")
                window.location = "http://localhost:3000/"
            }

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
            <label>New Password</label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <label>Repeat Password</label>
            <input
                name="repeatpassword"
                type="password"
                value={repeatpassword}
                onChange={(e) => onChange(e)}
            />
            <br/>
            <button type="submit" disabled={!validateForm()}>Save</button>
            </form>
        </div>
    )
}
