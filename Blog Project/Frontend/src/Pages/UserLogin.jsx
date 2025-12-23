import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const {user, setUser} = useContext(UserDataContext)
const navigate = useNavigate()


  const submitHandler =async (e)=>{
    e.preventDefault();
    // console.log(email, password);
    // setUserData({
    //   email: email,
    //   password: password
    // })
    // console.log(userData);
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post('/users/login', userData)

    if(response.status === 200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
    
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-md bg-white px-6 py-8  sm:px-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">
          MindStream
        </h2>
        <form action="" onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className="mb-5">
            <label className="block text-base font-medium mb-2">What's your email</label>
          <input
            required
            className="w-full px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
              
            }}
            placeholder="Email@example.com"
          />
          </div>
          <div className="mb-5">
            <label className="block text-base font-medium mb-2">Enter Password</label>
          <input
            required
            className="w-full px-4 py-2.5 bg-gray-100 rounded text-base focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
              
            }}
            placeholder="Password"
          />
          </div>
          <button className="bg-[#111] text-white w-full py-3 rounded font-semibold hover:bg-gray-900 transition">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-6">New here? <Link to='/signup' className="text-blue-600 font-medium">Create New Account</Link></p>
      </div>
    </div>
  );
};

export default UserLogin;
