const form = document.getElementById('form');
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const phoneNumberElement = document.getElementById("phoneNumber");
const addressElement = document.querySelector("#address");
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.submit();
    })
}

function myValidate() {
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    let address = addressElement.value.trim();
    validatePhoneNumber(phoneNumber);
    validateName(firstName, "firstName");
    validateName(lastName, "lastName");
    validateAddress(address);

}

function setError(element, message) {
    const inputcontrol = element.parentElement;
    const errorElement = inputcontrol.querySelector(".error");
    errorElement.innerText = message;
    inputcontrol.classList.add('errorFunction');
    inputcontrol.classList.remove('successFunction');
}

function setSuccess(element) {
    const inputcontrol = element.parentElement;
    const errorElement = inputcontrol.querySelector(".error");
    errorElement.innerText = "";
    inputcontrol.classList.add('successFunction');
    inputcontrol.classList.remove('errorFunction');
}

function validatePhoneNumber(phoneNumber) {
    if (10 != phoneNumber.length) {
        setError(phoneNumberElement, "invalid Phone Number");
    }
    else {
        setSuccess(phoneNumberElement);
    }
}

function validateName(name, text) {
    let reg = /^[a-zA-Z ]{2,30}$/;
    if (text == "firstName") {
        if (!reg.test(name)) {
            setError(firstNameElement, "Invalid First Name");
        }
        else {
            setSuccess(firstNameElement);
        }
    }
    else if (text == "lastName") {
        if (!reg.test(name)) {
            setError(lastNameElement, "Invalid Last Name");
        }
        else {
            setSuccess(lastNameElement);
        }
    }
}

function validateAddress(address) {
    if (address == "") {
        setError(addressElement, "Invalid Address");
    }
    else {
        setSuccess(addressElement);
    }
}