import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { request } from '../util/fetchAPI';

const ForgotPassword = () => {
  const [email,setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const onsubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const options = {
      'Content-Type': 'application/json',
    };
    const data = await request('/auth/forgot-password', 'POST', options, { email });
    console.log(data);
    setMessage('Password reset email sent.');
    setTimeout(() => {
      setMessage(''); // Clear the message after a few seconds
      navigate('/signin'); // Redirect to the sign-in page
    }, 3000);
  } catch (error) {
    setMessage('Email not found'); // Display the error message to the user
  }
};


  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onsubmitHandler}>
          <h3 className="bg-dark p-2 mt-2 text-light text-center">Reset Password</h3>
          {message && (
            <p className={`mt-2 ${message.includes('sent') ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value= {email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='d-flex justify-content-between'>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
          <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
