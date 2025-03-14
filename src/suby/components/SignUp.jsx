import React, { useState } from 'react'
import { API_URL } from '../api'

const SignUp=({onClose,showLoginHandler})=>{
    const [userName,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phone,setPhone]=useState("")
    const [address,setAddress]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch(`${API_URL}/user/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({userName,email,password,phone,address})
            })
            const data=await response.json()
            if(!response.ok){
                console.log("Error",data)
                alert(`SignUp failed: ${data.message || "Invalid request"}`);
                return 
            }
            console.log(data)
            alert("User registered Succssfully !!!")
            setUsername("")
            setPassword("")
            setEmail("")
            setPhone("")
            setAddress("")
            showLoginHandler()


        } catch (error) {
            console.log("Error",error)
            alert("An error occured.Please try again later")
            
        }
    }
    return(
        <div className="signUpModal">
           <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h3>User SignUp</h3>
            <form className="authForm" onSubmit={handleSubmit}>
                <label>UserName:</label>
                <input type="text" name="userName" placeholder="Enter your name" value={userName} onChange={(e)=>setUsername(e.target.value)}/><br />
                <label>Email:</label>
                <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
                <label>Password:</label>
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <label>Phone Number:</label>
                <input type="text" name="phone" placeholder="Enter your phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <label>Address:</label>
                <input type="text" name="address" placeholder="Enter your Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <div className="btnSubmit">
                     <button type="submit">Submit</button>
                </div>

            </form>
           </div>
            
        </div>
    )
}

export default SignUp