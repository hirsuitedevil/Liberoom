import React,{useEffect,useState} from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { request } from '../util/fetchAPI'
import Spinner from '../Components/Spinner'
import ListingItem from '../Components/ListingItem'

const Category = () => {
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(true)
    const params = useParams()

    useEffect(() =>{
        const fetchListing = async () =>{
            try {
                const options = {
                    'Content-Type':'application-json',
                }
                const response = await request(`/property/find/${params.categoryName}`,'GET',options,)
                if (response) {
                setListing(response);
                setLoading(false);
                }
            } catch (error) {
                console.log("Unable to fetch listings: ",error)
            }
        }
        fetchListing()
    },[params.categoryName])
  return (
    <Layout>
      <div className='mt-3 container-fluid'>
        <h1>{params.categoryName === "Rent" ? "Places for Rent": "Places for Sale"}</h1>
        {
            loading ? <Spinner/> :listing && listing.length >0 ? (<>
                <div>
                    {listing.map((list)=>(
                        <ListingItem listing={list} id={list._id} key={list._id} />
                    ))}
                </div>
            </>) : <p>No listing for {params.categoryName}</p>
        }
      </div>
    </Layout>
  )
}

export default Category
