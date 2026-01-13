// ===== WISHLIST SYSTEM =====

// Get wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Add item to wishlist
function addToWishlist(item) {
  const wishlist = getWishlist();

  // Prevent duplicate items
  const exists = wishlist.some(product => product.name === item.name);
  if (!exists) {
    wishlist.push(item);
    saveWishlist(wishlist);
    alert("Added to wishlist ❤️");
  } else {
    alert("Already in wishlist!");
  }
}

// Event listener for wishlist buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".wishlist-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const item = {
        name: button.dataset.name,
        image: button.dataset.image
      };
      addToWishlist(item);
    });
  });
});

const container = document.getElementById("wishlist-container");

if (container) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty 💔</p>";
  } else {
    wishlist.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <button onclick="removeItem(${index})">Remove</button>
      `;

      container.appendChild(card);
    });
  }
}


// Remove item
function removeItem(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

    // CONTACT FORM - clear/hide after returning from external submission
    window.addEventListener("pageshow", function (event) {
      // event.persisted covers bfcache, navigation.type === 2 covers "back" in older browsers
      if (event.persisted || (window.performance && performance.navigation && performance.navigation.type === 2)) {
        const forms = document.querySelectorAll('form#contact-form, form.contact-form');
        forms.forEach(form => {
          // prevent inserting duplicate message
          if (form.nextElementSibling && form.nextElementSibling.classList && form.nextElementSibling.classList.contains('contact-thanks')) {
            return;
          }
  
          // clear inputs
          form.querySelectorAll('input, textarea, select').forEach(el => {
            if (el.type === 'hidden') return;
            if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
            else el.value = '';
          });
  
          // hide the form (or remove it)
          form.style.display = 'none';
  
          // show thank-you message
          const thanks = document.createElement('div');
          thanks.className = 'contact-thanks';
          thanks.textContent = 'Thank you — your message was submitted.';
          // simple inline style (you can move to CSS)
          thanks.style.marginTop = '12px';
          thanks.style.color = '#0a7d3a';
          thanks.style.fontWeight = '600';
          form.parentNode.insertBefore(thanks, form.nextSibling);
        });
      }
    });
 
  // EMAIL
  const emailBtn = document.getElementById('email-btn');
  if (emailBtn) emailBtn.onclick = () => window.location.href = 'mailto:dealoriacorp@gmail.com';


// ===== HOVER SLIDESHOW FOR BAGS & BOTTLES =====
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".product-card.slideshow").forEach(card => {
    const imgEl = card.querySelector(".slideshow-img");
    const images = JSON.parse(card.dataset.images);

    let index = 0;
    let interval = null;

    card.addEventListener("mouseenter", () => {
      if (interval) return; // prevent stacking

      interval = setInterval(() => {
        index = (index + 1) % images.length;
        imgEl.src = images[index];
      }, 800);
    });

    card.addEventListener("mouseleave", () => {
      clearInterval(interval);
      interval = null;
      index = 0;
      imgEl.src = images[0];
    });
  });

});

