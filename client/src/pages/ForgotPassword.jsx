import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: '',
    })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {email} = data
        try{
            const {data} = await axios.post('/forgotPassword', {email})
            if(data.error){
              toast.error(data.error)
            }
            else{
              toast.success("pls check your email for reset password link.")
              alert("pls check your email for reset password.")
              navigate("/logIn")
            }
        }
        catch(err){
            console.log(err)
        }
    }   
  return (
    <div className='wrapper'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input type="email" placeholder='enter email' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </div>
        <div className='input-box button'>
          <input type='submit' value='Submit'/>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword