import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import axios from 'axios'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Comments = () => {
  const [allComments, setAllComments] = useState([])
  const navigate = useNavigate()

  const getTotalComments = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(`/api/comment/all-comment`, {
=======
      const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/comment/all-comment`, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        withCredentials: true
      })
      if (res.data.success) {
        setAllComments(res.data.comments)
      } else {
        toast.error("Failed to fetch comments")
      }
    } catch (error) {
      console.error("Fetch Comments Error:", error)
      toast.error("Something went wrong while loading comments")
    }
  }

  useEffect(() => {
    getTotalComments()
  }, [])

  return (
    <div className="pt-24 pb-10 px-4 md:px-8 md:ml-[320px] min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Card className="p-6 md:p-8 shadow-lg dark:bg-gray-800 bg-white rounded-2xl">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            All Comments
          </h1>

          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                A list of all user comments on your blogs.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700">
                  <TableHead className="text-gray-800 dark:text-gray-100">Blog Title</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Comment</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Author</TableHead>
                  <TableHead className="text-center text-gray-800 dark:text-gray-100">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allComments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500 dark:text-gray-300">
                      No comments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  allComments.map((comment, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
                      <TableCell className="max-w-xs truncate text-sm font-medium text-gray-900 dark:text-gray-200">
                        {comment?.postId?.title || 'Untitled'}
                      </TableCell>
                      <TableCell className="max-w-sm truncate text-sm text-gray-700 dark:text-gray-300">
                        {comment?.content || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                        {comment?.userId?.firstName || 'Unknown'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Eye
                          className="mx-auto cursor-pointer text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform"
                          size={20}
                          onClick={() => comment?.postId?._id && navigate(`/blogs/${comment.postId._id}`)}

                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Comments
