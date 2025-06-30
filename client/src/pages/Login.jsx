import React, { useState } from 'react'
import auth from "../assets/auth.jpg"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice' 


const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
    const [input,setInput] = useState({
      email:"",
      password:"",
    })
    const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
    const handleChange = (e)=>{
      const {name,value}=e.target
      setInput(prev=>({
        ...prev,
        [name]: value
      }))
    }

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(setLoading(true))
    const res = await axios.post(`http://localhost:3000/api/user/login`, input, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    if (res.data.success) {
      dispatch(setUser(res.data.user)) 
      toast.success(res.data.message);
      navigate("/");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Login failed. Try again.");
  }
  finally{
    dispatch(setLoading(false))
  }
};


  return (
    <div className="flex flex-col md:flex-row items-center h-screen">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <img src={auth} alt="Login Illustration" className="max-h-[700px] object-contain" />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex justify-center items-center px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Log in to your account</CardTitle>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={input.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={input.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-2 top-6"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
              
              <Button type="submit" className="w-full">
                {
                  loading ? (<><Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                  Please wait...
                  </>):("Login")
                }
              </Button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="underline font-medium hover:text-primary">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
