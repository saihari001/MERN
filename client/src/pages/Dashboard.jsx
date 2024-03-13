import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const userexists = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success("Logout successfull")
    navigate('/')
  }
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('/profile')
    .then(user => {
      if(userexists){
        toast.success("Authenticated successfull.")
        setUsers(user.data.user_profile)
      }})
      .catch(err => {
        toast.error(err.error)
      })
    }, [])

  return (
    <div className='wrapper'>
      {userexists ? (
        <div>
         <h2>Name</h2>  
         <h4>{users.name}</h4>
         <h2>Email</h2>
         <h4>{users.email}</h4>
         <div className='input-box button'>
            <input type="submit" onClick={handleLogout} value="Logout"/>
         </div>
        </div>
      ) : <h1>Pls login to view profile</h1>} 
    </div>
  )
}

export default Dashboard