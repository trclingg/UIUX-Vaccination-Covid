const userModel = require('../models/userModel');
const mongoose = require('mongoose');

// get all users
const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find({});
        return res.status(200).json({   
            message: 'get all users successfully',
            data: users
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all users',    
            error: error.message
        })
    }
}

// get user by id
const getUserById = async (req, res) => {
    try {
        // collect data from client
        let userId = req.params.userId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(userId)) { 
            return res.status(400).json({
                message: 'userId is invalid'
            })
        }
        // find user by id
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        return res.status(200).json({
            message: 'get user by id successfully',
            data: user
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get user by id',
            error: error.message
        })
    }
}

        


// create a user
const createUser = async (req, res) => {
    // Cách 1: sử dụng async await
    // B1: collect data from client
    const {
        fullName,
        phone,
        status
    } = req.body
    // B2:validate 
    if (!fullName) {
        return res.status(400).json({
            message: 'fullName is required'
        })
    }
    if (!phone) {
        return res.status(400).json({
            message: 'phone is required'
        })
    }
    // B3: 
    let newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        phone,
        status
    })
    try {
        await userModel.create(newUser);
        return res.status(200).json({
            message: 'create user successfully',
            data: newUser
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create user',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // userModel.create(newUser)
    //     .then(data => res.status(200).json({ message: 'create user successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create user', error: error.message }))

    
}

// update a user
const updateUser = async (req, res) => {
    try {
        // collect data from client
        let userId = req.params.userId;
        let {
            fullName,
            phone,
            status
        } = req.body;
        // validate
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'userId is invalid'
            })
        }

        let newUserData = new userModel({
            fullName,
            phone,
            status
            });
        // find and update user by id
        let user = await userModel.findByIdAndUpdate(userId, newUserData);
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        return res.status(200).json({
            message: 'update user successfully',
            data: user
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update user',
            error: error.message
        })
    }
}

// delete a user
const deleteUser = async (req, res) => {
    try {
        // collect data from client
        let userId = req.params.userId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'userId is invalid'
            })
        }
        // find and delete user by id
        let user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        return res.status(200).json({
            message: 'delete user successfully',
            data: user
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete user',  
            error: error.message
        })
    }
}



module.exports = {
    createUser, getAllUsers, getUserById, updateUser, deleteUser
}

