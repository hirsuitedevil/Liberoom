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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) =>{
      setState(prev =>{
          return {...prev,[e.target.name]: e.target.value}
      })
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
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <form className='bg-light p-4' onSubmit={handleSubmit}>
        <h3 className='bg-dark p-2 mt-2 text-light text-center'>Sign Up</h3>
        {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" name="email" className="form-control" onChange={handleState} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" onChange={handleState} />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
            
              Upload Photo
             <input type="file" className="form-control" id="photo" onChange={(e) => setPhoto(e.target.files[0])} />
            </label>
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
                onChange={handleState}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <AiFillEye
                    onClick={() => {
                      setshowPassword((prevState) => !prevState);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <div className='mt-2'>
            <OAuth />
            <span>Already a user?</span> <Link to='/signin'>Sign In</Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Signup
