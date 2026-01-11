import React, { useContext, useState } from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { User, Mail, Lock, Loader2, Rocket, AlertCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {UserDataContext} from "../context/UserContext"

const UserSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const {user, setUser} =  useContext(UserDataContext)

  const submitHandler = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    console.log(newUser);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status === 201){
      const data = response.data
      localStorage.setItem('token', data.token)
      setUser(data.user)
      navigate('/home')
    }
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    }catch(err){
      if (err.response && err.response.data) {
        // ✅ Case 1: Express-Validator Errors (Array format: { errors: [{msg: '...'}, {msg: '...'}] })
        if (err.response.data.errors) {
          // Hum pehla error dikha sakte hain ya sabko join karke
          // Option A (Recommended): Show first error
           setError(err.response.data.errors[0].msg);
           
           // Option B: Show all errors
           // const messages = err.response.data.errors.map(e => e.msg).join(". ");
           // setError(messages);
        }
        // ✅ Case 2: Custom Message (String format: { message: '...' })
        else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network Error. Please check your connection.");
      }
    }finally {
      setLoading(false);
    }
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1500)
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
            Create your account
          </CardTitle>
          <CardDescription>
            Get started with task management in seconds
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

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Amar"
                    value={firstName}
                    onChange={(e)=>{
                      setFirstName(e.target.value)
                    }}
                    className="pl-9 bg-white/70"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Singh"
                    value={lastName}
                    onChange={(e)=>{
                      setLastName(e.target.value)
                    }}
                    className="pl-9 bg-white/70"
                  />
                </div>
              </div>
            </div>

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
                    onChange={(e)=>{
                      setEmail(e.target.value)
                    }}
                  className="pl-9 bg-white/70"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value)
                    }}
                  className="pl-9 bg-white/70"
                  required
                />
              </div>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Already have an account?
          <Button asChild variant="link" className="px-1">
            <Link to="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserSignUp
