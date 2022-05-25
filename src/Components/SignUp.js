//json-server --watch db.json --port 8000
import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import './signup.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SignUp() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCPassword] = useState('');

  const history=useHistory();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const details = {username,password,cpassword};
    
    console.log(details);
    fetch('http://localhost:8000/details',{
      method:'POST',
      headers:{"Content-Type": "application/json" },
      body : JSON.stringify(details)
    }).then(()=>{
      console.log('new account added');
      history.push('/Login');
    })
  }
  return (
    <div className='container'>
    <form id="main">
    <h4><Link to='/'>Liberooms</Link></h4>
    <h2>Sign Up as Renter</h2>
    <p>Enter your username and password below</p>
    <br></br>
    <div className="input-parent">
      <label><b>USERNAME</b></label>
      <input type="text" id="username" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
    </div>
    <div className="input-parent">
      <label><b>PASSWORD</b> </label>
      <input type="password" id="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>

    <div className="input-parent">
      <label><b>CONFIRM PASSWORD</b> </label>
      <input type="password" id="cpassword" placeholder='Password' value={cpassword} onChange={(e)=>setCPassword(e.target.value)} />
    </div>

    <button type="submit" onClick={handleSubmit}>Sign Up</button>
    <p>Have an account? <Link to='/Login'>Login</Link></p>
  </form>
  </div>
  );
}
export default SignUp;