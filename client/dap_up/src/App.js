import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import { useEffect } from 'react';
import { UserContext } from './context/user';
import { useContext, useState } from 'react';
import Navbar from './components/Navbar';
import "../src/css/Login.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Threadpage from './components/Threadpage';


function App() {

  const { user, setUser } = useContext(UserContext)





  useEffect(() => {
    fetch("/authorized")
      .then(r => {
        if (r.ok) {
          r.json().then(resp => {
            setUser(resp)
          })
        }
      }
      )
  }, []
  )
  console.log(user)

  return (
    <div className='App'>
    {user ? <Navbar /> : <div></div>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Threads" element={<Threadpage />}/>
        <Route path="/threads/:id" />
      </Routes>

    </div>
  );
}

export default App;
