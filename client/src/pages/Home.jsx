import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='wrapper'>
      <div className='input-box button'>
        <Link to='/register'>SignUp</Link>
      </div>
      <div className='input-box button'>
        <Link to='/logIn'>LogIn</Link>
      </div>
    </div>
  )
}

export default Home