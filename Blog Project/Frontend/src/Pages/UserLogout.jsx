import React, { useEffect } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await axios.get('/users/logout', {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } catch (error) {
                console.error('Logout error:', error.response?.data || error.message)
                // Force logout even if API call fails
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
        
        if(token) {
            performLogout()
        } else {
            navigate('/login')
        }
    }, [token, navigate])

  return (
    <div>
      logout
    </div>
  )
}

export default UserLogout