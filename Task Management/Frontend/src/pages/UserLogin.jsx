import React, { useContext, useState } from "react"
import { Button } from "../components/ui/button"
import { Eye, EyeOff, Loader2, Mail, AlertCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Rocket } from "lucide-react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {UserDataContext} from "../context/UserContext"

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {user, setUser} =  useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    const userData = {
      email: email,
      password: password
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if(response.status === 200){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    // Form fields clear
      setEmail("");
      setPassword("")
    }catch(err){
      if (err.response && err.response.data) {
        // ✅ Case 1: Express-Validator Errors (Array)
        if (err.response.data.errors) {
          // Join multiple errors into a single string or just take the first one
          const errorMessages = err.response.data.errors.map(e => e.msg).join(". ");
          setError(errorMessages);
        } 
        // ✅ Case 2: Custom Message (String) like "Invalid email or password"
        else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("Network error. Please try again.");
      }
    }finally {
      setLoading(false);
    }

    // setTimeout(() => {
    //   setLoading(false)
    // }, 1500)
    // setEmail('')
    // setPassword('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200/60 bg-white/80 backdrop-blur">
        
        {/* Header */}
        <CardHeader className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              TaskPilot
            </h1>
          </div>

          <CardTitle className="text-2xl font-semibold">
            Welcome back
          </CardTitle>
          <CardDescription>
            Login to continue managing your tasks
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={submitHandler} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-white/70"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 bg-white/70"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-slate-900 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don’t have an account?
          <Button asChild variant="link" className="px-1">
            <Link to="/signup">Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserLogin
