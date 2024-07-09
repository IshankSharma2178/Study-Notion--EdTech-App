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
import PrivateRoute from './component/core/HomePage/Auth/PrivateRoute';
import MyProfile from './component/core/Dashboard/MyProfile';
import Error from './pages/Error';
import Settings from './component/core/Dashboard/Setting/Settings';

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
        <Route path='/about' element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        
        <Route 
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } 
            >
            <Route path="/dashboard/my-profile" element={<PrivateRoute>  <MyProfile/></PrivateRoute>}/>
            <Route path="/dashboard/settings" element={<PrivateRoute>  <Settings/></PrivateRoute>}/>

        </Route>

        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
