const form = document.getElementById('form-registration');
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const phoneNumberElement = document.getElementById("phoneNumber");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("test");
    myValidate();
})

function myValidate() {
    let counter = 0;
    let reg= /^[a-zA-Z ]{2,30}$/;
    let firstName = firstNameElement.value.trim();
    let lastName = lastNameElement.value.trim();
    let phoneNumber = phoneNumberElement.value.trim();
    if (10 != phoneNumber.length) {
        setErrorMessage(phoneNumberElement, "invalid Phone Number");
    }
    else {
        setSuccess(phoneNumberElement);
    }
    if ( !reg.test(firstName)) {
        setErrorMessage(firstNameElement, "invalid name");
    }
    else {
        setSuccess(firstNameElement);
    }
}

function setErrorMessage(element, message) {
    const inputcontrol = element.parentElement;
    const errorElement = inputcontrol.querySelector(".error");
    console.log(errorElement);
    errorElement.innerText = message;
    inputcontrol.classList.add('error');
    inputcontrol.classList.remove('success');
}

function setSuccess(element) {
    const inputcontrol = element.parentElement;
    const errorElement = inputcontrol.querySelector(".error");
    errorElement.innerText = "";
    inputcontrol.classList.add('success');
    inputcontrol.classList.remove('error');
}