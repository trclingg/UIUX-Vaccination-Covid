function createUserNewData(paramIcon, paramTableName, paramAPIUrl) {
    // get new data from modal
    var vNewStatus = $('#select-new-status').val()
    var vNewName = $('#inp-new-name').val()
    var vNewPhone = $('#inp-new-phone').val()
    let vNewUser = {
        status: vNewStatus,
        fullName: vNewName,
        phone: vNewPhone,
    }
    // console.log(JSON.stringify(vNewUser))
    // hàm validate thông tin tạo mới từUser
    var vIsValid = validateUser(vNewUser)
    if (vIsValid) {
        // crate new user to database
        $.ajax({
            url: paramAPIUrl,
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(vNewUser),
            success: function (data) {
                // test
                alert('Create user successfully!')

                // hide modal
                $('#create-user-modal').modal('hide')
                // clear form
                $('#select-new-status').val('')
                $('#inp-new-name').val('')
                $('#inp-new-phone').val('')
                
            }
            ,
            error: function (error) {
                alert('Error when create user!')
                console.log(error.message)
                console.log(error)
            }

        })
    }
}


const validateUser = (paramUser) => {
    if (paramUser.fullName == '') {
        // warningModalShow(`Please fill your full name`)
        alert(`Please fill your full name`)
        return false
    }
    if (paramUser.phone == '') {
        // warningModalShow(`Please fill yourUser's description more than 20 characters`)
        alert(`Please fill your phone number`)
        return false
    }

    if (!validatePhone(paramUser.phone)) {
        // warningModalShow(`Please fill yourUser's description more than 20 characters`)
        return false
    }
    
    return true
}

function validatePhone(paramPhoneNumber) {
    if (!paramPhoneNumber) {
        alert("Phone number is required");
        return false;
    }

    var regexPhoneSyntax = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!regexPhoneSyntax.test(paramPhoneNumber)) {
        alert("Phone number is invalid");
        return false;
    }
    // alert("Phone number is valid");
    return true;

}

export { createUserNewData }