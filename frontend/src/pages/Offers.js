import React,{useEffect,useState} from 'react'
import Layout from '../Components/Layout/Layout'
import { request } from '../util/fetchAPI'
import Spinner from '../Components/Spinner'
import ListingItem from '../Components/ListingItem'

const Offers = () => {
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        const fetchListing = async () =>{
            try {
                const options = {
                    'Content-Type':'application-json',
                }
                const response = await request('/property/find/offer','GET',options,)
                console.log(response)
                if (response) {
                setListing(response);
                setLoading(false);
                }
            } catch (error) {
                console.log("Unable to fetch listings: ",error)
            }
        }
        fetchListing()
    },[])
  return (
    <Layout>
    
      <div className='mt-3 container-fluid'>
      <h1>Best Offers</h1>
        {
            loading ? <Spinner/> :listing && listing.length >0 ? (<>
                <div>
                    {listing.map((list)=>(
                        <ListingItem listing={list} id={list._id} key={list._id} />
                    ))}
                </div>
            </>) : <p>No listing on Offers</p>
        }
      </div>
    </Layout>
  )
}

export default Offers
