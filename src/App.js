import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ForgotPassword from './Components/ForgotPassword';
import DashboardR from './Components/DashboardR';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/SignUp">
          <SignUp/>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/ForgotPassword">
          <ForgotPassword/>
        </Route>
        <Route path="/DashboardR">
          <DashboardR/>
        </Route>
     </Switch>
    </Router>
  );
}

export default App;
