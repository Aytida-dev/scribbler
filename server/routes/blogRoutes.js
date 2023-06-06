const express = require("express");
const blogRouter = express.Router();
const multer = require("multer");
const fs = require("fs");

const { blogModel } = require("../model/blogModel");
const { auth } = require("../middlewares/auth");
const path = require("path");

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the 'uploads' folder if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

blogRouter.get("/", (req, res) => {
  res.send({
    message: "blog route",
  });
});

blogRouter.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    res.send({
      message: "blogs fetched",
      blogs: blogs,
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

blogRouter.get("/getBlogsByUser", auth, async (req, res) => {
  try {
    const blogs = await blogModel.find({ createdBy: req.user.email });
    res.send({
      message: "blogs fetched",
      blogs: blogs,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.post("/createBlog", auth, upload.single('image'), async (req, res) => {
  try {
    
    const {title , content , summary , createdBy} = req.body;
    const newBlog = new blogModel({
      title,
      content,
      summary,
      createdBy,
      image: req.file ? req.file.filename : '',
    });
    const blog = await newBlog.save();
    res.send({
      message: "blog created",
      blog: blog,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

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
    res.send({
      message: "blog deleted",
      blog: blog,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.patch("/updateBlog/:id", auth, upload.single('image') , async (req, res) => {
  try {
    const { title, content, summary , createdBy} = req.body;
    const updatedBlog = {
      title,
      content,
      summary,
      createdBy,
      image:req.file?  req.file.filename : '',
    }
    const blog = await blogModel.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true,
    });
    res.send({
      message: "blog updated",
      blog: blog,
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

module.exports = { blogRouter };
