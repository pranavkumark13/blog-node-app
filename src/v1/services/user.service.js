const pool = require('../../config/database.js');
const bcrypt = require('bcryptjs');

// get user object, store in database and return an object as response.
const createUser = async(user) => {
    const encryptedPassword = await hashPassword(user.password);
    const isAlreadyRegistered = await isRecordAvailable(user.email);
    console.log(`User already registered: ${isAlreadyRegistered}`);
    if (!isAlreadyRegistered) {
        var sql = `INSERT INTO users (name, email, password, phone, city, country) VALUES ('${user.name}', '${user.email}', '${encryptedPassword}', '${user.phone}', '${user.city}', '${user.country}')`;
        var result = await pool.query(sql);
        if (result.length != 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }    
}

// return list of users as an array.
const getUsers = async() => {
    var sql = "SELECT id,name,email,phone,city,country FROM users";
    const result = await pool.query(sql);
    const users = result[0];
    if (users.length == 0) {
        return [];
    }
    return users;
}

// return single user based on id.
const getSingleUser = async(userId) => {
    var sql = `SELECT id,name,email,phone,city,country FROM users WHERE id = '${userId}'`;
    const result = await pool.query(sql);
    const user = result[0];
    if (user.length == 0) {
        return {};
    }
    return user[0];
}

// update user based on id in database and return an object as response.
const updateSingleUser = async(userId, user) => {
    var sql = `UPDATE users SET name = '${user.name}', phone = '${user.phone}', city = '${user.city}', country = '${user.country}' WHERE id = '${userId}'`;
    const result = await pool.query(sql);
    if (result.length != 0) {
        return true;
    } else {
        return false;
    }
}

// check if user details match in database, if so return user object, or else dont.
const loginUser = async(email) => {
    var sql = `SELECT id, name, email, password, phone, city, country FROM users WHERE email = '${email}'`;
    const result = await pool.query(sql);
    const data = result[0];
    if (data.length == 0) {
        return undefined;
    } else {
        return data[0];
    }
}

// delete the user from database, return an object as response.
const deleteUser = async() => {}

const isRecordAvailable = async(email) => {
    var sql = `SELECT * FROM users WHERE email = '${email}'`;
    const result = await pool.query(sql);
    const records = result[0];
    console.log(`The record found is : ${records}`);
    if (records.length == 0) {
        return false;
    } else {
        return true;
    }
}

const isValidUser = async(userId) => {
    var sql = `SELECT * FROM users WHERE id = '${userId}'`;
    const result = await pool.query(sql);
    const records = result[0];
    console.log(`The record found is : ${records}`);
    if (records.length == 0) {
        return false;
    } else {
        return true;
    }
}

const hashPassword = async(password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const comparePassword = async(enteredPassword, dbPassword) => {
    const isEqual = await bcrypt.compare(enteredPassword, dbPassword);
    return isEqual;
}

module.exports = {
    createUser,
    getUsers,
    getSingleUser,
    loginUser,
    updateSingleUser,
    deleteUser,
    isValidUser,
    comparePassword,
}