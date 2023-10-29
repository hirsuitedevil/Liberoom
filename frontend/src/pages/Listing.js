import React,{useState, useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import {useParams, Link, useNavigate} from 'react-router-dom'
import { request } from '../util/fetchAPI'
import Spinner from '../Components/Spinner'
import {FaBath, FaBed} from 'react-icons/fa'
import {GiWoodenChair} from 'react-icons/gi'
import {AiFillCar} from 'react-icons/ai'
import {BiSolidUserRectangle} from 'react-icons/bi'
import SwipeCore,{EffectCoverflow, Navigation, Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useSelector } from 'react-redux'

//config
SwipeCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
    const [listing, setListing] = useState(null)
    const {listingId} = useParams()
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    useEffect(() => {
    if(!user){
        navigate('/signin');
      }
  }, [user, navigate]);

     useEffect(() => {
      const fetchDetails = async () => {
      try {
        const data = await request(`/property/find?id=${listingId}`, "GET")
        console.log(data)
        console.log(data.img)
        setListing(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [listingId])

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="card" style={{ width: "600px" }}>
        <div className="card-header">
            {listing ? (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                className="mySwipe"
              >
                {listing.img.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:5000/images/${listing.img[index]}`}
                      height={400}
                      width={800}
                      alt={listing.title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="card-body">
              {listing ? (
            <div>
              <h3>{listing.title}</h3>
              <p>
              Price: Rs
              {listing.offer ? (
                <span>
                  <span style={{ textDecoration: 'line-through', marginLeft:'5px'}}>
                    {listing.regularPrice}
                  </span>
                  <span style={{marginLeft:'5px'}}>{listing.discountedPrice}</span>
                </span>
              ) : (
                <span style={{ marginLeft:'5px'}}>
                    {listing.regularPrice}
                  </span>
              )}
              {listing.type==="Rent" && "/ Month"}
            </p>
            <p>
              Property For: {listing.type}
            </p>
            <p>
              Description: {listing.desc}
            </p>
            <p><FaBed/> &nbsp;
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`: "1 Bedroom" }</p>
            <p><FaBath/> &nbsp;
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`: "1 Bathroom" }</p>
            <p><AiFillCar/> &nbsp;
            Parking: { listing.parking ? "Yes": "No" }</p>
            <p><GiWoodenChair/> &nbsp;
            Furnished: { listing.parking ? "Yes": "No" }</p>
            <p><BiSolidUserRectangle/> &nbsp;
            Owner: { listing.currentOwner.name}</p>
            <Link className="btn btn-success"
              to={`/contact/${listingId}`}>
              Contact Landlord
            </Link>
            </div>
          ) : (
            <Spinner/>
          )} 
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Listing
