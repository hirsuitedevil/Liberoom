import React from 'react';
import { useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { MdDoneOutline } from 'react-icons/md';
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa';
import { request } from '../util/fetchAPI';
import { useNavigate, Link } from 'react-router-dom';
import { updateName } from '../redux/authSlice';

const Profile = () => {
  const [changeDetails, setchangeDetails] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setformData] = useState({
    name: user.name,
    email: user.email,
  });
  const { name, email } = formData;

  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onsubmit = async () => {
    try {
      if (user.name !== name) {
        const response = await request('/auth/update', 'PUT', {
          'Content-Type': 'application/json',
        }, {
          name,
          email,
        });
        dispatch(updateName(response)); 
        setformData((prevState) => ({
        ...prevState,
        name: response.name,
      }));
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Something went wrong!');
      console.log('Error during profile update:', error);
    }
  };

  return (
    <Layout>
      <div className='container mt-4 w-25 d-flex'>
        <h4>Profile Details</h4>
      </div>
      <div className='container mt-4 card' style={{ width: '18rem' }}>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <p> User Personal Details</p>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                changeDetails && onsubmit();
                setchangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? <MdDoneOutline /> : <FaEdit />}
            </span>
          </div>
        </div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
        <label htmlFor='photo' className='form-label'>
          {
            user.profileImg.includes('https://lh3.googleusercontent.com') ? (
            <img src={user.profileImg} alt='Google Profile' />
            ) : (
            <img src={`http://localhost:5000/images/${user.profileImg}`} alt='Local Profile' width="100px" height="100px"/>
            
            )
            
          }
        </label>
      </div>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                value={name}
                onChange={onchange}
                disabled={!changeDetails}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                value={email}
                onChange={onchange}
                disabled={!changeDetails}
              />
            </div>
          </form>
          <Link to="/create-listing"> <FaArrowAltCircleRight/>&nbsp;Add your properties</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
