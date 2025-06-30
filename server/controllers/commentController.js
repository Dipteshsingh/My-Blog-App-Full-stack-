import commentModel from "../models/CommentModel.js";
import blogModel from "../models/BlogModel.js";

const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentUserId = req.userId;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Text is required', success: false });
    }

    const blog = await blogModel.findById(postId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found', success: false });
    }

    const comment = await commentModel.create({
      content,
      userId: commentUserId,
      postId: postId,
    });

    if (!blog.comments) blog.comments = [];
    blog.comments.push(comment._id);
    await blog.save();

    await comment.populate({
      path: 'userId',
      select: 'firstName lastName photoUrl',
    });

    return res.status(201).json({
      message: 'Comment added',
      comment,
      success: true,
    });
  } catch (error) {
    console.log("Create Comment Error:", error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

 const getCommentsOfPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await commentModel.find({ postId: blogId }).populate({ path: 'userId', select: 'firstName lastName photoUrl' }).sort({ createdAt: -1 })

    if (!comments) return res.status(404).json({ message: 'No comments found for this blog', success: false })
    return res.status(200).json({
      success: true, comments
    })
  } catch (error) {
    console.log(error);

  }
}

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.userId;

    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this comment' });
    }

    const blogId = comment.postId;

    // Delete the comment
    await commentModel.findByIdAndDelete(commentId);


    await blogModel.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId }
    });

    return res.status(200).json({ success: true, message: 'Comment deleted successfully' });

  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const editComment = async (req, res) => {
  try {
    const userId = req.userId
    const { content } = req.body
    const commentId = req.params.id
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this comment' });
    }

    comment.content = content;
    comment.editedAt = new Date();

    await comment.save();

    res.status(200).json({ success: true, message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Comment is not edited", error: error.message })
  }
}


const likeComment = async (req, res) => {
  try {
    const userId = req.userId;
    const commentId = req.params.id;

    const comment = await commentModel.findById(commentId).populate("userId");
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      comment.likes = comment.likes.filter(id => id.toString() !== userId); 
      comment.numberOfLikes = comment.likes.length; 
    } else {
      comment.likes.push(userId);
      comment.numberOfLikes = comment.likes.length; 
    }

    await comment.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Comment unliked" : "Comment liked",
      updatedComment: comment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while liking the comment",
      error: error.message,
    });
  }
};


const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.userId;

    const myBlogs = await blogModel.find({ author: userId }).select("_id");
    const blogIds = myBlogs.map(blog => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user.",
      });
    }

    const comments = await commentModel.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments.",
    });
  }
};


export { createComment, deleteComment, editComment, likeComment, getCommentsOfPost, getAllCommentsOnMyBlogs }