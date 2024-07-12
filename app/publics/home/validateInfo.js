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
    alert("Phone number is valid");
    return true;

}

function validateEmail(paramEmail) {
    
    // var regexEmailSyntax = /\S+@\S+\.\S+/;
    
    var regexEmailSyntax = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmailSyntax.test(paramEmail)) {
        alert("Email is invalid");
        return false;

    };
    alert("Email is valid");
    return true;
}

export { validatePhone, validateEmail };
