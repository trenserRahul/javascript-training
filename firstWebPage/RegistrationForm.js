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
        form.submit();
    })
}

function validateRegistrationForm() {
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    let district = districtElement.value.trim();
    let dateOfBirth = dateElement.value.trim();
    validatePhoneNumber(phoneNumber);
    validateName(firstName, "firstName");
    validateName(lastName, "lastName");
    validateAddress(address);
    validateDistrict(district);
    validateDate(dateOfBirth);
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
        } else {
            indicationForValidation(firstNameElement, "success");

        }
    } else if (text == "lastName") {
        if (!reg.test(name)) {
            indicationForValidation(lastNameElement, "Invalid Last Name");
        } else {
            indicationForValidation(lastNameElement, "success");
        }
    }
}

function validateDate(dateIfBirth) {
    if (dateIfBirth == "") {
        indicationForValidation(dateElement, "Date of birth required");
    } else {
        indicationForValidation(dateElement, "success");
    }
}

function validatePhoneNumber(phoneNumber) {
    if (10 != phoneNumber.length) {
        indicationForValidation(phoneNumberElement, "Invalid Phone Number");
    } else {
        indicationForValidation(phoneNumberElement, "success");
    }
}

function validateAddress(address) {
    if (address == "") {
        indicationForValidation(addressElement, "Invalid Address");
    } else {
        indicationForValidation(addressElement, "success");
    }
}

function validateDistrict(district) {
    if (district == "") {
        indicationForValidation(districtElement, "Select District");
    } else {
        indicationForValidation(districtElement, "success");
    }
}

function getFormDetails() {
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    let district = districtElement.value.trim();
    let dateOfBirth = dateElement.value.trim();
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("dateOfBirth", dateOfBirth);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("phoneNumber", phoneNumber);
    sessionStorage.setItem("district", district);
}
