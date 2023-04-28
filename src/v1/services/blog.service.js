const pool = require('../../config/database.js');

const createBlog = async(data) => {
    var isUserAvailable = await isRegisteredUser(data.userId);
    if (isUserAvailable) {
        var sql = `INSERT INTO blogs (userid, title, description) VALUES (${data.userId}, '${data.title}', '${data.description}')`;
        var result = await pool.query(sql);
        if (result.length != 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return undefined;
    }
}

const getAllBlogs = async() => {
    var sql = "SELECT blogs.id, blogs.title, blogs.description, blogs.createdAt, users.id, users.name, users.email FROM blogs JOIN users ON blogs.userid = users.id ORDER BY blogs.createdAt DESC";
    const result = await pool.query(sql);
    const users = result[0];
    if (users.length == 0) {
        return [];
    }
    return users;
}

const getAllBlogsByUserId = async(userId) => {
    var isUserAvailable = await isRegisteredUser(userId);
    if (isUserAvailable) {
        var sql = `SELECT blogs.id, blogs.title, blogs.description, blogs.createdAt, users.id, users.name, users.email FROM blogs JOIN users ON blogs.userid=users.id WHERE users.id = ${userId} ORDER BY blogs.createdAt DESC`;
        const result = await pool.query(sql);
        const users = result[0];
        if (users.length == 0) {
            return [];
        }
        return users;
    } else {
        return undefined;
    }
}

const getBlogById = async(blogId) => {
    var isBlogAvailable = await isValidBlog(blogId);
    if (isBlogAvailable) {
        var sql = `SELECT blogs.id, blogs.title, blogs.description, blogs.createdAt, users.id, users.name, users.email FROM blogs JOIN users ON blogs.userid=users.id WHERE blogs.id = ${blogId}`;
        const result = await pool.query(sql);
        const blog = result[0];
        if (blog.length == 0) {
            return {};
        }
        return blog[0];
    } else {
        return undefined;
    }
}

const deleteBlogById = async(blogId) => {
    var isBlogAvailable = await isValidBlog(blogId);
    if (isBlogAvailable) {
        var sql = `DELETE FROM blogs WHERE id = ${blogId}`;
        const result = await pool.query(sql);
        if (result.length != 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return undefined;
    }
}

const isRegisteredUser = async(userId) => {
    var sql = `SELECT * FROM users WHERE id = ${userId}`;
    const result = await pool.query(sql);
    const records = result[0];
    console.log(`The record found is : ${records}`);
    if (records.length == 0) {
        return false;
    } else {
        return true;
    }
}

const isValidBlog = async(blogId) => {
    var sql = `SELECT * FROM blogs WHERE id = '${blogId}'`;
    const result = await pool.query(sql);
    const records = result[0];
    console.log(`The record found is : ${records}`);
    if (records.length == 0) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    createBlog, 
    getAllBlogs,
    getAllBlogsByUserId,
    getBlogById,
    deleteBlogById,
    isRegisteredUser,
    isValidBlog
}