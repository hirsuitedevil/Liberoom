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
  const { user, token } = useSelector((state) => state.auth);
  const [photo,setPhoto] = useState("")
  const [displayedImages, setDisplayedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setformData] = useState({
    name: user.name,
    email: user.email,
    profileImg: user.profileImg,
  });
  const { name, email, profileImg } = formData;

  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  
  const onChangeHandler = (e) =>{
    setDisplayedImages([]);
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setDisplayedImages([{ url: imageUrl }]);
    setPhoto(e.target.files)
  }
  
  const onsubmit = async () => {
    try {
      let filename = profileImg;
      let flag1 = false;

      if (photo) {
        if (photo[0].type !== 'image/jpeg') {
          setErrorMessage('Only .jpg profile pictures are allowed.');
          return;
        }
        
        const formData = new FormData();
        filename = crypto.randomUUID() + photo[0].name;
        formData.append("image", photo[0], filename);
        const data = await request('/upload/image', "POST", {}, formData, true);
        flag1 = true;
      }

      if (user.name !== name || flag1) {
        const response = await request('/auth/update', 'PUT', {
          'Content-Type': 'application/json',
        }, { name, email, profileImg: filename });
        
        // Update Redux state with new user information
        dispatch(updateName(response));
        
        // Update local state with new name and profile image filename
        setDisplayedImages([]);
        setformData((prevState) => ({
          ...prevState,
          name: response.user.name,
          profileImg: response.user.profileImg
        }));

        // Delete old profile image if a new one was uploaded
        if (flag1 && !profileImg.includes('https://lh3.googleusercontent.com')) {
          const headers = {
            'Content-Type': 'application/json', 
          };
          await request(`/upload/deleteImages`, "DELETE", headers, { filenames: [profileImg] });
        }

        // Navigate to the profile page
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Something went wrong!');
      console.log('Error during profile update:', error);
    }
  };


  return (
    <Layout>
      <div className='flex flex-col justify-center'>
      <div className='max-w-[300px] w-full mx-auto rounded-lg bg-slate-200 p-8 px-8 my-3'>
        <div className='card-header'>
          <div className='flex place-items-center'>
            <h4 className='text-2xl dark:text-slate-700 font-bold text-center ml-8'>Profile Details</h4>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                changeDetails && onsubmit();
                setchangeDetails((prevState) => !prevState);
              }}
              className='ml-6 text-xl'
            >
              {changeDetails ? <MdDoneOutline className='text-green-600'/> : <FaEdit className='text-red-600'/>}
            </span>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          </div>
        </div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
              <input type="file" id="photo" className="hidden" onChange={onChangeHandler} disabled={!changeDetails} />
                {displayedImages.length > 0 ? (
                  <img
                    src={displayedImages[0].url}
                    className="rounded-full object-cover h-20 w-20 mt-4 ml-16"
                    alt="Selected"
                    onClick={() => document.getElementById('photo').click()}
                  />
                ) : (
                  <label htmlFor='photo' className='form-label'>
                {
                  profileImg.includes('https://lh3.googleusercontent.com') ? (
                  <img src={profileImg} alt='Google Profile' className='rounded-full object-cover h-20 w-20 mt-4 ml-16'/>
                  ) : (
                  <img src={`http://localhost:5000/images/${profileImg}`} alt='Local Profile' className='rounded-full object-cover h-20 w-20 mt-4 ml-16'/>
                  )
                }
              </label>
                )}
            </div>
            <div className='flex flex-col text-slate-700'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input type="text" 
              className='form-control bg-slate-100' 
              id="name"
              value={name}
              onChange={ onchange }
              disabled={!changeDetails} />
            </div>
            <div className='flex flex-col text-slate-700 py-1'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control bg-slate-600'
                id='email'
                value={email}
                onChange={onchange}
                disabled
              />
            </div>
          </form>
          <Link to="/create-listing" className='flex text-slate-700 mt-2 place-items-center hover:underline'> <FaArrowAltCircleRight/> &nbsp;Add your properties</Link>
          <Link to="/view-listing" className='flex text-slate-700 mt-1 place-items-center hover:underline'> <FaArrowAltCircleRight/>&nbsp;View your properties</Link>
        </div>
      </div>
      <div>
      </div>
      </div>
    </Layout>
  );
};

export default Profile;
