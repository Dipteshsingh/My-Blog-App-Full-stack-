import BlogCard from '@/components/BlogCard';
import { setBlog } from '@/redux/blogSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const Blog = () => {
  const {blog} = useSelector(store=>store.blog)
  const dispatch = useDispatch()
  const getAllPublishedBlogs = async ()=>{
    try {
<<<<<<< HEAD
      const res = await axios.get(`/api/blogs/get-published-blogs`,{
=======
      const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/blogs/get-published-blogs`,{
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        withCredentials:true
      })
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error);
      
    }
  }

useEffect(()=>{
  getAllPublishedBlogs()
},[])

  return (
    <div className='pt-16'>
      <div className='max-w-6xl mx-auto text-center flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold text-center pt-10 '>Our Blogs</h1>
        <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
      </div>

      <div className='max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3 py-10 px-4 md:px-0'>
        {
          blog?.map((blog,index)=>{
            return <BlogCard key={index} blog={blog} />
          })
        }

      </div>
    </div>
  )
}

export default Blog
