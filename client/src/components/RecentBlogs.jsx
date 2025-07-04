import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const RecentBlogs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  const getAllPublishedBlogs = async () => {
    try {
      const res = await axios.get(`https://blog-app-mern-5.onrender.com/api/blogs/get-published-blogs`, {
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPublishedBlogs()
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pb-16 pt-10">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Recent Blogs</h1>
        <hr className="w-24 mx-auto border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 flex flex-col lg:flex-row gap-6">
        {/* Blogs Section */}
        <div className="flex-1 space-y-6">
          {blog?.slice(0, 4)?.map((blog, index) => (
            <BlogCardList key={index} blog={blog} />
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-[350px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
            <div className="flex flex-wrap gap-3">
              {['Web Development', 'Marketing', 'Cooking', 'Photography', 'Productivity', 'Sports', 'Finance', 'AI/ML'].map((item, index) => (
                <Badge onClick={() => navigate(`/search?q=${item}`)} key={index} className="cursor-pointer hover:scale-105 transition">
                  {item}
                </Badge>

              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Subscribe to Newsletter</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-200 dark:bg-gray-700 placeholder:text-gray-500 text-black dark:text-white"
              />
              <Button className="w-full sm:w-fit">Subscribe</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Suggested Blogs</h2>
            <ul className="space-y-2">
              {[
                '🔥 10 Tips to Master React',
                '🎨 Tailwind CSS for Beginners',
                '📈 Improve SEO in 2024',
              ].map((title, idx) => (
                <li key={idx} className="text-sm hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentBlogs
