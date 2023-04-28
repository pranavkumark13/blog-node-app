const express = require('express');
const blogController = require('../controllers/blog.controller.js');
const router = express.Router();

router.post('/', async(req,res) => {
    await blogController.createBlog(req, res);
})

router.get('/', async(req,res) => {
    await blogController.getAllBlogs(req,res);
})

router.get('/user/:id', async(req,res) => {
    await blogController.getAllBlogsByUserId(req, res);
})

router.get('/:id', async(req,res) => {
    await blogController.getBlogById(req, res);
})

router.delete('/:id', async(req,res) => {
    await blogController.deleteBlogById(req,res);
})

module.exports = router;