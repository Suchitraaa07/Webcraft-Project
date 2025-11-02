document.addEventListener("DOMContentLoaded", function() {

  // --- 1. Load Navbar ---
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });

  // --- 2. Load Footer ---
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // --- 3. Scroll-Reveal Animation for 'About' Section ---
  const aboutSection = document.getElementById("about-section");
  if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("is-visible");
          observer.unobserve(aboutSection);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(aboutSection);
  }

  // --- 4. Schedule Tab Logic (MOVED FROM schedule.js) ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  
  if (tabButtons.length > 0) { // Check if tabs exist on this page
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        
        button.classList.add("active");
        const day = button.dataset.day;
        document.getElementById(day).classList.add("active");
      });
    });
  }

    // --- 1. SCHEDULE TAB LOGIC (DUPLICATE SAFE) ---
    // Already present above, so not repeated.

    // --- 2. FORM VALIDATION & POP-UP LOGIC ---

      const successModal = document.getElementById("success-modal");
      const closeModalBtn = document.getElementById("close-modal-btn");

      // Input fields
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const phoneInput = document.getElementById("phone");

      // Error message fields
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const phoneError = document.getElementById("phone-error");

      // --- 2. FORM VALIDATION & POP-UP LOGIC ---
      if (form) {
        form.addEventListener("submit", function(event) {
          event.preventDefault(); 
          // Start by assuming the form is valid
          let isValid = true; 
          // Reset errors
          nameError.textContent = "";
          emailError.textContent = "";
          phoneError.textContent = "";
          // Validate Name
          if (nameInput.value.trim() === "") {
            nameError.textContent = "Full Name is required.";
            isValid = false;
          }
          // Validate Email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
          }
          // Validate Phone
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(phoneInput.value)) {
            phoneError.textContent = "Please enter a valid 10-digit phone number.";
            isValid = false;
          }
          // --- This is the final check ---
          // Only show the pop-up if 'isValid' is still true
          if (isValid && successModal) {
            successModal.style.display = "flex";
          }
        });
      }

    // --- 3. MODAL CLOSE LOGIC ---
    if (closeModalBtn && successModal) {
      closeModalBtn.addEventListener("click", function() {
        successModal.style.display = "none";
      });
    }

  // --- 5. Form Validation Logic (MOVED FROM contact.js) ---
  const form = document.getElementById("registration-form");
  if (form) { // Check if form exists on this page
    const formWrapper = document.getElementById("form-wrapper");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");

    form.addEventListener("submit", function(event) {
      event.preventDefault(); 
      let isValid = true;
      
      // Reset errors
      nameError.textContent = "";
      emailError.textContent = "";
      phoneError.textContent = "";
      nameInput.classList.remove("border-red-500");
      emailInput.classList.remove("border-red-500");
      phoneInput.classList.remove("border-red-500");

      // Name Validation
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Full Name is required.";
        nameInput.classList.add("border-red-500");
        isValid = false;
      }
      
      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("border-red-500");
        isValid = false;
      }
      
      // Phone Validation
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        phoneError.textContent = "Please enter a valid 10-digit phone number.";
        phoneInput.classList.add("border-red-500");
        isValid = false;
      }

      // Show Success
      if (isValid) {
        formWrapper.innerHTML = `
          <div class="text-center p-10 bg-gray-900 rounded-lg shadow-xl">
            <h2 class="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
            <p class="text-gray-300 text-lg">Thank you, ${nameInput.value}. We've received your registration.</p>
            <p class="text-gray-400 mt-2">A confirmation email will be sent to ${emailInput.value}.</p>
          </div>
        `;
      }
    });
  }
  });