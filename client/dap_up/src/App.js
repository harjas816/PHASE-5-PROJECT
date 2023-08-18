import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = {<Landing />}/>
        <Route path="signup" element = {<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
