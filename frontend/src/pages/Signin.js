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
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='bg-slate-800 flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-slate-900 p-8 px-8' onSubmit={handleLogin}>
          <h3 className='text-4xl dark:text-white font-bold text-center'>Sign In</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className='flex flex-col text-slate-400 py-1 mt-4'>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className='rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col text-gray-400 py-1'>
          <label htmlfor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="bg-slate-700 rounded-lg flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className='rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none flex-grow'
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiFillEye
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
                className={`cursor-pointer text-${showPassword ?'slate-800' : 'slate-300'} mr-2`}
              />
            </div>
            </div>
            <button type="submit" className='w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:bg-teal-800 text-white font-semibold rounded-lg'>
              Sign In
            </button>
            <div className='flex justify-between mt-2 text-slate-400'>
                <p className='hover:underline'><Link to="/signup">Sign Up</Link></p>
                <p className='hover:underline'><Link to="/forgotpassword">Forgot Password?</Link></p>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <OAuth/>
        </form>
      </div>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src='https://cdn.pixabay.com/photo/2016/09/23/16/43/alley-1690053_1280.jpg' />
      </div>
    </div>
    </Layout>
  );
};

export default SignIn;
