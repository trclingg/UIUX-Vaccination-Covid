const getAllContactsMiddleware = (req, res, next) => {
    console.log(`Console: Get all contacts`);
    next();
}

const getContactMiddleWare = (req, res, next) => {
    let contactId = req.params.contactId
    console.log(`Console: Get contact with id ${contactId}`)
    next()
}

const postContactMiddleWare = (req, res, next) => {
    console.log(`Console: Create new contact`)
    next()
}

const putContactMiddleWare = (req, res, next) => {
    let contactId = req.params.contactId
    console.log(`Console: Update contact with id ${contactId}`)
    next()
}

const deleteContactMiddleWare = (req, res, next) => {
    let contactId = req.params.contactId
    console.log(`Console: Delete contact with id ${contactId}`)
    next()
}

module.exports = {
    getAllContactsMiddleware,
    getContactMiddleWare,
    postContactMiddleWare,
    putContactMiddleWare,
    deleteContactMiddleWare
}