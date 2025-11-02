document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const successModal = document.getElementById("success-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  // Show modal function
  const showModal = () => {
    successModal.style.display = "flex";
    successModal.classList.add("animate-fadeIn");
  };

  // Hide modal function
  const hideModal = () => {
    successModal.classList.remove("animate-fadeIn");
    successModal.classList.add("animate-fadeOut");
    setTimeout(() => {
      successModal.style.display = "none";
      successModal.classList.remove("animate-fadeOut");
    }, 400);
  };

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Reset errors
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    // Validation
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      valid = false;
    }

    if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
    }

    if (!/^[0-9]{10}$/.test(phoneInput.value.trim())) {
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    // Show modal if valid
    if (valid) {
      showModal();
      form.reset();
    }
  });

  // Close modal on button click
  closeModalBtn.addEventListener("click", hideModal);

  // Close modal if background is clicked
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) hideModal();
  });
});
