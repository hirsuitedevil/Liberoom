import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwipeCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { request } from '../util/fetchAPI';

// Config
SwipeCore.use([EffectCoverflow, Pagination]);

const Slider = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserImages = async (owners) => {
    try {
      const promises = owners.map(async (owner) => {
        const user = await request(`/auth/profileImages?ownerId=${owner}`, 'GET');
        return user.profileImg.includes('https://lh3.googleusercontent.com')
          ? user.profileImg
          : `http://localhost:5000/images/${user.profileImg}`;
      });

      return Promise.all(promises);
    } catch (error) {
      console.error('Error getting user images:', error);
      return owners.map(() => ''); // Return default values for each owner
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/getAll`, 'GET');
        const limitedListings = data.slice(0, 5);
        const owners = limitedListings.map((listingItem) => listingItem.currentOwner);
        const userImages = await getUserImages(owners);

        setListing(
          limitedListings.map((listingItem, index) => ({
            ...listingItem,
            userImage: userImages[index],
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          className="mySwipe"
        >
          {listing.map((listingItem, index) => (
            <SwiperSlide key={index} onClick={() => navigate(`/category/${listingItem.type}/${listingItem._id}`)}>
              <h6 className='bg-info text-light p-2 m-0 height={400} width={800}'>
                <img src={listingItem.userImage} height={35} width={35} alt="user pic" className='rounded-circle'/>
                <span className='ms-2'>{listingItem.title}</span>
              </h6>
              <img src={`http://localhost:5000/images/${listingItem.img[0]}`} height={400} width={800} alt={listingItem.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
