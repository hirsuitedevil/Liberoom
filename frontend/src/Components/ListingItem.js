import React from 'react'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'
const ListingItem = ({listing,id}) => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
        <div className="card category-text" style={{width:"800px"}}>
            <Link to={`/category/${listing.type}/${id}`}>
                <div className="row container">
                    <div className="col-md-5">
                        <img src = {`http://localhost:5000/images/${listing.img[0]}`} height={200} width={300} className='img-thumbnail' alt='img'/>
                    </div>
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
        </div>
        </div>
    </>
  )
}

export default ListingItem
