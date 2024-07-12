function createContactNewData(paramIcon, paramTableName, paramAPIUrl) {
    // get new data from modal
    var vNewEmail = $('#inp-new-email').val()
    // test
    let vNewEmailObject = {
       email: vNewEmail
    }
    console.log(vNewEmailObject.email)
    var vIsValid = validateContact(vNewEmailObject)
    if (vIsValid) {
        // crate new contact to database
        $.ajax({
            url: paramAPIUrl,
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(vNewEmailObject),
            success: function (data) {
                // test
                alert('Create contact successfully!')

                // hide modal
                $('#create-contact-modal').modal('hide')
                // clear form
                $('#inp-new-email').val('')
            }
            ,
            error: function (error) {
                alert('Error when create contact!')
                console.log(error.message)
                console.log(error)
            }

        })
    }
}


const validateContact = (paramContact) => {
    if (paramContact.email == '') {
        alert(`Please fill your email`)
        return false
    }

    if (!validateEmail(paramContact.email)) {
        return false
    }

    return true
}

function validateEmail(paramEmail) {
    
    // var regexEmailSyntax = /\S+@\S+\.\S+/;
    
    var regexEmailSyntax = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmailSyntax.test(paramEmail)) {
        alert("Email is invalid");
        return false;

    };
    // alert("Email is valid");
    return true;
}

export { createContactNewData }