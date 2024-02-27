import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Css/Navbaar.css"

function Navbaar() {
  return (
    <div>
      <div className='Nav'>
      <div className='empty'></div>
      <div className='links'>
      <NavLink to="/">
            <p>Signup</p>
        </NavLink>
        <NavLink to="podcast">
            <p>Padcasts</p>
        </NavLink>
        <NavLink to="start">
            <p>Start A Padcasts</p>
        </NavLink>
        <NavLink to="profile">
            <p>Profile</p>
        </NavLink>
      </div>
      </div>
    </div>
  )
}

export default Navbaar
