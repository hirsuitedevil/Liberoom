import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { AiFillEye } from 'react-icons/ai';
import { request } from '../util/fetchAPI';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import OAuth from '../Components/OAuth';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const options = {
        'Content-Type': 'application/json',
      };
      const data = await request('/auth/login', 'POST', options, { email, password });
      dispatch(login(data));
      navigate('/');
    } catch (error) {
      setErrorMessage('Invalid email or password');
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={handleLogin}>
          <h3 className="bg-dark p-2 mt-2 text-light text-center">Sign In</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlfor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <AiFillEye
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                </span>
              </div>
            </div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
              <span>
                <Link to='/forgotpassword'>Forgot Password</Link>
              </span>
            </div>
          </div>
          <div className="mt-2">
            <OAuth/>
            <span>New user?</span> <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
