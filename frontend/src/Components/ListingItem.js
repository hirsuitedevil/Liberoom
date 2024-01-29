import React from 'react'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'
const ListingItem = ({listing,id, onDelete, onEdit}) => {
  return (
    <>
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/category/${listing.type}/${id}`}>
                <div className="row container">
                    
                    <img src = {`http://localhost:5000/images/${listing.img[0]}`} height={200} width={300} className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' alt='img'/>
                    <div className="col-md-5">
                        <h4>{listing.title}</h4>
                        <p>{listing.address}</p>
                        <p>Rs {listing.offer ? listing.discountedPrice : listing.regularPrice} {" "}
                        {listing.type==="Rent" && "/ Month"}
                        </p>
                        <p><FaBed/> &nbsp;
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`: "1 Bedroom" }</p>
                        <p><FaBath/> &nbsp;
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`: "1 Bathroom" }</p>
                        
                    </div>
                </div>
            </Link>
            { onDelete && (
                <button className='btn btn-danger' onClick={()=> {onDelete(listing._id)}}>
                Delete Listing
                </button>
            )}
            { onEdit && (
                <button className='btn btn-info' onClick={()=> {onEdit(listing._id)}}>
                Edit Listing
                </button>
            )}
        </div>
    </>
  )
}

export default ListingItem