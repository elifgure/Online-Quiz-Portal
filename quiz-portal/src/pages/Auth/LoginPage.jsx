import React, { useEffect } from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const location = useLocation()

  useEffect(()=>{
    if(location.state?.message){
       toast.success(location.state.message);
    }
  }, [location])
  return (
    <LoginForm />
  )
}

export default LoginPage