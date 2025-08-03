import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog } from '@/redux/blogSlice'
import BlogCardList from './BlogCardList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RecentBlogs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)

  const getAllPublishedBlogs = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(`/api/blogs/get-published-blogs`, {
=======
      const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/blogs/get-published-blogs`, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
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
    <section className="bg-gray-100 dark:bg-gray-900 py-14">
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          📝 Recent Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover new ideas, stories, and tutorials
        </p>
        <hr className="w-20 mt-4 mx-auto border-2 border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8">
        {/* Blogs Section */}
        <div className="flex-1 space-y-6">
          {blog?.length > 0 ? (
            blog.slice(0, 4).map((item, index) => (
              <BlogCardList key={index} blog={item} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No blogs available at the moment.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[350px] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-8">
          {/* Popular Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Popular Categories</h2>
            <div className="flex flex-wrap gap-3">
              {[
                'Web Development',
                'Marketing',
                'Cooking',
                'Photography',
                'Productivity',
                'Sports',
                'Finance',
                'AI/ML',
              ].map((item, index) => (
                <Badge
                  key={index}
                  onClick={() => navigate(`/search?q=${item}`)}
                  className="cursor-pointer hover:bg-red-500 hover:text-white transition-all ease-in-out duration-200"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Subscribe to Newsletter</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Get the latest blog updates straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 dark:bg-gray-700 placeholder:text-gray-500 text-black dark:text-white"
              />
              <Button className="w-full sm:w-fit">Subscribe</Button>
            </div>
          </div>

          {/* Suggested Blogs */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Suggested Blogs</h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {[
                '🔥 10 Tips to Master React',
                '🎨 Tailwind CSS for Beginners',
                '📈 Improve SEO in 2024',
              ].map((title, idx) => (
                <li
                  key={idx}
                  className="hover:text-red-500 transition cursor-pointer"
                  onClick={() => navigate('/search?q=React')}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default RecentBlogs
