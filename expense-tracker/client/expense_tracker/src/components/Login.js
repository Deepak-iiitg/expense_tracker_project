import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import '../App.css';
function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("signin")
  const [user,setUser] = useState({name:'',email:'',password:''});
  const [login,setLogin] = useState({email:'',password:''});

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    console.log(login);
    const message = await axios.post('http://localhost:8080/auth/login/',login);
    console.log(message.data.message);
    if(message.status === 200){
      alert('successfully login');
      let name = message.data.name;
      let email = message.data.email;
      navigate('/dashboard',{state:{name:name,email:email}});
    }else{
      alert(message.data.message);
    }
  }
  const handleUsser=async(e)=>{
    e.preventDefault();
    const message = await axios.post('http://localhost:8080/auth/signup/',user);
    alert(message.data.message);
    setAuthMode('signin');
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={login.email || ''}
                onChange={(e)=>{
                  setLogin({...login,email:e.target.value})
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={login.password || ''}
                onChange={(e)=>{
                  setLogin({...login,password:e.target.value})
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              <button className="btn btn-primary"><Link style={{textDecoration:'none',
              color:'white'}} 
              to='/forgot'>Forgot Password</Link></button>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleUsser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="enter name"
              value={user.name || ''}
              onChange={(e)=>{
                  setUser({...user,name:e.target.value})
                }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={user.email || ''}
                onChange={(e)=>{
                  setUser({...user,email:e.target.value})
                }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={user.password || ''}
                onChange={(e)=>{
                  setUser({...user,password:e.target.value})
                }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Login;