import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserDataContext } from "../context/UserContext";


const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler =async (e)=>{
    e.preventDefault()
    // setUserData({
    //   fullName:{
    //     firstName: firstName,
    //     lastName: lastName,
    //   },
    //   email: email,
    //   password: password
    // })
    // console.log(userData);
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password
    }
    const response = await axios.post('/users/register', newUser)

    if(response.status === 201){
      const data = response.data

      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
      
    }
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-md bg-white px-6 py-8  sm:px-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">MindStream</h2>
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="mb-5">
            <label className="block text-base font-medium mb-2">
              What's your name
            </label>
            <div className="flex gap-4 mb-6">
              <input
                required
                className="w-1/2 px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e)=>{
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className="w-1/2 px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black placeholder:text-sm"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e)=>{
                  setLastName(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium mb-2">
              What's your email
            </label>
            <input
              required
              className="w-full px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black placeholder:text-sm"
              type="email"
              placeholder="Email@example.com"
              value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium mb-2">
              Enter Password
            </label>
            <input
              required
              className="w-full px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black placeholder:text-sm"
              type="password"
              placeholder="Password"
              value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
            />
          </div>
          <button className="bg-[#111] text-white w-full py-3 rounded font-semibold hover:bg-gray-900 transition">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm mt-6">
          Already have a account?  
          <Link to="/login" className="text-blue-600 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
