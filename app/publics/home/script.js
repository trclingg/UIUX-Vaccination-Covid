import { validatePhone, validateEmail } from './validateInfo.js';
const gApiUrl = window.location.origin + "/api";
console.log(gApiUrl);



// REGION 2: ADD EVENT LISTENERS
jQuery(document).ready(
    async function () {
        await pageLoad();

    })

async function pageLoad() {
    // Add event listener for verify phone number submit
    $("#reg-today-verifyBtn").on("click", function (event) {
        var phoneData = collectPhoneNumberData();
        var validPhoneNumber = validatePhone(phoneData);

    })

    // Add event listener for reg today form submit
    $("#reg-today-submitBtn").on("click", function (event) {
        var newUser = {
            fullName: "",
            phone: "",
        }
        // collect data
        collectNewUserData(newUser);
        // validate data
        var validUserData = validateNewUserData(newUser);


        if (validUserData) {
            // convert obj to json

            callApiCreateUserToDatabase(JSON.stringify(newUser));
        }
        // clear form
        $("#reg-today-fullName").val("");
        $("#reg-today-phone").val("");
    });

    // Add event listener for get quote form submit
    $("#get-quote-confirmBtn").on("click", function (event) {
        var emailData = { email: "" }
        emailData.email = $("#get-quote-email").val();
        var validEmail = validateEmail(emailData.email);
        if (validEmail) {
            // convert obj to json
            emailData = JSON.stringify(emailData);
            callApiCreateContactToDatabase(emailData);
        }
        $("#get-quote-email").val("");
    });
}



// REGION 4: FUNCTIONS
function collectPhoneNumberData() {
    var phoneNumber = $("#reg-today-phone").val();
    return phoneNumber;
}

function collectNewUserData(paramNewUser) {
    paramNewUser.fullName = $("#reg-today-fullName").val();
    paramNewUser.phone = $("#reg-today-phone").val();
}

function validateNewUserData(paramNewUser) {
    if (paramNewUser.fullName == "") {
        alert("Full name is required");
        return false;
    }
    if (!validatePhone(paramNewUser.phone)) {
        return false;
    }
    alert("New user data is valid");
    return true;
}

// register today form
function callApiCreateUserToDatabase(paramNewUser) {
    console.log(paramNewUser);
    $.ajax({
        type: "POST",
        url: gApiUrl + "/users",
        data: paramNewUser,
        contentType: "application/json; charset = utf-8",
        success: function (response) {
            alert("Create user successfully");
        },
        error: function (error) {
            alert("Error when create user");
            console.log(error.message);
        }
    })
}

// get quote form

function callApiCreateContactToDatabase(paramContactEmail) {
    console.log(paramContactEmail);
    $.ajax({
        type: "POST",
        url: gApiUrl + "/contacts",
        data: paramContactEmail,
        contentType: "application/json; charset = utf-8",
        success: function (response) {
            alert("Create contact successfully");
        },
        error: function (error) {
            alert("Error when create contact");
            console.log(error.message);
        }
    })
}