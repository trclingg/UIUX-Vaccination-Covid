const contactModel = require('../models/contactModel');
const mongoose = require('mongoose');

// get all contacts
const getAllContacts = async (req, res) => {
    try {
        let contacts = await contactModel.find({});
        return res.status(200).json({   
            message: 'get all contacts successfully',
            data: contacts
        })

    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get all contacts',    
            error: error.message
        })
    }
}

// get contact by id
const getContactById = async (req, res) => {
    try {
        // collect data from client
        let contactId = req.params.contactId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(contactId)) { 
            return res.status(400).json({
                message: 'contactId is invalid'
            })
        }
        // find contact by id
        let contact = await contactModel.findById(contactId);
        if (!contact) {
            return res.status(404).json({
                message: 'contact not found'
            })
        }
        return res.status(200).json({
            message: 'get contact by id successfully',
            data: contact
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when get contact by id',
            error: error.message
        })
    }
}

        


// create a contact
const createContact = async (req, res) => {
    // Cách 1: sử dụng async await
    // B1: collect data from client
    const {
        email
    } = req.body
    // B2:validate 
    if (!email) {
        return res.status(400).json({
            message: 'email is required'
        })
    }
    
    // B3: 
    let newContact = new contactModel({
        _id: new mongoose.Types.ObjectId(),
        email
    })
    try {
        await contactModel.create(newContact);
        return res.status(200).json({
            message: 'create contact successfully',
            data: newContact
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when create contact',
            error: error.message
        })
    }
    // Cách 2: sử dụng promise
    // contactModel.create(newContact)
    //     .then(data => res.status(200).json({ message: 'create contact successfully', data }))
    //     .catch(error => res.status(500).json({ message: 'error when create contact', error: error.message }))

    
}

// update a contact
const updateContact = async (req, res) => {
    try {
        // collect data from client
        let contactId = req.params.contactId;
        const {
            email
        } = req.body
        // B2:validate 
        if (!email) {
            return res.status(400).json({
                message: 'email is required'
            })
        }
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                message: 'contactId is invalid'
            })
        }

        let newContactData = new contactModel({
            email
            });
        // find and update contact by id
        let contact = await contactModel.findByIdAndUpdate(contactId, newContactData);
        if (!contact) {
            return res.status(404).json({
                message: 'contact not found'
            })
        }
        return res.status(200).json({
            message: 'update contact successfully',
            data: contact
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when update contact',
            error: error.message
        })
    }
}

// delete a contact
const deleteContact = async (req, res) => {
    try {
        // collect data from client
        let contactId = req.params.contactId;
        // validate
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({
                message: 'contactId is invalid'
            })
        }
        // find and delete contact by id
        let contact = await contactModel.findByIdAndDelete(contactId);
        if (!contact) {
            return res.status(404).json({
                message: 'contact not found'
            })
        }
        return res.status(200).json({
            message: 'delete contact successfully',
            data: contact
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'error when delete contact',  
            error: error.message
        })
    }
}



module.exports = {
    createContact, getAllContacts, getContactById, updateContact, deleteContact
}

