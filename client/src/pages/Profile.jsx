import { Card } from '@/components/ui/card'
import axios from 'axios'
import { toast } from 'sonner'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import userLogo from '../assets/user.jpg'
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import TotalProperty from '@/components/TotalProperty'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, loading } = useSelector(store => store.auth)
  const [open, setOpen] = useState(false)

  const [input, setInput] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    occupation: user?.occupation || '',
    bio: user?.bio || '',
    linkedin: user?.linkedin || '',
    instagram: user?.instagram || '',
    github: user?.github || '',
    file: null
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const onChangeFileHandler = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setInput(prev => ({ ...prev, file }))
    } else {
      toast.error("Only image files are allowed.")
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(input).forEach(([key, value]) => {
      if (value && key !== "file") formData.append(key, value)
    })
    if (input.file) formData.append("file", input.file)

    try {
      dispatch(setLoading(true))
<<<<<<< HEAD
      const res = await axios.put(`/api/user/profile/update`, formData, {
=======
      const res = await axios.put(`https://blog-app-mern-8.onrender.com/api/user/profile/update`, formData, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.error("Update Profile Error:", error)
      toast.error(error?.response?.data?.message || "Failed to update profile")
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='pt-20 md:ml-[320px] min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="flex flex-col md:flex-row gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0 shadow-sm">
          {/* LEFT */}
          <div className='flex flex-col items-center justify-center md:w-[400px]'>
            <Avatar className="w-60 h-60 border-2">
              <div className="w-60 h-60 rounded-full overflow-hidden">
                <AvatarImage src={user?.photoUrl || userLogo} className="w-full h-full object-cover" />
                <AvatarFallback className='bg-gray-200 dark:bg-gray-700'>U</AvatarFallback>
              </div>
            </Avatar>
            <h1 className='text-center font-semibold text-xl text-gray-800 dark:text-gray-300 my-3'>
              {user?.occupation || "MERN Stack Developer"}
            </h1>
            <div className='flex gap-4 mt-2 text-gray-600 dark:text-gray-300'>
              {user?.facebook && <Link to={user.facebook}><FaFacebook className='w-5 h-5' /></Link>}
              {user?.linkedin && <Link to={user.linkedin}><FaLinkedin className='w-5 h-5' /></Link>}
              {user?.github && <Link to={user.github}><FaGithub className='w-5 h-5' /></Link>}
              {user?.instagram && <Link to={user.instagram}><FaInstagram className='w-5 h-5' /></Link>}
            </div>
          </div>

          {/* RIGHT */}
          <div className='flex-1'>
            <h1 className='font-bold text-4xl mb-4 text-gray-800 dark:text-white'>Welcome, {user?.firstName || "User"}</h1>
            <p className='text-sm mb-6 text-gray-500'>{user?.email}</p>

            <div className='mb-6'>
              <Label className='text-base text-gray-800 dark:text-gray-300'>About Me</Label>
              <p className='mt-2 border p-4 rounded-md text-sm dark:border-gray-600 text-gray-700 dark:text-gray-200'>
                {user?.bio || "I'm a passionate web developer and content creator focused on frontend technologies."}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="md:w-[480px] dark:bg-gray-900">
                <DialogHeader>
                  <DialogDescription>Update your profile information</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>First Name</Label>
                      <Input name="firstName" value={input.firstName} onChange={onChangeHandler} />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input name="lastName" value={input.lastName} onChange={onChangeHandler} />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>Instagram</Label>
                      <Input name="instagram" value={input.instagram} onChange={onChangeHandler} />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input name="linkedin" value={input.linkedin} onChange={onChangeHandler} />
                    </div>
                  </div>
                  <div>
                    <Label>GitHub</Label>
                    <Input name="github" value={input.github} onChange={onChangeHandler} />
                  </div>
                  <div>
                    <Label>About</Label>
                    <Textarea name="bio" value={input.bio} onChange={onChangeHandler} />
                  </div>
                  <div>
                    <Label>Profile Picture</Label>
                    <Input type="file" accept="image/*" onChange={onChangeFileHandler} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={onSubmitHandler} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      {/* Dashboard Metrics */}
      <TotalProperty />
    </div>
  )
}

export default Profile
