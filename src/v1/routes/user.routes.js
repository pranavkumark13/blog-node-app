const express = require('express');
const userController = require('../controllers/user.controller.js');
const router = express.Router();

router.post('/', async(req, res) => {
    await userController.createUser(req, res);
});

router.get('/', async(req, res) => {
    await userController.getUsers(req, res);
});

router.get('/:id', async(req, res) => {
    await userController.getSingleUser(req, res);
});

router.put('/:id', async(req, res) => {
    await userController.updateSingleUser(req, res);
});

router.post('/login', async(req, res) => {
    await userController.loginUser(req, res);
})

router.delete('/', async(req, res) => {
    await userController.deleteUser(req, res);    
});

module.exports = router;