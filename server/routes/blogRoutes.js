const express = require("express");
const blogRouter = express.Router();

const { blogModel } = require("../model/blogModel");
const { auth } = require("../middlewares/auth");

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

blogRouter.get("/getBlogsByUser",auth, async (req, res) => {
    try {
        const blogs = await blogModel.find({createdBy:req.user.email});
        res.send({
        message: "blogs fetched",
        blogs: blogs,
        });
    } catch (err) {
        res.status(404).send({
        message: err.message,
        });
    }
})

blogRouter.post("/createBlog",auth, async (req, res) => {
  try {
    const newBlog = blogModel(req.body);
    await newBlog.save();
    res.send({
      message: "blog created",
    });
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

blogRouter.delete("/deleteBlog/:id",auth, async (req, res) => {
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

blogRouter.patch("/updateBlog/:id",auth, async (req, res) => {
  try {
    const updatedBlog = req.body;
    const blog = await blogModel.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
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
