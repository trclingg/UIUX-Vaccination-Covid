/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// import
import { createUserNewData } from './userCRUD/createUser.js'
import { showRowDataToModalEdit, updateUserNewData } from './userCRUD/editUser.js'
import { deleteUserData, getDetailDataRowFromIcon } from './userCRUD/deleteUser.js'
// declare variables
const gApiUrl = window.location.origin + "/api/users/";
var gSTT = 0
const gUSER_URL = location.origin + "/api/users/";
const gUserTable = $('#table-users').DataTable({
    columns: [
        { data: '_id' },
        { data: 'fullName' },
        { data: 'phone' },
        { data: 'status' },
        { data: 'action' }
    ],
    columnDefs: [
        {
            targets: 0,
            render: (data, type,row, meta) => {
                return meta.row + 1
            }
        },
        {
            targets: 3,
            render: (data) => {
                // exclude the string "level" from the data
                return data.slice(6)
            }
        },
        {
            targets: 4,
            className: "text-center",
            defaultContent: `
            <img class="edit-user" src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" style="width: 20px;cursor:pointer;" data-toggle="tooltip" data-placement="bottom" title="View Detail">
            <img class="delete-user" src="https://cdn4.iconfinder.com/data/icons/complete-common-version-6-4/1024/trash-512.png" style="width: 20px;cursor:pointer;" data-toggle="tooltip" data-placement="bottom" title="Delete">
            `
        }
    ]
})

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    showTable()
    // EDIT USER
    // add event for icon edit
    $('#tbody-users').on('click', '.edit-user', function () {
        // show modal
        $('#update-user-modal').modal('show');
        // show data onto modal input
        showRowDataToModalEdit(this, gUserTable);
    })

    // add event for edit confirm button
    $('#btn-update-user').on('click', () => {
        updateUserNewData(this, gUserTable, gApiUrl);
        // reload the table display
        showTable()
    })

    // CREATE USER
    // add event for create new button
    $('#btn-add-user').on('click', () => {
        $('#create-user-modal').modal('show')
    })

    // add event for create confirm button
    $('#btn-create-user').on('click', () => {
        createUserNewData(this, gUserTable, gApiUrl);
        // reload the table display
        showTable()
    })


    // DELETE USER
    // add event for icon delete
    $('#tbody-users').on('click', '.delete-user', function () {
        $('#delete-user-modal').modal('show');
        // get detail data row
        getDetailDataRowFromIcon(this, gUserTable)
    })

    // add event for delete confirm button
    $('#btn-delete-user').on('click', () => {
        deleteUserData(this, gUserTable, gApiUrl);
        
        // reload the table display
        showTable()
    })
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function showTable() {

    $.ajax({
        url: gUSER_URL,
        method: "GET",
        dataType: "json",
        success: function (data) {
            gUserTable.clear()
            gUserTable.rows.add(data.data)
            gUserTable.draw()
        }
    })


}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/




