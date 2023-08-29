import React, { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { MdDoneOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { request } from '../util/fetchAPI';
import { useNavigate } from 'react-router-dom';
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
        dispatch(updateName(response)); // Update the user's name in the Redux store
        setformData((prevState) => ({
        ...prevState,
        name: response.name, // Update the local state with the updated name from the server
      }));
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Something went wrong!');
      console.log('Error during profile update:', error);
    }
  };
  
  const [imageURL, setImageURL] = useState('');

  // Fetch the profile image URL from the server
  useEffect(() => {
  const fetchProfileImage = async () => {
    try {
      console.log(user.email)
      const response = await request('/auth/profileImage', 'GET', {}, {
        params: { email: user.email } // Pass the email as a query parameter
      });
      setImageURL(response.url); // Update the image URL using response.url
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  fetchProfileImage(); 
}, [user.email]);

  return (
    <Layout>
      <div className='container mt-4 w-50 d-flex justify-content-between'>
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
          {/* Conditionally render the profile image if the imageURL exists */}
          <img alt='Profile' />
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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
