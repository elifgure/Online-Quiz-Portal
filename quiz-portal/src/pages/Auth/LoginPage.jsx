import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to QuizPortal</h1>
          <p className="text-sm text-gray-600 mb-8">Please enter your details</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage