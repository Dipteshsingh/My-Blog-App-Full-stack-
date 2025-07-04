import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { LuSend } from 'react-icons/lu';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Edit, Trash2 } from 'lucide-react';
import { BsThreeDots } from 'react-icons/bs';
import { toast } from 'sonner';
import axios from 'axios';
import { format } from 'timeago.js';

import { setComment } from '@/redux/commentSlice';
import { setBlog } from '@/redux/blogSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import userLogo from '../assets/user.jpg';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CommentBox = ({ selectBlog }) => {
  const dispatch = useDispatch();
  const { comment } = useSelector(state => state.comment);
  const { blog } = useSelector(state => state.blog);
  const { user } = useSelector(state => state.auth);

  const [content, setContent] = useState('');
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const changeEventHandler = (e) => setContent(e.target.value.trimStart());

  const commentHandler = async () => {
    if (!content.trim()) return toast.error("Comment cannot be empty.");
    try {
      const res = await axios.post(
        `https://blog-app-mern-5.onrender.com/api/comment/create/${selectBlog._id}`,
        { content },
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        dispatch(setComment(updatedCommentData));

        const updatedBlogData = blog.map(p =>
          p._id === selectBlog._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setBlog(updatedBlogData));

        toast.success(res.data.message);
        setContent('');
      }
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    }
  };

  const updateCommentHandler = async (commentId) => {
    if (!editedContent.trim()) return toast.error("Comment cannot be empty.");
    try {
      const res = await axios.put(
        `https://blog-app-mern-5.onrender.com/api/comment/update/${commentId}`,
        { content: editedContent },
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedComments = comment.map(item =>
          item._id === commentId ? { ...item, content: editedContent } : item
        );
        dispatch(setComment(updatedComments));
        toast.success("Comment updated");
        setEditedCommentId(null);
        setEditedContent('');
      }
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `https://blog-app-mern-5.onrender.com/api/comment/delete/${commentId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedComments = comment.filter(item => item._id !== commentId);
        dispatch(setComment(updatedComments));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const getAllCommentsBlog = async () => {
    try {
      const res = await axios.get(`https://blog-app-mern-5.onrender.com/api/comment/post-comment/${selectBlog._id}`);
      const sorted = res.data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dispatch(setComment(sorted));
    } catch (error) {
      console.error(error);
    }
  };

  const likeCommentHandler = async (commentId) => {
    try {
      const res = await axios.post(
        `https://blog-app-mern-5.onrender.com/api/comment/likes/${commentId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedComment = res.data.updatedComment;
        const updatedCommentList = comment.map(item =>
          item._id === commentId
            ? {
                ...item,
                likes: updatedComment.likes,
                numberOfLikes: updatedComment.likes.length,
              }
            : item
        );
        dispatch(setComment(updatedCommentList));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error liking comment", error);
    }
  };

  useEffect(() => {
    getAllCommentsBlog();
  }, []);

  return (
    <div className='mt-4'>
      {/* Comment input */}
      <div className='flex gap-4 items-center mb-4'>
        <Avatar>
          <AvatarImage src={user?.photoUrl || userLogo} />
          <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <h3 className='font-semibold'>{user?.firstName} {user?.lastName}</h3>
      </div>

      <div className='flex gap-3 items-start mb-6'>
        <Textarea
          placeholder="Write a comment..."
          className="bg-gray-100 dark:bg-gray-800 w-full"
          value={content}
          onChange={changeEventHandler}
        />
        <Button onClick={commentHandler} aria-label="Send comment">
          <LuSend />
        </Button>
      </div>

      {/* Render comments */}
      {comment.length > 0 && (
        <div className='space-y-4'>
          {comment.map((item) => (
            <div key={item._id} className='flex items-start gap-4 p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800'>
              <Avatar>
                <AvatarImage src={item?.userId?.photoUrl || userLogo} />
                <AvatarFallback>{item?.userId?.firstName?.[0] || 'U'}</AvatarFallback>
              </Avatar>

              <div className='w-full'>
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-white'>
                      {item?.userId?.firstName} {item?.userId?.lastName}
                    </h4>
                    <p className='text-xs text-gray-500'>{format(item.createdAt)}</p>
                  </div>

                  {user._id === item?.userId?._id && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BsThreeDots />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {
                          setEditedCommentId(item._id);
                          setEditedContent(item.content);
                        }}>
                          <Edit size={16} className='mr-2' /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteComment(item._id)}
                          className='text-red-500'
                        >
                          <Trash2 size={16} className='mr-2' /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                {/* Edit Mode */}
                {editedCommentId === item._id ? (
                  <>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="mb-2 bg-gray-100 dark:bg-gray-700"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateCommentHandler(item._id)}
                        disabled={item.content === editedContent.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditedCommentId(null);
                          setEditedContent('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className='text-sm text-gray-700 dark:text-gray-300'>{item.content}</p>
                )}

                {/* Likes and Reply */}
                <div className='flex gap-6 text-sm text-gray-500 mt-3'>
                  <div
                    className='flex items-center gap-2 hover:text-red-500 cursor-pointer'
                    onClick={() => likeCommentHandler(item._id)}
                  >
                    {item?.likes?.includes(user._id) ? <FaHeart fill='red' /> : <FaRegHeart />}
                    <span>{item?.likes?.length || 0}</span>
                  </div>
                  <span
                    className='hover:underline cursor-pointer'
                    onClick={() => toast.info('Reply feature coming soon!')}
                  >
                    Reply
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
