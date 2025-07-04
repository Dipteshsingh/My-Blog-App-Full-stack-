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

const YourBlog = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)
  const navigate = useNavigate()

  // Fetch user's blogs
  const getMyBlogs = async () => {
    try {
      const res = await axios.get(`https://blog-app-mern-5.onrender.com/api/blogs/my_blogs`, { withCredentials: true })
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
      const res = await axios.delete(`https://blog-app-mern-5.onrender.com/api/blogs/delete/${id}`, {
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
    <div className='pt-24 pb-10 px-4 md:px-8 md:ml-[320px] min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-6xl mx-auto'>
        <Card className="overflow-x-auto shadow-xl border dark:border-gray-700">
          <Table>
            <TableCaption className="text-sm text-gray-600 dark:text-gray-400">
              A list of your recent blogs.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-gray-800">
                <TableHead className="w-[40%] text-gray-700 dark:text-gray-200">Title</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Category</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Date</TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blog.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No blogs found.
                  </TableCell>
                </TableRow>
              ) : (
                blog.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    <TableCell className="flex items-center gap-4 py-4">
                      <img
                        src={item.thumbnail}
                        alt="Thumbnail"
                        className="w-20 h-14 rounded-md object-cover hidden md:block"
                      />
                      <span
                        onClick={() => navigate(`/blogs/${item._id}`)}
                        className="hover:underline cursor-pointer font-medium"
                      >
                        {item.title}
                      </span>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <BsThreeDotsVertical className="text-xl cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[160px] dark:bg-gray-800 shadow-md">
                          <DropdownMenuItem
                            onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}
                            className="flex items-center gap-2"
                          >
                            <Edit size={16} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteBlog(item._id)}
                            className="flex items-center gap-2 text-red-600"
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
  )
}

export default YourBlog
