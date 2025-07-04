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

const Comments = () => {
  const [allComments, setAllComments] = useState([])
  const navigate = useNavigate()

  const getTotalComments = async () => {
    try {
      const res = await axios.get(`https://blog-app-mern-5.onrender.com/api/comment/all-comment`, {
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
    <div className='pt-24 pb-10 px-4 md:px-8 md:ml-[320px] min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-6xl mx-auto'>
        <Card className="p-4 md:p-6 shadow-md dark:bg-gray-800">
          <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">All Comments</h1>

          <Table className="overflow-x-auto">
            <TableCaption className="text-sm text-gray-500 dark:text-gray-400">
              A list of all user comments on your blogs.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-200 dark:bg-gray-800">
                <TableHead className="text-gray-700 dark:text-gray-200">Blog Title</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Comment</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Author</TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200">Action</TableHead>
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
                  <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <TableCell className="max-w-xs truncate">{comment?.postId?.title || 'Untitled'}</TableCell>
                    <TableCell className="max-w-xs truncate">{comment?.content || '-'}</TableCell>
                    <TableCell>{comment?.userId?.firstName || 'Unknown'}</TableCell>
                    <TableCell className="text-center">
                      <Eye
                        className="cursor-pointer text-blue-500 hover:scale-110 transition"
                        onClick={() => navigate(`/blogs/${comment?.postId?._id}`)}
                      />
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

export default Comments
