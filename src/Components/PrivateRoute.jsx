import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    let accessTokenObj=JSON.parse(localStorage.getItem('accessToken'))
  if(accessTokenObj && accessTokenObj !==null && accessTokenObj !==undefined){
    return children
  }
  return (
    <Navigate to='/login'/>
  )
}

export default PrivateRoute