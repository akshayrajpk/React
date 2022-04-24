import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './displayUser.css'

export default function DisplayUser() {  
    
    let token = sessionStorage.getItem("token")

    const [userData, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    async function getData(){
        let rolePassed = sessionStorage.getItem("externalRole")
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token':token
                }
            }
            const response = await axios.get('/displayList/'+rolePassed, config)
            console.log(response);
            if(response.status === 200)
            {
                setData(response.data)
            }

        }catch(err){
            console.log(err)
        }
    }

    const removeData = async (_id) => {
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token':token
                }
            }
            const response = await axios.get('/deleteUser/'+_id, config)
            console.log(response);
            if(response.status === 200)
            {
                const del = userData.filter(userData => _id !== userData._id)
                setData(del)
            }

        }catch(err){
            console.log(err)
        }
    }

    const editData = (id, name, email, address, age) =>{
        let dat ={
            id,
            name,
            email,
            address,
            age
        }
        sessionStorage.externalUser = JSON.stringify(dat)
        window.location= "http://localhost:3000/edituser"
    }

    const dataParser = () =>{    
       return userData && userData.map(({ _id, address, name, age, email }) => {
        return (
            <tr key={_id}>
                <td style={{display:"none"}}>{_id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{age}</td>
                <td className='opration'>
                    <button className='button' onClick={() => removeData(_id)}>Delete</button>
                </td>
                <td className='opration'>
                    <button className='button' onClick={() => editData(_id,name,email,address,age)}>Edit</button>
                </td>
            </tr>
        )
        })

    }

    const headerParser = () => {
        let headers = ['name', 'email', 'address', 'age']

        return headers.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }  

    
    return (        
        <div>
            <h1>{sessionStorage.getItem("externalRole")} List</h1>
            <Link to="/adduser">
            <button>Add New {sessionStorage.getItem("externalRole")}</button>
            </Link>
            <table id='students'>
                <tr>{headerParser()}</tr>
               <tbody>
                  {dataParser()}
               </tbody>
            </table>            
        </div>
    )
}
