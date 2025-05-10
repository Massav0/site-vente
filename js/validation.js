/**
 * Form validation for payment page
 */

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Card number validation (checks for valid format, not actual validation)
const cardNumberRegex = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;

// Expiry date validation (MM/YY format)
const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

// CVV validation (3 or 4 digits)
const cvvRegex = /^[0-9]{3,4}$/;

// Display error message
function showError(elementId, message) {
  const errorElement = document.getElementById(`${elementId}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    document.getElementById(elementId).classList.add('error');
  }
}

// Clear error message
function clearError(elementId) {
  const errorElement = document.getElementById(`${elementId}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    document.getElementById(elementId).classList.remove('error');
  }
}

// Check if the current date is after the expiry date
function isCardExpired(expiryValue) {
  const parts = expiryValue.split('/');
  const month = parseInt(parts[0], 10);
  let year = parseInt(parts[1], 10);
  
  // Convert 2-digit year to 4-digit year
  year = 2000 + year;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  
  // Check if the card is expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return true;
  }
  
  return false;
}

// Validate the entire form
function validateForm(event) {
  event.preventDefault();
  let isValid = true;
  
  // First name validation
  const firstnameInput = document.getElementById('firstname');
  if (firstnameInput && firstnameInput.value.trim() === '') {
    showError('firstname', 'Le prénom est requis');
    isValid = false;
  } else if (firstnameInput) {
    clearError('firstname');
  }
  
  // Last name validation
  const lastnameInput = document.getElementById('lastname');
  if (lastnameInput && lastnameInput.value.trim() === '') {
    showError('lastname', 'Le nom est requis');
    isValid = false;
  } else if (lastnameInput) {
    clearError('lastname');
  }
  
  // Email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    if (emailInput.value.trim() === '') {
      showError('email', 'L\'email est requis');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError('email', 'Veuillez entrer un email valide');
      isValid = false;
    } else {
      clearError('email');
    }
  }
  
  
  // Terms validation
  const termsInput = document.getElementById('terms');
  if (termsInput && !termsInput.checked) {
    showError('terms', 'Vous devez accepter les conditions générales');
    isValid = false;
  } else if (termsInput) {
    clearError('terms');
  }
  
  // If the form is valid, redirect to the upsell page
  if (isValid) {
    window.location.href = 'upsell.html';
  }
  
  return false;
}


 