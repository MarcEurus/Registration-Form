document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    clearErrors();
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phoneNumber');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    
    let isValid = true;
    if (firstName.value.trim() === '') {
        showError(firstName, 'First Name is required');
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        showError(lastName, 'Last Name is required');
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    if (phone.value.trim() !== '' && !/^\d+$/.test(phone.value)) {
        showError(phone, 'Phone numbers only');
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 chars');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    if (!terms.checked) {
        const checkboxGroup = document.querySelector('.checkbox-group');
        showError(checkboxGroup, 'You must accept the terms', true);
        isValid = false;
    }

    if (isValid) {
        alert('Registration Successful!');
        document.getElementById('regForm').reset();
    }
});

function showError(input, message, isCheckbox = false) {
    const parent = isCheckbox ? input : input.parentElement;
    
    if(!isCheckbox) {
        input.classList.add('error-border');
    }

    const small = document.createElement('small');
    small.className = 'error-message';
    small.innerText = message;

    parent.appendChild(small);
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}