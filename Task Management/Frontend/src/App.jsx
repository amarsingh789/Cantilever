import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import StartedPage from "./pages/StartedPage";
import { UserDataContext } from "./context/UserContext";
import UserProtectWraper from "./pages/UserProtectWraper";
import UserLogout from "./pages/UserLogout";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/UserProfile";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<StartedPage />} />
        <Route
          path="/home"
          element={
            <UserProtectWraper>
              <Home />
            </UserProtectWraper>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route
          path="/profile"
          element={
            <UserProtectWraper>
              <UserProfile />
            </UserProtectWraper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWraper>
              <UserLogout />
            </UserProtectWraper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
