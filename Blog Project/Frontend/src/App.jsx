import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import UserSignup from './Pages/UserSignup'
import { UserDataContext } from './context/UserContext'
import UserProtectWrapper from './Pages/UserProtectWrapper'
import { UserLogout } from './Pages/UserLogout'
import CreatePost from './Pages/CreatePost'
import PageView from './Pages/PageView'
import EditPage from './Pages/EditPost'
import Profile from './Pages/Profile'

const App = () => {

  // const ans = useContext(UserDataContext)
  // console.log(ans);
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
          }/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>
        <Route path='/createpost' element={
          <UserProtectWrapper>
            <CreatePost/>
          </UserProtectWrapper>
          }/>
          <Route path='/post/:id' element={
            <UserProtectWrapper>
              <PageView/>
            </UserProtectWrapper>
            } />
          <Route path='/edit/:id' element={
            <UserProtectWrapper>
              <EditPage/>
            </UserProtectWrapper>
          }/>  
          <Route path='/profile' element={
            <UserProtectWrapper>
              <Profile/>
            </UserProtectWrapper>
            } />
      </Routes>
    </div>
  )
}

export default App
