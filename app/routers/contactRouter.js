const contactRouter = require('express').Router();

const  {
    getAllContactsMiddleware,
    getContactMiddleWare,
    postContactMiddleWare,
    putContactMiddleWare,
    deleteContactMiddleWare
} = require('../middlewares/contactMiddleware');

const {
    createContact, getAllContacts, getContactById, updateContact, deleteContact
} = require('../controllers/contactController');

contactRouter.get('/', getAllContactsMiddleware, getAllContacts);
contactRouter.get('/:contactId', getContactMiddleWare, getContactById);
contactRouter.put('/:contactId', putContactMiddleWare, updateContact);
contactRouter.delete('/:contactId', deleteContactMiddleWare, deleteContact);
contactRouter.post('/', getAllContactsMiddleware, createContact);

module.exports = {contactRouter};
    