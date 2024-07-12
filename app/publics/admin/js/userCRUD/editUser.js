var gId;
function getDetailDataRowFromIcon(paramIcon, paramTableName) {
    var vRow = $(paramIcon).parents('tr')
    var vDetail = paramTableName.row(vRow).data()
    gId = vDetail._id
    // test
    console.log(vDetail);
    console.log(vDetail._id);
    return vDetail
}
function showRowDataToModalEdit(paramIcon, paramTableName) {
    var vDetail = getDetailDataRowFromIcon(paramIcon, paramTableName)
    // test
    // console.log(vDetail);
    $('#select-status').val(vDetail.status)
    $('#inp-name').val(vDetail.fullName)
    $('#inp-phone').val(vDetail.phone)
    $('#inp-created-at').val(vDetail.createdAt)
    $('#inp-updated-at').val(vDetail.updatedAt)

}
function updateUserNewData(paramIcon, paramTableName, paramAPIUrl) {
    // get new data from modal
    var vNewStatus = $('#select-status').val()
    var vNewName = $('#inp-name').val()
    var vNewPhone = $('#inp-phone').val()
    // test
    // console.log(vNewStatus, vNewName, vNewPhone, vNewCreatedAt, vNewUpdatedAt);
    let vUpdatedUser = {
        status: vNewStatus,
        fullName: vNewName,
        phone: vNewPhone,
    }
    var vIsValid = validateUser(vUpdatedUser)
    if (vIsValid) {
        // update new data to database
        $.ajax({
            url: paramAPIUrl + gId,
            type: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(vUpdatedUser),
            success: function (data) {
                // test
                alert('Update user successfully!')

                // hide modal
                $('#update-user-modal').modal('hide')
            }
            ,
            error: function (error) {
                alert('Error when update user!')
                console.log(error.message)
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

export { showRowDataToModalEdit, updateUserNewData }