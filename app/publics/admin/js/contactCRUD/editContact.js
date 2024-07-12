var gId;
function getDetailDataRowFromIcon(paramIcon, paramTableName) {
    var vRow = $(paramIcon).parents('tr')
    var vDetail = paramTableName.row(vRow).data()
    gId = vDetail._id
    // test
    // console.log(vDetail);
    // console.log(vDetail._id);
    return vDetail
}
function showRowDataToModalEdit(paramIcon, paramTableName) {
    var vDetail = getDetailDataRowFromIcon(paramIcon, paramTableName)
    // test
    // console.log(vDetail);
    $('#inp-email').val(vDetail.email)
    $('#inp-created-at').val(vDetail.createdAt)
    $('#inp-updated-at').val(vDetail.updatedAt)

}
function updateContactNewData(paramIcon, paramTableName, paramAPIUrl) {
    // get new data from modal
    var vNewEmail = $('#inp-email').val()
    // test
    let vUpdatedEmail = {
       email: vNewEmail
    }
    var vIsValid = validateContact(vUpdatedEmail)
    if (vIsValid) {
        // update new data to database
        $.ajax({
            url: paramAPIUrl + gId,
            type: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(vUpdatedEmail),
            success: function (data) {
                // test
                alert('Update Contact successfully!')

                // hide modal
                $('#update-Contact-modal').modal('hide')
            }
            ,
            error: function (error) {
                alert('Error when update Contact!')
                console.log(error.message)
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

export { showRowDataToModalEdit, updateContactNewData }