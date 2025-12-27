import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    // const {user} =useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user , setUser} =useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)
    console.log(token);
    
    useEffect(()=>{
        if(!token){
            console.log("No token found, redirecting to login");
        navigate('/login')
        return;
        }

        axios.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            console.log("Full Profile Response:", response.data);
            if(response.status === 200){
                const userData = response.data.user || response.data;
                console.log("Setting User Context to:", userData);
                setUser(userData)
                setIsLoading(false)
            }
        })    
        .catch(err =>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
        })                                            

    }, [token, navigate, setUser])
    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper
