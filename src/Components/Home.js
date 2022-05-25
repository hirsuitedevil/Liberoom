import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
function Home() {
  return (
  <div>
        <h1>Home</h1>
        <p>
          <Link to="/Login" className='loginlink'>Login</Link>
        </p>
        <p>
          <Link to="/SignUp" className='loginlink'>Sign Up</Link>
        </p>
      </div>
  )
}
export default Home;