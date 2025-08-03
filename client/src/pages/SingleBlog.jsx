import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Bookmark, MessagesSquare, Share2 } from 'lucide-react'
import axios from 'axios'
import CommentBox from '@/components/CommentBox'
import { toast } from 'sonner'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const SingleBlog = () => {
  const { id: blogId } = useParams();
  const { blog } = useSelector(store => store.blog)
  const selectBlog = blog.find(blog => blog._id === blogId)
  const [blogLike, setBlogLike] = useState(selectBlog?.likes.length)
  const { user } = useSelector(store => store.auth)

  const [liked, setLiked] = useState(selectBlog?.likes.includes(user?._id) || false);
  console.log(selectBlog);
  const dispatch = useDispatch()

  if (!selectBlog) {
    return <div className="text-red-500 pt-20 text-center">Blog not found or still loading...</div>;
  }
  const changeTimeFormat = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate
  }
  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this blog!',
          text: 'Read this amazing blog post.',
          url: blogUrl,
        })
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.error('Error sharing:', err));
    } else {
      // fallback: copy to clipboard
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success('Blog link copied to clipboard!');
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like"
      const res = await axios.get(`/api/blogs/${selectBlog._id}/${action}`, { withCredentials: true })
      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked)

        //apne blog ko update krunga
        const updatedBlogData = blog.map(p =>
          p._id === selectBlog._id ? {
            ...p,
            likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
          } : p
        )
        toast.success(res.data.message);
        dispatch(setBlog(updatedBlogData))
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  }
  return (
    <div className='pt-14'>
      <div className='max-w-6xl mx-auto p-10'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectBlog?.title}Title</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Blog header */}
        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{selectBlog.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <AvatarImage src={selectBlog.author?.photoUrl} alt="Author" className="w-full h-full object-cover" />
                </div>

                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectBlog.author?.firstName} {selectBlog.author?.lastName}</p>
                <p className="text-sm text-muted-foreground">{selectBlog.author?.occupation}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Published on {changeTimeFormat(selectBlog.createdAt)} • 8 min read</div>
          </div>
        </div>
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectBlog?.thumbnail}
            alt=""
            width={1000}
            height={500}
            className="w-full object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 italic">{selectBlog.subtitle}</p>
        </div>
        <p className='' dangerouslySetInnerHTML={{ __html: selectBlog.description }} />
        <div className='mt-10'>
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Web Development</Badge>
            <Badge variant="secondary">JavaScript</Badge>
          </div>
          <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">

            <div className="flex items-center space-x-4">
              <Button onClick={likeOrDislikeHandler} variant="ghost" size="sm" className="flex items-center gap-1">

                {
                  liked ? <FaHeart size={'24'} className='cursor-pointer text-red-600' /> : <FaRegHeart size={'24'} className='cursor-pointer hover:text-gray-600 text-white' />
                }
                <span>{blogLike}</span>


              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessagesSquare className="h-4 w-4" />
                <span> Comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleShare(selectBlog._id)} variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <CommentBox selectBlog={selectBlog} />
      </div>
    </div>
  )
}

export default SingleBlog
