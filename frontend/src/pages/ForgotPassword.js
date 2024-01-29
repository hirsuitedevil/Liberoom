import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { request } from '../util/fetchAPI';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        setMessage('');
        navigate('/signin');
      }, 3000);
    } catch (error) {
      setMessage('Email not found');
    }
  };

  return (
    <Layout>
    <div className="flex flex-col bg-slate-700 items-center justify-center min-h-screen">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-slate-900 p-8 px-8" onSubmit={onsubmitHandler}>
        <h3 className="text-2xl dark:text-white font-bold text-center">Forgot Password</h3>
        {message && (
          <p className={`mt-2 ${message.includes('sent') ? 'text-success' : 'text-danger'}`}>
            {message}
          </p>
        )}
        <div className="flex flex-col text-slate-400 py-1 mt-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            className="rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none flex-grow"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:bg-teal-800 text-white font-semibold rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default ForgotPassword;
