import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">Libreroom</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">Explore</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/offers">Offers</Link>
              </li>
               {
              !user ?
            <>
              <Link to='/signup' className='p-2'>SignUp</Link>
              <Link to='/signin' className='p-2'>SignIn</Link>
            </>
            :
            <>
              <Link to="/profile"><span className='p-3'>{user.name}</span></Link>
              <span className='btn btn-danger p-2' onClick={handleLogout}>Logout</span>
            </>
            }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
