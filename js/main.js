/**
 * Main JavaScript for the Ebook Sales Funnel
 */

// Handle FAQ toggle functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
    const toggle = item.querySelector('.faq-toggle');
    toggle.textContent = '+';
  });
  
  // If the clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add('active');
    const toggle = faqItem.querySelector('.faq-toggle');
    toggle.textContent = '×';
  }
}

// Format credit card number with spaces
function formatCardNumber() {
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s+/g, '');
      value = value.replace(/[^0-9]/gi, '');
      
      const formattedValue = [];
      for (let i = 0; i < value.length; i += 4) {
        formattedValue.push(value.substr(i, 4));
      }
      
      e.target.value = formattedValue.join(' ').trim();
    });
  }
}

// Format expiry date as MM/YY
function formatExpiryDate() {
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s+/g, '');
      value = value.replace(/[^0-9]/gi, '');
      
      if (value.length > 2) {
        value = value.substr(0, 2) + '/' + value.substr(2, 2);
      }
      
      e.target.value = value;
    });
  }
}

// Add smooth scrolling to all links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Initialize Intersection Observer for fade-in animations
function setupScrollAnimations() {
  const fadeElements = document.querySelectorAll('.chapter, .testimonial, .product-item, .step-item');
  
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    
    fadeElements.forEach(element => {
      element.classList.add('fade-element');
      appearOnScroll.observe(element);
    });
  }
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Setup form formatting
  formatCardNumber();
  formatExpiryDate();
  
  // Setup smooth scrolling
  setupSmoothScrolling();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Add current year to copyright in footer
  const copyrightElements = document.querySelectorAll('.copyright');
  if (copyrightElements.length > 0) {
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(element => {
      element.textContent = element.textContent.replace('2025', currentYear);
    });
  }
});