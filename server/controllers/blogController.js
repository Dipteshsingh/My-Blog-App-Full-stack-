import mongoose from "mongoose";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import blogModel from "../models/blogModel.js";

// Create blogs----

const createBlog = async (req, res) => {
  const { title, category, description } = req.body
  if (!title || !category || !description) {
    return res.status(400).json({
      message: "Blog title and category is required."
    })
  }

  try {
    const blog = await new blogModel({
      title,
      category,
      description,
      author: req.userId

    })

    const savedBlog = await blog.save()
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: savedBlog,
    })

  } catch (error) {
    res.json({ success: false, message: error.message })

  }

}

// Get my blogs====

const allBlogs = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({
        success: false,
        message: "User ID is required"
      })
    }
    const blogs = await blogModel.find({ author: userId }).populate({
      path: "author",
      select: 'firstName lastName photoUrl'
    })
    if (!blogs) {
      return res.json({
        success: false,
        message: "No Blogs found",
        blogs: []

      })
    }
    return res.json({
      success: true,
      blogs
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}


// Get a single blog ----

const singleBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id)
    if (!blog) {
      res.json({ success: false, message: 'No blogs found' })
    }
    return res.json({ success: true, message: blog })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// delete blog-----

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(400).json({ success: false, message: "Blog ID is required" });
    }

    const blog = await blogModel.findByIdAndDelete(blogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update blog------

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, category } = req.body;
    const file = req.file

    let blog = await blogModel.findById(id)
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      })
    }
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file)
      thumbnail = await cloudinary.uploader.upload(fileUri)
    }
    const updateData = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url }
    blog = await blogModel.findByIdAndUpdate(id, updateData, { new: true })
    return res.json({
      success: true,
      message: "Blog updated successfully",
      blog
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({ isPublished: true }).sort({ createdAt: -1 }).populate({ path: "author", select: "firstName lastName photoUrl" })
    if (!blogs) {
      return res.json({
        success: false,
        message: "Blogs not found"
      })
    }
    return res.json({
      success: true,
      blogs
    })
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}

const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogModel.findById(blogId)
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      })
    }
    blog.isPublished = !blog.isPublished
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}
 const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.userId; // Ensure your auth middleware sets req.userId

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      blog.likes.push(userId);
    }

    blog.numberOfLikes = blog.likes.length; // Update like count
    await blog.save();

    // Optionally populate author/likes for frontend
    const updatedBlog = await blogModel.findById(blogId)
      .populate("author", "firstName lastName")
      .populate("likes", "firstName lastName");

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      blog: updatedBlog
    });

  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



 const dislikeBlog = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'post not found', success: false })

        //dislike logic started
        await blog.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await blog.save();

        return res.status(200).json({ message: 'Blog disliked', blog, success: true });
    } catch (error) {
        console.log(error);

    }
}

 const getMyTotalBlogLikes = async (req, res) => {
    try {
      const userId = req.id; // assuming you use authentication middleware
  
      // Step 1: Find all blogs authored by the logged-in user
      const myBlogs = await blogModel.find({ author: userId }).select("likes");
  
      // Step 2: Sum up the total likes
      const totalLikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0);
  
      res.status(200).json({
        success: true,
        totalBlogs: myBlogs.length,
        totalLikes,
      });
    } catch (error) {
      console.error("Error getting total blog likes:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch total blog likes",
      });
    }
  };


export { createBlog, allBlogs, singleBlog, deleteBlog, updateBlog,getPublishedBlogs,togglePublishBlog,likeBlog,dislikeBlog,getMyTotalBlogLikes }