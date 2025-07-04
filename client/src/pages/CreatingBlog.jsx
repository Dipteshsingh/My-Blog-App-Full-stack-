import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"

import { setBlog } from '@/redux/blogSlice'
import { setLoading } from '@/redux/authSlice'

const CreatingBlog = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog } = useSelector(store => store.blog)
  const { loading } = useSelector(store => store.auth)

  const createBlogHandler = async () => {
    if (!title || !category || !description) {
      toast.error("Please fill in all fields.")
      return
    }

    dispatch(setLoading(true))
    try {
      const res = await axios.post(
        `https://blog-app-mern-8.onrender.com/api/blogs/create`,
        { title, category, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )

      if (res.data.success) {
        dispatch(setBlog([...blog, res.data.blog]))
        toast.success(res.data.message || "Blog created!")
        navigate(`/dashboard/write-blog/${res.data.blog._id}`)
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error("Failed to create blog")
      console.error("Create Blog Error:", error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className='p-4 md:pr-20 md:ml-[320px] pt-20 min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Card className="md:p-10 p-4 dark:bg-gray-800 shadow-md">
        <h1 className='text-2xl font-bold text-gray-800 dark:text-white mb-1'>Let’s Create a Blog</h1>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Fill in the details to start writing your next blog post.
        </p>

        <div className='space-y-6'>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="w-full md:w-[250px] bg-white dark:bg-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {[
                    "Web Development", "Digital Marketing", "Blogging", "Photography", "Cooking",
                    "Travel", "Fitness & Health", "Technology", "Finance", "Education",
                    "Lifestyle", "Personal Development", "News & Politics", "Entertainment", "Sports", "Productivity"
                  ].map((cat, index) => (
                    <SelectItem key={index} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button onClick={createBlogHandler} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreatingBlog
