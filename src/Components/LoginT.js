import React from 'react';
import './loginT.css';
function LoginT() {
  return (
    <div className='container'>
    <form action="#!" id="main">
    <h4>Liberooms</h4>
    <h2>Log In as Tenant</h2>
    <p>Enter your username and password below</p>
    <br></br>
    <div class="input-parent">
      <label><b>USERNAME</b></label>
      <input type="text" id="username" placeholder='Username'></input>
    </div>

    <div class="input-parent">
      <label><b>PASSWORD</b> <a href='./Components/ForgotPassword' className='fpass'> Forgot Password?</a></label>
      <input type="password" id="password" placeholder='Password'/>
    </div>

    <button type="submit">Log In</button>
    <p>Don't have an account? <a href='./Components/SignUp'><b>Sign Up</b></a></p>
  </form>
  </div>
  )
}
export default LoginT;