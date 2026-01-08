import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Dashboard from './pages/Dashboard'
import StartedPage from './pages/StartedPage'
import { UserDataContext } from './context/UserContext'

const App = () => {
  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartedPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
