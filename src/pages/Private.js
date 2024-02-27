import React from 'react'
 import {useAuthState} from "react-firebase-hooks/auth"
 import { Outlet, Navigate } from 'react-router-dom'
 import { auth } from '../firebaseConfig'
 import Loader from '../Components/Loader'

const Private = () => {
  const [user, loading, error] = useAuthState(auth)

  if(loading){
    return <Loader />
  }
  else if(!user || error){
    return <Navigate to="/" replace />
  }
  else{
    return <Outlet />
  }
}

export default Private
