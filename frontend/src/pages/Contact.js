import React,{useState, useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { request } from '../util/fetchAPI'
import Spinner from '../Components/Spinner'

const Contact = () => {
  const [message, setMessage] = useState("");
  const [listing, setListing] = useState(null);
  const {listingId} = useParams()

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
      <div className=" container  mt-4">
        <h3>Contact Details</h3>
        {listing ? (
        <div>
          {listing.currentOwner.name !== "" && (
            <main>
              <h3>Name : {listing.currentOwner.name}</h3>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  value={message}
                  id="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <label htmlFor="floatingTextarea"> your message</label>
              </div>
              <a
                href={`mailto:${listing.currentOwner.email}?Subject=${listing.title}&body=${message}`}
              >
                <button className="btn btn-primary mt-2">Send Message</button>
              </a>
            </main>
          )}
        </div>
        )
      : <Spinner/>
      }
      </div>
      
    </Layout>
  )
}

export default Contact
