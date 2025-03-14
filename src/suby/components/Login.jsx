import React,{useState} from "react";
import { API_URL } from "../api";

const Login = ({ onClose ,showSignUpHandler}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const loginHandler=async(e)=>{
      e.preventDefault()
      try {
        const response=await fetch(`${API_URL}/user/login`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,password})
        })
        const data=await response.json()
        if(!response.ok){
          console.log("Login Failed",data.message || "Unknown Error")
          alert(data.message ||"Login Failed.Please try again later")
        }
        alert("Login Sucess!!!")
        localStorage.setItem("userLoginToken",data.token)
        localStorage.setItem("userId",data.userId)
        localStorage.setItem("cart", JSON.stringify(data.cart || []));

        setPassword("")
        setEmail("")
        window.location.reload()
        if (onClose) onClose();

      } catch (error) {
        console.log("Error",error)
        alert("An error occured.Please try again later")
      }
  }
  return (
    <div className="loginModal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>User Login</h3>
        <form className="authForm" onSubmit={loginHandler}>
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" /><br />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
          <br/>
          <div className="signUpSection">
            Create a new user? <span onClick={showSignUpHandler}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
