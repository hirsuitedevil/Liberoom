import React,{useState, useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { request } from '../util/fetchAPI'
import Spinner from '../Components/Spinner'
import { useSelector } from 'react-redux'

const Contact = () => {
  const [message, setMessage] = useState("");
  const [listing, setListing] = useState(null);
  const {listingId} = useParams()
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getLandlord = async () => {
        try {
            const data = await request(`/property/find?id=${listingId}`, "GET")
            setListing(data)
        }catch(error){
            console.error(error)
        }
    };
    getLandlord();
  }, [listingId]);

  return (
    <Layout>
      <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-secondary">
          <div className='d-flex justify-content-center align-items-center mt-2'>
          <div className='border border-primary rounded-circle'>
              {
                user.profileImg.includes('https://lh3.googleusercontent.com') ? (
                <img src={user.profileImg} alt='Google Profile' className='rounded-circle' width="50px" height="50px"/>
                ) : (
                <img src={`http://localhost:5000/images/${user.profileImg}`} alt='Local Profile' className='rounded-circle' width="50px" height="50px"/>
                )
              }
          </div>
              <div className='ml-3 text-center'>
                <h6 className="mb-0">{user.name}</h6>
                <p className="mt-0">My Account</p>
              </div>
          </div>
          <hr/>
        </div>
        <div className="col-6 bg-light">
          {/* Content for the second div */}I
        </div>
        <div className="col-3 bg-secondary">
          {/* Content for the third div */}J
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Contact
