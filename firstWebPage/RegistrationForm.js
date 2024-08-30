const form = document.getElementById('form');
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const phoneNumberElement = document.getElementById("phoneNumber");
const addressElement = document.querySelector("#address");
const districtElement = document.getElementById("district");
const dateElement = document.getElementById("dateOfBirth");
const genderElement = document.getElementById("gender");
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function validateRegistrationForm() {
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    let district = districtElement.value.trim();
    let dateOfBirth = dateElement.value.trim();
    let phoneNumberFlag = validatePhoneNumber(phoneNumber);
    let firstNameFlag = validateName(firstName, "firstName");
    let lastNameFlag = validateName(lastName, "lastName");
    let addressFlag = validateAddress(address);
    let districtFlag = validateDistrict(district);
    let dateFlag = validateDate(dateOfBirth);
    let genderFlag = validateGender();
    if (phoneNumberFlag && firstNameFlag && lastNameFlag && addressFlag && dateFlag) {
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
    let reg = /^[a-zA-Z ]{2,30}$/;
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

function getFormDetails() {
    validateRegistrationForm();
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    let district = districtElement.value.trim();
    let dateOfBirth = dateElement.value.trim();
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("dateOfBirth", dateOfBirth);
    localStorage.setItem("address", address);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("district", district);
}

