import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = {<Landing />}/>
        <Route path="/signup_page" element = {<Signup />}/>
        <Route path="/Home" element = {<Home />} />
      </Routes>
    </div>
  );
}

export default App;
