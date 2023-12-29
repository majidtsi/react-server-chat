import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import PrivateRoute from './components/utils/PrivateRoute';
import { UserContext } from './components/utils/UserContext';

import CreateServer from './components/server/CreateServer';
import ExploreServers from './components/server/ExploreServers';
import Notifications from './components/layout/Notifications';

import { getCurrentUser } from './components/services/auth';

function App() {

  const getToken = () => {
      const token = localStorage.getItem("token");
      if (token){
          return true;
      } else {
          return false;
      }
  };

  const [isAuth, setisAuth] = useState(getToken());

  return (

    
      
      <Router>
        <UserContext.Provider value={{ isAuth, setisAuth}}>
          <Routes>  
              <Route exact element={<PrivateRoute  />}>
                <Route exact path="/" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login/>} />       
              <Route path="/register" element={<Register />} />
              <Route path="/createserver" element={<CreateServer />} />
              <Route path="/explore" element={<ExploreServers />} />
              <Route path="/notifications" element={<Notifications />} />
          </Routes>
          </UserContext.Provider>  
        </Router>
       
  )
}

export default App
//ReactDOM.render(<App />, document.getElementById("app"));
