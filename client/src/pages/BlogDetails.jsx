import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor, { Jodit } from 'jodit-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { setBlog } from '@/redux/blogSlice';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogDetails = () => {
  const dispatch = useDispatch()
  const editor = useRef(null);
  const navigate = useNavigate()
  const { id: blogId } = useParams();
  const { blog } = useSelector(store => store.blog)
  const selectBlog = blog.find(blog => blog._id === blogId)
  const [content, setContent] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail)
  const { loading } = useSelector(store => store.auth)
  const [publish, setPublish] = useState(false)
  const [blogData, setBlogData] = useState({
    title: selectBlog?.title,
    subtitle: selectBlog?.subtitle,
    description: content,
    category: selectBlog?.category,
    thumbnail: null
  });
  useEffect(() => {
    if (selectBlog) {
      setBlogData({
        title: selectBlog.title,
        subtitle: selectBlog.subtitle,
        category: selectBlog.category,
        description: content,
        thumbnail: null
      });
      setContent(selectBlog.description);
      setPreviewThumbnail(selectBlog.thumbnail);
    }
  }, [selectBlog]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setBlogData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const updateBlogHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);
    try {
      dispatch(setLoading(true))
<<<<<<< HEAD
      const res = await axios.put(`/api/blogs/update/${blogId}`, formData, {
=======
      const res = await axios.put(`https://blog-app-mern-8.onrender.com/api/blogs/update/${blogId}`, formData, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        console.log(blogData);
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  if (!selectBlog) {
    return <div className="text-center mt-20 text-red-500">Blog not found.</div>;
  }
  const togglePublish = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.patch(`/api/blogs/${blogId}`, {
=======
      const res = await axios.patch(`https://blog-app-mern-8.onrender.com/api/blogs/${blogId}`, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        withCredentials: true
      })
      if (res.data.success) {
        setPublish(!publish)
        toast.success(res.data.message)
        navigate("/dashboard/your-blog")
      } else {
        toast.error("Failed to update")
      }
    } catch (error) {
      console.log(error);

    }
  }
  const deleteBlog = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.delete(`/api/blogs/delete/${blogId}`, { withCredentials: true })
=======
      const res = await axios.delete(`https://blog-app-mern-8.onrender.com/api/blogs/delete/${blogId}`, { withCredentials: true })
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
      if (res.data.success) {
        const updatedBlogData = blog.filter((item) => item._id !== blogId)
        dispatch(setBlog(updatedBlogData))
        toast.success("Blog has been removed")
        navigate("/dashboard/your-blog")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }



  return (
    <div className='pb-10 px-3 pt-20 md:ml-[320px]'>

      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
          <h1 className=' text-4xl font-bold '>Basic Blog Information</h1>
          <p className=''>Make changes to your blogs here. Click publish when you're done.</p>
          <div className='space-x-2'>
            <Button onClick={() => togglePublish(selectBlog.isPublished ? "false" : "true")}>
              {
                selectBlog.isPublished ? "Unpublish" : "Publish"
              }
            </Button>
            <Button onClick={deleteBlog} variant="destructive">Remove blog</Button>

          </div>
          <div className='pt-10'>
            <Label>Title</Label>
            <Input type="text" placeholder="Enter a title" name="title" className='dark:border-gray-300' value={blogData.title} onChange={onChangeHandler} />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input type="text" placeholder="Enter a subtitle" name="subtitle" className='dark:border-gray-300' value={blogData.subtitle} onChange={onChangeHandler} />
          </div>
          <div>
            <Label>Description</Label>
            <JoditEditor
              ref={editor}
              className="jodit_toolbar"
              value={content}
              onChange={setContent}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select className="dark:border-gray-300" value={blogData.category}
              onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Fitness & Health">Fitness & Health</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Personal Development">Personal Development</SelectItem>
                  <SelectItem value="News & Politics">News & Politics</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Thumbnail</Label>
            <Input id="file"
              type="file"
              accept="image/*"
              className="w-fit dark:border-gray-300" onChange={selectThumbnail} />{previewThumbnail && <img src={previewThumbnail} alt="preview" className="w-32 mt-2" />}
          </div>
          <div className='flex gap-3'>
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button onClick={updateBlogHandler}>
              {
                loading ? <><Loader2 />Please wait</> : "Save"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default BlogDetails
