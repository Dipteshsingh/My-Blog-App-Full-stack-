import React, { useState } from 'react'
import auth from "../assets/auth.jpg"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from "lucide-react"
import { toast } from 'sonner'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
  const [user,setUser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    const {name,value}=e.target
    setUser(prev=>({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(user);
    try {
      const res = await axios.post(`http://localhost:3000/api/user/register`,user,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message)
      
    }
  }

  

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[760px]">
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <img src={auth} alt="Signup illustration" className="max-h-[700px] object-contain" />
      </div>

      {/* Signup form section */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    type="text" 
                    name="firstName" 
                    id="firstName"
                    placeholder="John"
                    value={user.firstName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    type="text" 
                    name="lastName" 
                    id="lastName"
                    placeholder="Doe"
                    value={user.lastName}
                    onChange={handleChange}
                    className="dark:border-gray-600 dark:bg-gray-900"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={user.email}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900"
                />
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={user.password}
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-900 pr-10"
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-6"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>

              <Button type="submit" className="w-full">Sign Up</Button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="underline font-medium hover:text-primary">
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup
