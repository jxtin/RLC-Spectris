function checkInput() {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;
    if (username == "" || password == "") {
        alert("Please fill in the blank");
        return false;
    }
}

function checkPasswordStrength() {
    var password = document.getElementsByName("password")[0].value;
    var strength = 0;
    if (password.length < 8) {
        submit.disabled = true;
        if (password.length >= 5) {
            // show alert saying password should be atleast 8 characters
            document.getElementById("passwordStrength").innerHTML = "Password less than 8 characters";
        }
    }
    // 3 levels of password strength Strong, Medium, Weak
    // weak : has only one of letters, numbers and characters
    // medium : has 2 of them
    // hard : has 3 of them
    // length has to be atleast 8 characters

    // check length
    length = password.length;
    if (length < 8) {
        document.getElementById("passwordStrength").innerHTML = "Password less than 8 characters";
    } else {
        strength++;
    }

    level_strength = 0;

    if (password.match(/[a-z]/)) {
        level_strength++;
    }
    if (password.match(/[A-Z]/)) {
        level_strength++;
    }
    if (password.match(/[0-9]/)) {
        level_strength++;
    }
    if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        level_strength++;
    }


    console.log(level_strength);
    // set text inside submit button as the weakness level, and submit button clickable only when level_strength is 4
    formatSubmitButton(level_strength);
}

// add event listener to password field
window.addEventListener("DOMContentLoaded", function () {
    document.getElementsByName("password")[0].addEventListener("keyup", checkPasswordStrength);
    // submit button should not be clickable until password strength is 4
    document.getElementsByName("submit")[0].disabled = true;
});

function formatSubmitButton(level_strength) {
    if (level_strength == 4) {
        document.getElementsByName("submit")[0].disabled = false;
    }
    else {
        document.getElementsByName("submit")[0].disabled = true;
    }

    hint = generateHint(document.getElementsByName("password")[0].value);

    if (level_strength == 0) {
        document.getElementById("passwordHelpInline").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Very Weak Password</div>";
    }

    if (level_strength == 1) {
        document.getElementById("passwordHelpInline").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Weak Password</div>";
    }
    else if (level_strength == 2) {
        document.getElementById("passwordHelpInline").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Medium Password</div>";
    }
    else if (level_strength == 3) {
        document.getElementById("passwordHelpInline").innerHTML = "<div class=\"alert alert-warning\" role=\"alert\">Strong Password</div>";
    }
    else if (level_strength == 4) {
        document.getElementById("passwordHelpInline").innerHTML = "<div class=\"alert alert-warning\" role=\"alert-success\">Very Strong Password</div>";
    }
    hint = generateHint(document.getElementsByName("password")[0].value);
    document.getElementById("passwordHint").innerHTML = "<div class=\"alert alert-info\" role=\"alert\">" + hint + "</div>";
    if (level_strength == 4) {
        document.getElementById("passwordHint").innerHTML = ""
    }

}


function generateHint(password) {
    hint = "";
    hint = "<ul>"
    if (password.length < 8) {
        hint += "<li>Password length should be atleast 8 characters</li>";
    }
    if (!password.match(/[a-z]/)) {
        hint += "<li>Password should contain atleast one lowercase letter</li>"
    }
    if (!password.match(/[A-Z]/)) {
        hint += "<li>Password should contain atleast one uppercase letter</li>"
    }
    if (!password.match(/[0-9]/)) {
        hint += "<li>Password should contain atleast one number</li>"
    }
    if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        hint += "<li>Password should contain atleast one special character</li>"
    }
    hint += "</ul>"
    return hint;
}