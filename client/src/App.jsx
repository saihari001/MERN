import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

axios.defaults.baseURL=process.env.BACKEND;
axios.defaults.withCredentials=true;

function App() {

  return (
    <div className='App'>
      <Navbar />
      <Toaster position='top-center' toastOptions={{duration: 6000}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/logIn' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/resetPassword/:token' element={<ResetPassword />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
