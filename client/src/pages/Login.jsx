import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const loginUser = async(e) => {
    e.preventDefault()
    const {email, password} = data
    try{
      const {data} = await axios.post('/logIn', {email, password})
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success("Login successfull")
        localStorage.setItem('token', data.data)
        window.location.replace('/dashboard')
      }
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='wrapper'>
      <h2>LogIn</h2>
      <form onSubmit={loginUser}>
        <div className='input-box'>
          <input type="email" placeholder='enter email' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </div>
        <div className='input-box'>
          <input type="password" placeholder='enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
        <div className='input-box button'>
          <input type='submit' value='Login' />
        </div>
      </form>
      <div className='policy'>
        <Link to='/register'>Register</Link>
        <Link to='/forgotPassword'>Forgot Password</Link>
      </div>
    </div>
  )
}

export default Login;