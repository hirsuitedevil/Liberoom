import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import{AiFillEye} from 'react-icons/ai'
import { request } from '../util/fetchAPI'
import { useDispatch } from 'react-redux'
import { register } from '../redux/authSlice';
import OAuth from '../Components/OAuth'

const Signup = () => {
  const [showPassword,setshowPassword] = useState(false)
  const [state, setState] = useState({})
  const [error, setError] = useState(null);
  const [photo,setPhoto] = useState("")
  const [displayedImages, setDisplayedImages] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) =>{
      setState(prev =>{
          return {...prev,[e.target.name]: e.target.value}
      })
  }

  const onChangeHandler = (e) =>{
    setDisplayedImages([]);
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setDisplayedImages([{ url: imageUrl }]);
    setPhoto(e.target.files)
  }

  const handleSubmit = async(e)=> {
    e.preventDefault()
      try {
        let filename = null
        if(photo){
          if (photo.type !== 'image/jpeg') {
            setError('Only .jpg profile pictures are allowed.'); // Set error message
            return;
          }
          const formData = new FormData()
          filename = crypto.randomUUID() + photo.name;
          formData.append("image", photo, filename);
          console.log(formData)
          const data = await request('/upload/image',"POST", {}, formData, true)
          console.log(data)
        }else{
          return
        }

        const headers ={
        'Content-Type': "application/json"
        }
        const responseData = await request('/auth/register', "POST", headers, {...state, profileImg: filename})
        dispatch(register(responseData));
        navigate('/');
      } catch (error) {
          setError(error.message);
          console.error(error)
      }   
    }

  return (
    <Layout>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src='https://cdn.pixabay.com/photo/2016/09/23/16/43/alley-1690053_1280.jpg' />
      </div>
      <div className='bg-slate-800 flex flex-col justify-center p-2'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-slate-900 p-8 px-8' onSubmit={handleSubmit}>
        <h3 className='text-4xl dark:text-white font-bold text-center'>Sign Up</h3>
        {error && <p className="text-danger">{error}</p>}
          <div className='flex flex-col text-slate-400 py-1 mt-4'>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className='rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none'
              onChange={handleState}
            />
          </div>
          <div className='flex flex-col text-slate-400 py-1'>
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className='rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none'
              onChange={handleState}
            />
          </div>
          <div className='flex flex-row items-center text-slate-400 py-2 space-x-4'>
            <label htmlFor="photo" className="form-label">
              Upload Photo
            </label>
            <input type="file" id="photo" className="hidden" onChange={onChangeHandler} />
            {displayedImages.length > 0 ? (
              <img
                src={displayedImages[0].url}
                className="h-25 w-25 rounded-full cursor-pointer"
                alt="Selected"
                onClick={() => document.getElementById('photo').click()}
              />
            ) : (
              <label htmlFor="photo" className="cursor-pointer">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg" // Replace with the path to your avatar image
                  className="h-25 w-25 rounded-full ml-12"
                  alt="Avatar"
                />
              </label>
            )}
          </div>

         <div className="flex flex-col text-gray-400 py-1">
            <label htmlfor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="bg-slate-700 rounded-lg flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="rounded-lg bg-slate-700 p-2 focus:border-blue-500 focus:bg-slate-800 focus:outline-none flex-grow"
                onChange={handleState}
              />
              <AiFillEye
                onClick={() => {
                  setshowPassword((prevState) => !prevState);
                }}
                className={`cursor-pointer text-${showPassword ?'slate-800' : 'slate-300'} mr-2`}
              />
            </div>
          </div>
          <button type="submit" className='w-full my-3 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:bg-teal-800 text-white font-semibold rounded-lg'>
              Signup
          </button>
          <div className='flex justify-between mt-2 text-slate-400'>
            <p className='hover:underline'><Link to='/signin'>Already a user? Login</Link></p>
          </div>   
          <hr className="my-4 border-t border-gray-300" />
            <OAuth/>
                 
        </form>
        </div>
      </div>
      </Layout>
  )
}

export default Signup
