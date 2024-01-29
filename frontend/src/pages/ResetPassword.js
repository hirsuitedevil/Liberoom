import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { request } from '../util/fetchAPI';
import { AiFillEye } from 'react-icons/ai';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const {id,token} = useParams()

  const onsubmitHandler = async (e) => {
  e.preventDefault();
  try {
        if (password !== confirmpassword) {
        setMessage('Passwords do not match');
        return; 
        }
        const headers = {
          'Content-Type' :'application/json',
        }
        await request(`/auth/reset-password/${id}/${token}`, 'POST',headers, {password})
        setMessage('Password reset successfully');
        setTimeout(() => {
        setMessage('');
        navigate('/signin');
      }, 3000);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Layout>
      <div className="flex flex-col bg-slate-700 items-center justify-center min-h-screen">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-slate-900 p-8 px-8" onSubmit={onsubmitHandler}>
          <h3 className="text-2xl dark:text-white font-bold text-center">Reset Password</h3>
          {message && <p className="text-danger">{message}</p>}
          <div className="flex flex-col text-slate-400 py-1 mt-4">
            <label htmlfor="exampleInputPassword1" className="form-label">
              New Password
            </label>
              <div className="bg-slate-700 rounded-lg flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none flex-grow"
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
            <div className="flex flex-col text-slate-400 py-1">
            <label htmlfor="exampleInputPassword1" className="form-label">
              Confirm New Password
            </label>
            <input type='password' name="confirmpassword" className="rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none flex-grow" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
            <button type="submit" className='w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:bg-teal-800 text-white font-semibold rounded-lg'>
              Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ResetPassword
