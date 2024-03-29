import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import Slider from './Slider';

const HomePage = () => {
  const navigate = useNavigate()
  const rentImg = "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  const saleImg = "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  return (
    <Layout>
    <div className="container mt-3">
    <Slider/>
      <div className="row">
        <h1 className="text-red-700"> Category </h1>
        <div className="col-md-5">
            <div className="position-relative">
                <img className="img-fluid" src={rentImg} alt="rent" />
                <button className="btn btn-primary position-absolute top-50 start-50 translate-middle" onClick={() => { navigate('/category/Rent') }}>Rent</button>
            </div>
        </div>
        <div className="col-md-5">
            <div className="position-relative">
                <img className="img-fluid" src={saleImg} alt="sale" />
                <button className="btn btn-primary position-absolute top-50 start-50 translate-middle" onClick={() => { navigate('/category/Sale') }}>Sale</button>
            </div>
        </div>
    </div>

    </div>
    </Layout>
  )
}

export default HomePage
