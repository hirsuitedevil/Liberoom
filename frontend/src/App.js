import HomePage from './pages/HomePage';
import Offers from './pages/Offers';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import PrivateRoute from './Components/PrivateRoute';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import ViewListing from './pages/ViewListing';
import EditListing from './pages/EditListing';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/offers" element={<Offers/>}/>
            <Route path="/category/:categoryName" element={<Category/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/profile" element = {<PrivateRoute/>}>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}/>
            <Route path="/create-listing" element={<CreateListing/>}/>
            <Route path="/view-listing" element={<ViewListing/>}/>
            <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
            <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
            <Route path="/contact/:listingId" element={<Contact/>}/>
          </Routes>
         
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
