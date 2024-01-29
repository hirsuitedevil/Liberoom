import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../redux/authSlice';
import jwt_decode from 'jwt-decode'
import { request } from '../util/fetchAPI';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleCallbackResponse(response) {
    try {
        const userObject = await jwt_decode(response.credential);
        const { name, email, picture} = userObject; // Extract required properties
        const options = {
            'Content-Type': 'application/json',
        };
        const data = await request('/auth/googlesign', 'POST', options, { email, name, picture });
        dispatch(loginWithGoogle(data));
        navigate('/');
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
    }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:"745056816479-2sqbja48boa5umsgbrmvnml30gjecfo0.apps.googleusercontent.com",
      callback:handleCallbackResponse
    })
    google.accounts.id.renderButton(
    document.getElementById("signinDiv"),
    { type:"standard" ,theme: "filled_blue", size: "large", shape:"circle" , text: "Continue with Google"}
    );
},[])
  return (
    <div className="justify-content-between align-items-center">
        <div id='signinDiv'></div>
    </div>

  )
}

export default OAuth
