const form = document.getElementById('form');
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const phoneNumberElement = document.getElementById("phoneNumber");
const addressElement = document.querySelector("#address");
const districtElement = document.getElementById("district");
const dateElement = document.getElementById("dateOfBirth");

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function validateRegistrationForm() {
    const firstName = firstNameElement.value.trim();
    const lastName = lastNameElement.value.trim();
    const phoneNumber = phoneNumberElement.value.trim();
    const address = addressElement.value.trim();
    const district = districtElement.value.trim();
    const dateOfBirth = dateElement.value.trim();
    const phoneNumberFlag = validatePhoneNumber(phoneNumber);
    const firstNameFlag = validateName(firstName, "firstName");
    const lastNameFlag = validateName(lastName, "lastName");
    const addressFlag = validateAddress(address);
    const districtFlag = validateDistrict(district);
    const dateFlag = validateDate(dateOfBirth);
    const genderFlag = validateGender();
    if (phoneNumberFlag && firstNameFlag && lastNameFlag && addressFlag && dateFlag && genderFlag && districtFlag) {
        form.submit();
    }
}

function indicationForValidation(element, message) {
    const inputcontrol = element.parentElement;
    const errorElement = inputcontrol.querySelector(".error");
    if (message == "success") {
        errorElement.innerText = "";
        inputcontrol.classList.add('successFunction');
        inputcontrol.classList.remove('errorFunction');
    } else {
        errorElement.innerText = message;
        inputcontrol.classList.add('errorFunction');
        inputcontrol.classList.remove('successFunction');
    }
}

function validateName(name, text) {
    const reg = /^[a-zA-Z ]{2,30}$/;
    if (text == "firstName") {
        if (!reg.test(name)) {
            indicationForValidation(firstNameElement, "Invalid First Name");
            return false;
        } else {
            indicationForValidation(firstNameElement, "success");
            return true;
        }
    } else if (text == "lastName") {
        if (!reg.test(name)) {
            indicationForValidation(lastNameElement, "Invalid Last Name");
            return false;
        } else {
            indicationForValidation(lastNameElement, "success");
            return true;
        }
    }
}

function validateDate(dateIfBirth) {
    if (dateIfBirth == "") {
        indicationForValidation(dateElement, "Date of birth required");
        return false;
    } else {
        indicationForValidation(dateElement, "success");
        return true;
    }
}

function validatePhoneNumber(phoneNumber) {
    if (10 != phoneNumber.length) {
        indicationForValidation(phoneNumberElement, "Invalid Phone Number");
        return false;
    } else {
        indicationForValidation(phoneNumberElement, "success");
        return true;
    }
}

function validateAddress(address) {
    if (address == "") {
        indicationForValidation(addressElement, "Invalid Address");
        return false;
    } else {
        indicationForValidation(addressElement, "success");
        return true;
    }
}

function validateDistrict(district) {
    if (district == "") {
        indicationForValidation(districtElement, "Select District");
        return false;
    } else {
        indicationForValidation(districtElement, "success");
        return true;
    }
}

function validateLogin(event) {
    const userNameInput = document.getElementById("user-name-login").value;
    const passwordInput = document.getElementById("password-login").value;
    const loginForm = document.getElementById("login-form").value;
    if ("Username" === userNameInput && "PasswordLogin" === passwordInput) {
        loginForm.submit();
    } else {
        event.preventDefault();
        const loginError = document.getElementById("login-error");
        loginError.innerHTML = "Invalid Username / password";
    }
}

function validateGender() {
    const genderElementFemale = document.getElementById("gender-female");
    const genderElementMale = document.getElementById("gender-male");
    if (genderElementFemale.checked) {
        indicationForValidation(genderElementFemale, "success");
        return true;
    } else if (genderElementMale.checked) {
        indicationForValidation(genderElementMale, "success");
        return true;
    } else {
        indicationForValidation(genderElementFemale, "Select gender");
        return false;
    }
}

function getFormDetails() {
    validateRegistrationForm();
    let gender;
    const firstName = firstNameElement.value.trim();
    const lastName = lastNameElement.value.trim();
    const phoneNumber = phoneNumberElement.value.trim();
    const address = addressElement.value.trim();
    const district = districtElement.value.trim();
    const dateOfBirth = dateElement.value.trim();
    if (document.getElementById("gender-female").checked) {
        gender = document.getElementById("gender-female").value;
    } else {
        gender = document.getElementById("gender-male").value;
    }
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("dateOfBirth", dateOfBirth);
    localStorage.setItem("address", address);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("district", district);
    localStorage.setItem("gender", gender);
}

(function () {
    document.getElementById("first-name").innerHTML = localStorage.getItem("firstName");
    document.getElementById("last-name").innerHTML = localStorage.getItem("lastName");
    document.getElementById("date-Of-Birth").innerHTML = localStorage.getItem("dateOfBirth");
    document.getElementById("gender").innerHTML = localStorage.getItem("gender");
    document.getElementById("address").innerHTML = localStorage.getItem("address");
    document.getElementById("phone-number").innerHTML = localStorage.getItem("phoneNumber");
    document.getElementById("district").innerHTML = localStorage.getItem("district");
})()