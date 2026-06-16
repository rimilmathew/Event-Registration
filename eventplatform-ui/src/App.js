import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import EventsPage from './pages/Events';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/Register';
import EventDetailsPage from './pages/EventDetails';
import MyRegistrationsPage from './pages/MyRegistrations';
import { useEffect, useState } from 'react';

function App() {
  const [islogin,settoken]=useState(false)
  function checkloginstatus(){
    let token=localStorage.getItem('token')
    settoken(!(!token))
  }
  useEffect(()=>checkloginstatus(),[])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar onlogout={checkloginstatus} islogin={islogin}/>
      <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/login" element={<LoginPage onlogin={checkloginstatus}/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/events" element={<EventsPage/>}></Route>
      <Route path="/eventdetails" element={<EventDetailsPage/>}></Route>
      <Route path="/myregistrations" element={<MyRegistrationsPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
