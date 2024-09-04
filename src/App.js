import './App.css';
import Header from './Components/Header';
import Login1 from './Components/Login1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MainComponent from './Components/MainComponent'; // Import the MainComponent

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Header /><MainComponent /></>} /> {/* Include MainComponent on the main route */}
          <Route path='/login' element={<Login1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
