/**
 * JavaScript for Thank You page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check URL parameters to see if upsell was purchased
  const urlParams = new URLSearchParams(window.location.search);
  const upsellPurchased = urlParams.get('upsell') === 'true';
  
  // Update order information if upsell was purchased
  if (upsellPurchased) {
    // Show the upsell product in the order summary
    const upsellProduct = document.getElementById('upsell-product');
    if (upsellProduct) {
      upsellProduct.classList.remove('hidden');
    }
    
    // Show coaching instructions
    const coachingInstructions = document.getElementById('coaching-instructions');
    if (coachingInstructions) {
      coachingInstructions.classList.remove('hidden');
    }
    
    // Update total amount
    const totalElement = document.getElementById('order-total');
    if (totalElement) {
      totalElement.textContent = '74€';
    }
  }
  
  // Generate a random order ID
  const orderIdElement = document.getElementById('order-id');
  if (orderIdElement) {
    const randomOrderId = 'FC-' + generateRandomOrderId();
    orderIdElement.textContent = randomOrderId;
  }
  
  // Set current date
  const orderDateElement = document.getElementById('order-date');
  if (orderDateElement) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    orderDateElement.textContent = `${day}/${month}/${year}`;
  }
  
  // Add click event to download button
  const downloadButton = document.querySelector('.download-button');
  if (downloadButton) {
    downloadButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show download confirmation
      alert('Votre ebook a été téléchargé avec succès!');
    });
  }
  
  // Add submit handler for newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== '') {
        // Clear the input
        emailInput.value = '';
        
        // Show confirmation
        alert('Merci pour votre inscription à notre newsletter!');
      }
    });
  }
});

// Generate a random order ID
function generateRandomOrderId() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return timestamp + '-' + random;
}

// Add fade-in animation for elements as they come into view
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.product-item, .instruction-item, .step-item');
  
  if ('IntersectionObserver' in window && elements.length > 0) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      appearOnScroll.observe(element);
    });
  }
}

// Add CSS animation to new elements
document.addEventListener('DOMContentLoaded', function() {
  setupScrollAnimations();
  
  // Add transition class to elements
  document.querySelectorAll('.animate-in').forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
});