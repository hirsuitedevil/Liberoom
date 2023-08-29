import './App.css';
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/offers" element={<Offers/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}/>
          </Routes>
         
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
