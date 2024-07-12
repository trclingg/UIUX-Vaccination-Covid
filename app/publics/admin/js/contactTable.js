/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// import
import { createContactNewData } from './contactCRUD/createContact.js'
import { showRowDataToModalEdit, updateContactNewData } from './contactCRUD/editContact.js'
import { deleteContactData, getDetailDataRowFromIcon } from './contactCRUD/deleteContact.js'
// declare variables
const gApiUrl = window.location.origin + "/api/contacts/";

var gSTT = 0
var gId;
const gContactTable = $('#table-contacts').DataTable({
    columns: [
        { data: '_id' },
        { data: 'email' },
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
            targets: 2,
            className: "text-center",
            defaultContent: `
            <img class="edit-contact" src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" style="width: 20px;cursor:pointer;" data-toggle="tooltip" data-placement="bottom" title="View Detail">
            <img class="delete-contact" src="https://cdn4.iconfinder.com/data/icons/complete-common-version-6-4/1024/trash-512.png" style="width: 20px;cursor:pointer;" data-toggle="tooltip" data-placement="bottom" title="Delete">
            `
        }
    ]
})

const gCONTACT_URL = location.origin + "/api/contacts";
console.log(gCONTACT_URL);
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    showTable()
    // EDIT CONTACT

    // add event for icon edit
    $('#tbody-contacts').on('click', '.edit-contact', function () {
        // alert('edit')
        $('#update-contact-modal').modal('show');
        showRowDataToModalEdit(this, gContactTable);
    })

    // / add event for edit confirm button
    $('#btn-update-contact').on('click', () => {
        updateContactNewData(this, gContactTable, gApiUrl);
        // reload the table display
        showTable()
    })

    // CREATE CONTACT

     // add event for create new button
    $('#btn-add-contact').on('click', () => {
        $('#create-contact-modal').modal('show')
    })
    // add event for create confirm button
    $('#btn-create-contact').on('click', () => {
        createContactNewData(this, gContactTable, gApiUrl);
        // reload the table display
        showTable()
        
    })


    // DELETE CONTACT
    
     // add event for icon delete
    $('#tbody-contacts').on('click', '.delete-contact', function () {
        $('#delete-contact-modal').modal('show')
        // get detail data row
        getDetailDataRowFromIcon(this, gContactTable)
    })
     // add event for delete confirm button
     $('#btn-delete-contact').on('click', () => {
        deleteContactData(this, gContactTable, gApiUrl);
        
        // reload the table display
        showTable()
    })
})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function showTable() {

    $.ajax({
        url: gCONTACT_URL,
        method: "GET",
        dataType: "json",
        success: function (data) {
            gContactTable.clear()
            gContactTable.rows.add(data.data)
            gContactTable.draw()
        }
    })


}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/


