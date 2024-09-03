import './App.css';
import Header from './Components/Header';
import Login1 from './Components/Login1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route  path='/' element={<Header/>}></Route>
      <Route path='/login' element={<Login1/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
