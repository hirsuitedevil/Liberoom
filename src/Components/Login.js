import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const handleSubmit =(e) =>{
    e.preventDefault();
    const details ={username,password}
    console.log(details);
  }
  return (
    <div className='container'>
    <form action="#!" id="main" onSubmit={handleSubmit}>
    <h4><Link to='/'>Liberooms</Link></h4>
    <h2>Log In as Renter</h2>
    <p>Enter your username and password below</p>
    <br></br>
    <div className="input-parent">
      <label><b>USERNAME</b></label>
      <input type="text" id="username" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
    </div>

    <div className="input-parent">
      <label><b>PASSWORD</b> <div className='fpass'><Link to='/ForgotPassword'>Forgot Password</Link> </div></label>
      <input type="password" id="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>

    <button type="submit">Log In</button>
    <p>Don't have an account? <Link to='/SignUp'>Sign Up</Link> </p>
  </form>
  </div>
  );
}
export default Login;