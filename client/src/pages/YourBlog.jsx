import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'
import { useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const YourBlog = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)
  const navigate = useNavigate()

  // Fetch user's blogs
  const getMyBlogs = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(`/api/blogs/my-blogs`, { withCredentials: true })
=======
      const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/blogs/my_blogs`, { withCredentials: true })
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load your blogs");
    }
  }

  useEffect(() => {
    getMyBlogs()
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB") // DD/MM/YYYY
  }

  const deleteBlog = async (id) => {
    try {
<<<<<<< HEAD
      const res = await axios.delete(`/api/blogs/delete/${id}`, {
=======
      const res = await axios.delete(`https://blog-app-mern-8.onrender.com/api/blogs/delete/${id}`, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        withCredentials: true
      })
      if (res.data.success) {
        const updatedBlogData = blog.filter((b) => b._id !== id)
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message || "Failed to delete blog")
      }
    } catch (error) {
      console.error("Delete Blog Error:", error);
      toast.error("Something went wrong while deleting the blog.")
    }
  }

 return (
  <div className="pt-24 pb-12 px-4 md:px-8 md:ml-[320px] min-h-screen bg-gray-50 dark:bg-[#0d1117]">
    <div className="max-w-6xl mx-auto">
      <Card className="overflow-x-auto shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#161b22]">
        <Table>
          <TableCaption className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Your recently published blogs
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-[#1c2128] text-sm text-gray-700 dark:text-gray-200 uppercase tracking-wide">
              <TableHead className="w-[40%] py-5 pl-6">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blog.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blog.map((item, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-[#1c1f24] transition-all duration-200"
                >
                  <TableCell className="flex items-center gap-4 py-5 px-6 max-w-[320px]">
                    <img
                      src={item.thumbnail}
                      alt="Thumbnail"
                      className="w-20 h-14 rounded-md object-cover hidden md:block"
                    />
                    <span
                      onClick={() => navigate(`/blogs/${item._id}`)}
                      className="hover:underline cursor-pointer font-semibold text-gray-800 dark:text-gray-100 line-clamp-2"
                    >
                      {item.title}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300 capitalize">
                    {item.category}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <BsThreeDotsVertical className="text-xl text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[160px] bg-white dark:bg-[#1f242b] shadow-xl rounded-md border dark:border-gray-700">
                        <DropdownMenuItem
                          onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2c313a] text-gray-800 dark:text-gray-200"
                        >
                          <Edit size={16} /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteBlog(item._id)}
                          className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 size={16} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  </div>
);


}

export default YourBlog
