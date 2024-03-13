import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const ResetPassword = () => {
    const [data, setData] = useState({
        password: '',
    })
    const {token} = useParams()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {password} = data
        try{
            const {data} = await axios.put('/resetPassword/'+token, {password})
            if(data.error){
              toast.error(data.error)
            }
            else{
              toast.success("password succesfully reseted")
              alert("password rested")
              navigate("/login")
            }
        }
        catch(err){
            console.log(err)
        }
    }   
  return (
    <div className='wrapper'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input type="password" placeholder='enter new password' required value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
        <div className='input-box button'>
          <input type='submit' value='Submit'/>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword