import React from 'react'
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute(...rest) {
  let  userid = localStorage.getItem("token") == null ? false : true;
  return (
      <>
          {userid ? <Outlet  /> : <Navigate to="/login" state={{from: rest.location}} />};
      </>

  )

}

export default PrivateRoute
