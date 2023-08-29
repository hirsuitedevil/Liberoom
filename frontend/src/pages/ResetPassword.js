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
        navigate('/signin'); // Redirect after successful reset
      }, 3000);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className="bg-light p-4" onSubmit={onsubmitHandler}>
          <h3 className="bg-dark p-2 mt-2 text-light text-center">Reset Password</h3>
          {message && <p className="text-danger">{message}</p>}
          <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">
              New Password
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
          </div>
            <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">
              Confirm New Password
            </label>
            <input type='password' name="confirmpassword" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
        </form>
      </div>
    </Layout>
  )
}

export default ResetPassword
