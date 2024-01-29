import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useSelector } from 'react-redux';
import { request } from '../util/fetchAPI';

const CreateListing = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [geoLocationEnable, setGeoLocationEnable] = useState(true);
  const [displayedImages, setDisplayedImages] = useState([]);

  const [formData, setFormData] = useState({
    type: 'Rent',
    title: '',
    desc: '',
    area: 1,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    title,
    desc,
    area,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        useRef: user._id,
      });
    } else {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (loading) {
    return <Spinner />;
  }

  const onChangeHandler = (e) => {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    // files
    if (e.target.files) {
      setDisplayedImages([]);
      const newSelectedImages = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setDisplayedImages(newSelectedImages);

      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // text/booleans/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (images > 6) {
      return;
    }
    let geoLocation = {};
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=quhVrdb2B-bvrDCtO1tp14k3VKC4-6nGCh9BuZUBQTA`
    );
    const dat = await response.json();
    geoLocation.lat = dat.items[0].position.lat;
    geoLocation.lng = dat.items[0].position.lng;

    let filenames = [];
    const formData1 = new FormData();

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const filename = crypto.randomUUID() + images[i].name;
        formData1.append('images', images[i], filename);
        filenames.push(filename);
      }
    } else {
      return;
    }

    const data = await request(`/upload/image/property`, 'POST', {}, formData1, true);

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const data = await request(`/property`, 'POST', options, {
        ...formData,
        img: filenames,
        latitude: geoLocation.lat,
        longitude: geoLocation.lng,
      });
      if (data) {
        navigate(`/category/${formData.type}/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container d-flex flex-column align-items-center justify-content-center mb-4">
        <h3 className="mt-3 w-50 bg-dark text-light p-2 text-center">Create Listing</h3>
        <form className="w-50 bg-light p-4" onSubmit={onSubmitHandler}>

          <div className="d-flex flex-row mt-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Rent"
                onChange={onChangeHandler}
                defaultChecked
                name="type"
                id="type"
              />
              <label className="form-check-label" htmlFor="rent">
                Rent
              </label>
            </div>
            <div className="form-check ms-3">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="Sale"
                onChange={onChangeHandler}
                id="type"
              />
              <label className="form-check-label" htmlFor="sale">
                Sale
              </label>
            </div>
          </div>
          {/* name */}
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* desc */}
          <div className="mb-3 mt-4">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="desc"
              value={desc}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* area */}
          <div className="mb-3 mt-4">
            <label htmlFor="area" className="form-label">
              Area
            </label>
            <input
              type="number"
              className="form-control"
              id="area"
              value={area}
              onChange={onChangeHandler}
              min = {1}
              required
            />
          </div>
          {/* bedrooms */}
          <div className="mb-3 mt-4">
            <label htmlFor="bedrooms" className="form-label">
              Bedrooms
            </label>
            <input
              type="number"
              className="form-control"
              id="bedrooms"
              value={bedrooms}
              onChange={onChangeHandler}
              min = {1}
              required
            />
          </div>
          {/* bathrooms */}
          <div className="mb-3 mt-4">
            <label htmlFor="bathrooms" className="form-label">
              Bathrooms
            </label>
            <input
              type="number"
              className="form-control"
              id="bathrooms"
              value={bathrooms}
              onChange={onChangeHandler}
              min = {0}
              required
            />
          </div>
          {/* parking */}
          <div className="mb-3 ">
            <label htmlFor="parking" className="form-label">
              Parking :
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="parking"
                  id="parking"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="parking"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="parking"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* furnished */}
          <div className="mb-3 ">
            <label htmlFor="furnished" className="form-label">
              Furnished :
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="furnished"
                  id="furnished"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="furnished"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="furnished"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* address */}
          <div className="mb-3">
            <label htmlFor="address">Address :</label>
            <textarea
              className="form-control"
              placeholder="Enter Your Address"
              id="address"
              value={address}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* geoLocation */}
          {!geoLocationEnable && (
            <div className="mb-3 ">
              <div className="d-flex flex-row ">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="yes">
                    Latitude
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    value={latitude}
                    onChange={onChangeHandler}
                    name="latitude"
                    id="latitude"
                  />
                </div>
                <div className="form-check ms-3">
                  <label className="form-check-label" htmlFor="no">
                    Longitude
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="longitude"
                    value={longitude}
                    onChange={onChangeHandler}
                    id="longitude"
                  />
                </div>
              </div>
            </div>
          )}
          {/* offers  */}
          <div className="mb-3 ">
            <label htmlFor="offer" className="form-label">
              Offer :
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="offer"
                  id="offer"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="offer"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="offer"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* regular price */}
          <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">
              Regular Price :
            </label>
            <div className=" d-flex flex-row ">
              <input
                type="number"
                className="form-control w-50 "
                id="regularPrice"
                name="regularPrice"
                value={regularPrice}
                onChange={onChangeHandler}
                required
              />
              {type === "rent" && <p className="ms-4 mt-2"> / Month</p>}
            </div>
          </div>
          {/* offer */}
          {offer && (
            <div className="mb-3 mt-4">
              <label htmlFor="discountedPrice" className="form-label">
                Discounted Price :
              </label>
              <input
                type="number"
                className="form-control w-50 "
                id="discountedPrice"
                name="discountedPrice"
                value={discountedPrice}
                onChange={onChangeHandler}
                required
                max={regularPrice}
              />
            </div>
          )}

          {/* Display selected images */}
          <div className="mb-3">
            <h3>Selected Images</h3>
            <div className="d-flex flex-wrap">
              {displayedImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Selected Image ${index}`}
                  style={{ margin: '5px', maxWidth: '100px', maxHeight: '100px' }}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <input className="form-control" type="file" id="images" name="images" onChange={onChangeHandler} max="6" accept=".jpg,.png,.jpeg" multiple required />
          </div>
          <div className="mb-3">
            <input className="btn btn-primary w-100" type="submit" value="Create Listing" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateListing;