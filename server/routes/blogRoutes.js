const express = require("express");
const blogRouter = express.Router();
const multer = require("multer");
const fs = require("fs");

const { blogModel } = require("../model/blogModel");
const { auth } = require("../middlewares/auth");
const path = require("path");
const { userModel } = require("../model/userModel");

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads";
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the 'uploads' folder if it doesn't exist
    cb(null, uploadDir);
  },
  
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

blogRouter.get("/", (req, res) => {
  res.send({
    message: "blog route",
  });
});

blogRouter.get("/allBlogs/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const blogs = await blogModel.find({});
    const totalBlogs = blogs.length;
    const blogsPerPage = 6;
    const startIndex =
      totalBlogs - blogsPerPage * page > 0
        ? totalBlogs - blogsPerPage * page
        : 0;
    const endIndex = totalBlogs;
    const blogsToSend = blogs.slice(startIndex, endIndex);
    res.send({
      message: "blogs fetched",
      blogs: blogsToSend,
      totalBlogs: totalBlogs,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

blogRouter.get("/getBlog/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    res.send({
      message: "blog fetched",
      blog: blog,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.get("/getBlogsByUser/:page", auth, async (req, res) => {
  try {
    const page = parseInt(req.params.page);

    const blogs = await blogModel.find({ createdBy: req.user.email });
    const totalBlogs = blogs.length;
    const blogsPerPage = 6;
    const startIndex =
      totalBlogs - blogsPerPage * page > 0
        ? totalBlogs - blogsPerPage * page
        : 0;
    const endIndex = totalBlogs;
    const blogsToSend = blogs.slice(startIndex, endIndex);
    res.send({
      message: "blogs fetched",
      blogs: blogsToSend,
      totalBlogs: totalBlogs,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.post(
  "/createBlog",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content, summary, createdBy } = req.body;
      const newBlog = new blogModel({
        title,
        content,
        summary,
        createdBy,
        image: req.file ? req.file.filename : "",
      });
      const blog = await newBlog.save();
      const user = await userModel.findOne({ email: req.user.email });
      user.blogs = user.blogs + 1;
      await user.save();
      res.send({
        message: "blog created",
        blog: blog,
      });
    } catch (err) {
      res.status(404).send({
        message: err.message,
      });
    }
  }
);

blogRouter.get("/images/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../uploads", filename);
    res.sendFile(imagePath);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.delete("/deleteBlog/:id", auth, async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    //delete the blog.image from uploads folder
    if (blog.image) {
      const imagePath = path.join(__dirname, "../uploads", blog.image);
      fs.unlinkSync(imagePath);
    }

    res.send({
      message: "blog deleted",
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.patch(
  "/updateBlog/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content, summary, createdBy } = req.body;
      const updatedBlog = {
        title,
        content,
        summary,
        createdBy,
        image: req.file ? req.file.filename : "",
      };
      const blog = await blogModel.findByIdAndUpdate(
        req.params.id,
        updatedBlog,
        {
          new: true,
        }
      );

      //update the number of blog param of userModel of this user whose details are in req.user

      res.send({
        message: "blog updated",
        blog: blog,
      });
    } catch (err) {
      res.status(404).send({
        message: err.message,
      });
    }
  }
);

module.exports = { blogRouter };
