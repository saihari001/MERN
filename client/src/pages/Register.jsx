import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const registerUser = async (e) => {
        e.preventDefault()
        const {name, email, password} = data;
        try{
            const {data} = await axios.post('/register', {name, email, password})
            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({})
                toast.success("Register successfull. welcome!")
                navigate('/logIn')
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className='wrapper'>
        <h2>SignUp</h2>
        <form onSubmit={registerUser}>
            <div className='input-box'>
                <input type="text" placeholder='enter name' required value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
            </div>
            <div className='input-box'>
                <input type="email" placeholder='enter email' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            </div>
            <div className='input-box'>
                <input type="password" placeholder='enter password' required value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            </div>
            <div className='input-box button'>
                <input type='submit' value='Register Now' />
            </div>
        </form>
        <div className='policy'>
            <Link to='/logIn'>Login</Link>
        </div>
    </div>
  )
}

export default Register