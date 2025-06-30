import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate()
  const date = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 mb-6 flex flex-col md:flex-row gap-6 transition-transform hover:shadow-xl hover:scale-[1.01]">
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <img
          src={blog.thumbnail}
          alt="Thumbnail"
          className="rounded-lg w-full md:w-[300px] h-52 object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {blog.title}
          </h2>
          <h3 className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
            {blog.subtitle}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            📅 {date} | 📚 {blog.category}
          </p>
        </div>
        <div>
          <Button
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="mt-3 text-sm"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BlogCardList
