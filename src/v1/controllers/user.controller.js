const httpStatusCodes = require('../../config/httpStatusCodes.js');
const userService = require('../services/user.service.js');

const createUser = async(req, res) => {
    try {
        const { body } = req
        const user = {
            name: body.name,
            email: body.email,
            password: body.password,
            phone: body.phone,
            city: body.city,
            country: body.country
        }
        const isUserCreated = await userService.createUser(user);
        if (isUserCreated) {
            res.status(httpStatusCodes.OK).json({'message': 'success', 'data': {name: user.name, email: user.email, phone: user.phone, city: user.city, country: user.country}});
        } else {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User already registered. Please try logging in'});
        }
    } catch (error) {
        console.log("Error while user signup. Error: ", error);
        res.status(500).json({'error': 'Something went wrong'});
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await userService.getUsers();
        if (users.length == 0) {
            res.status(httpStatusCodes.NO_CONTENT).json({'data': users});
        } else {
            res.status(httpStatusCodes.OK).json({'data': users});
        }
    } catch (error) {
        console.log("Error while fetching list of users:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const getSingleUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const isValidUser = await userService.isValidUser(userId);
        if (isValidUser) {
            const user = await userService.getSingleUser(userId);
            res.status(httpStatusCodes.OK).json({'data': user});
        } else {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User not available'});
        }
    } catch (error) {
        console.log("Error while fetching single user:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const updateSingleUser = async(req,res) => {
    try {
        const { body } = req;
        const userId = req.params.id;
        const data = {
            name: body.name,
            phone: body.phone,
            city: body.city,
            country: body.country
        }
        const isValidUser = await userService.isValidUser(userId);
        if (isValidUser) {
            const isUpdated = await userService.updateSingleUser(userId, data);
            if (isUpdated) {
                res.status(httpStatusCodes.OK).json({'message': 'success'});
            } else {
                res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Unable to update. Try again'}); 
            }
        } else {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User not available'});
        }
    } catch (error) {
        console.log("Error while updating user:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const loginUser = async(req, res) => {
    try {
        const { body } = req;
        const user = {
            email: body.email,
            password: body.password
        }
        const result = await userService.loginUser(user.email);
        if (result == undefined) {
            res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'User not found. Kindly signup.'});
        } else {
            const doesPasswordMatch = await userService.comparePassword(user.password, result.password);
            if (!doesPasswordMatch) {
                res.status(httpStatusCodes.BAD_REQUEST).json({'error': 'Enterred password is incorrect.'});
            } else {
                res.status(httpStatusCodes.OK).json({'message': 'success','data': {id: result.id, name: result.name, email: result.email, phone: result.phone, city: result.city, country: result.country}});
            }
        }
    } catch (error) {
        console.log("Error while fetching single user:", error);
        res.status(httpStatusCodes.INTERNAL_SERVER).json({'error': 'Something went wrong.'});
    }
}

const deleteUser = async(req, res) => {
    const deletedUser = await userService.deleteUser();
    res.send('Delete a User API');
}

module.exports = {
    createUser,
    getUsers,
    getSingleUser,
    loginUser,
    updateSingleUser,
    deleteUser
}