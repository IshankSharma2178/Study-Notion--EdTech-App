import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import Navbar from "./component/common/Navbar"
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword' ;
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path='/dashboard/my-profile' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
