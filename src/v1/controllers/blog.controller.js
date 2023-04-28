const httpStatusCodes = require('../../config/httpStatusCodes.js');
const blogService = require('../services/blog.service.js');

const createBlog = async(req,res) => {
    try {
        const { body } = req;
        if (body.userId == undefined) {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User ID is needed'});
        } else if (body.title == undefined || body.title == "") {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Title for blog is needed'});
        } else if (body.description == undefined || body.description == "") {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Description field is needed'});
        } else {
            const data = {
                userId: body.userId,
                title: body.title,
                description: body.description,
            }
            let isCreated = await blogService.createBlog(data);
            if (isCreated == undefined) {
                res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User doesn\'t exists'});
            } else {
                if (isCreated) {
                    res.status(httpStatusCodes.OK).json({'message': 'success'});
                } else {
                    res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Unable to create blog'});
                }
            }
        }
    } catch (error) {
        console.log(`Error while creating a blog. ${error}`);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Unable to create blog.'});
    }
}

const getAllBlogs = async(req,res) => {
    try {
        const blogs = await blogService.getAllBlogs();
        if (blogs.length == 0) {
            res.status(httpStatusCodes.NO_CONTENT).json({'data': blogs});
        } else {
            res.status(httpStatusCodes.OK).json({'data': blogs});
        }
    } catch (error) {
        console.log("Error while fetching blogs:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const getAllBlogsByUserId = async(req,res) => {
    try {
        const userId = req.params.id;
        const blogs = await blogService.getAllBlogsByUserId(userId);
        if (blogs == undefined) {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User doesn\'t exists'});
        } else {
            if (blogs.length == 0) {
                res.status(httpStatusCodes.NO_CONTENT).json({'data': blogs});
            } else {
                res.status(httpStatusCodes.OK).json({'data': blogs});
            }
        }
    } catch (error) {
        console.log("Error while fetching blogs based on user id:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const getBlogById = async(req,res) => {
    try {
        const blogId = req.params.id;
        var blogById = await blogService.getBlogById(blogId);
        if (blogById == undefined) {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Blog ID is incorrect'});
        } else {
            if (blogById === {}) {
                res.status(httpStatusCodes.NO_CONTENT).json({'data': blogById});
            } else {
                res.status(httpStatusCodes.OK).json({'message': 'success', 'data': blogById});
            }
        }
    } catch (error) {
        console.log(`Error while fetching blog by ID: ${error}`);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const deleteBlogById = async(req,res) => {
    try {
        const blogId = req.params.id;
        var isDeleted = await blogService.deleteBlogById(blogId);
        if (isDeleted === undefined) {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Blog ID is incorrect'});
        } else {
            if (isDeleted) {
                res.status(httpStatusCodes.OK).json({'message': 'success'});
            } else {
                res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Couldn\'t delete Blog. Try again'});
            }
        }
    } catch (error) {
        console.log(`Error while deleting blog: ${error}`);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

module.exports = {
    createBlog, 
    getAllBlogs,
    getAllBlogsByUserId,
    getBlogById,
    deleteBlogById
}