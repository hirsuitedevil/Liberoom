import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { request } from '../util/fetchAPI';
import { useSelector } from 'react-redux';
import ListingItem from '../Components/ListingItem';
import Spinner from '../Components/Spinner';
import { useNavigate } from 'react-router-dom';

const ViewListing = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [currentType, setCurrentType] = useState('Sale');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const properties = await request(`/property/getByOwner?ownerId=${user._id}&type=${currentType}`, 'GET');
        setListings(properties); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [user._id, currentType]); 

  const handleTypeChange = (newType) => {
    setCurrentType(newType);
  };

  const onDelete = async (listingId) => {
    try {
      if (window.confirm('Are you sure you want to delete this listing?')) {
        const headers = {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        };
        let deleteImg = [];
        const data = await request(`/property/find?id=${listingId}`, "GET");
        deleteImg = data.img;
        await request(`/upload/deleteImages`, "DELETE",headers,{ filenames: deleteImg });
        await request(`/property/delete/${listingId}`, 'DELETE', headers);
        setListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const onEdit = async (listingId) =>{
    navigate(`/edit-listing/${listingId}`)
  };

  return (
    <Layout>
      <div className='container'>
        <div>
          <button onClick={() => handleTypeChange('Sale')}>Sale</button>
          <button onClick={() => handleTypeChange('Rent')}>Rent</button>
        </div>
        <h6>Your Listings</h6>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {listings && listings.length > 0 ? (
              <div>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing._id}
                    listing={listing}
                    id={listing._id}
                    onDelete={() => onDelete(listing._id)}
                    onEdit={()=> onEdit(listing._id)}
                  />
                ))}
              </div>
            ) : (
              <p>No listings available.</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ViewListing;
