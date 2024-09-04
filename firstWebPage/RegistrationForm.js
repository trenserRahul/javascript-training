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
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    let district = districtElement.value.trim();
    let dateOfBirth = dateElement.value.trim();
    if (document.getElementById("gender-female").checked) {
        gender = document.getElementById("gender-female").value;
    } else {
        gender = document.getElementById("gender-male").value;
        console.log(gender);
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