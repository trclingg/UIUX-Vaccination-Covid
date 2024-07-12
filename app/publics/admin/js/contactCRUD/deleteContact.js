var gId;
function getDetailDataRowFromIcon(paramIcon, paramTableName) {
    var vRow = $(paramIcon).parents('tr')
    var vDetail = paramTableName.row(vRow).data()
    // test
    // console.log(vDetail);
    // console.log(vDetail._id);
    gId = vDetail._id

    return vDetail
}

function deleteContactData(paramIcon, paramTableName, paramAPIUrl) {
    // delete new data to database
    $.ajax({
        url: paramAPIUrl + gId,
        type: 'DELETE',
        success: function (data) {
            // test
            alert('Delete user successfully!')

            // hide modal
            $('#delete-contact-modal').modal('hide')
            
        }
        ,
        error: function (error) {
            alert('Error when delete user!')
            console.log(error.message)
        }

    })
}

export { deleteContactData, getDetailDataRowFromIcon }