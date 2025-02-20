// Sample Providers Data with images
const providers = [
  {
    name: "Glamour Studio",
    location: "Cape Town",
    image: "https://i.postimg.cc/tgPwJmKz/women-wearing-beautiful-nail-polish.jpg", // Update with actual image path
    services: [
      { name: "Mobile Manicure", duration: "60min", price: 350 },
      { name: "Express Pedicure", duration: "45min", price: 300 }
    ],
    rating: 4.5,
  },
  {
    name: "Gentleman's Grooming",
    location: "Stellenbosch",
    image: "https://i.postimg.cc/WbWQHZm0/latino-hair-salon-owner-taking-care-client.jpg", // Update with actual image path
    services: [
      { name: "Beard Trim", duration: "45min", price: 200 },
      { name: "Hot Towel Shave", duration: "30min", price: 150 }
    ],
    rating: 5,
  },
  {
    name: "Skin Bliss",
    location: "Somerset West",
    image: "https://i.postimg.cc/g2xfF04Q/indoor-image-beauty-salon-one-woman-making-pedicure-other-one-worker-beauty-industry-nail-service-de.jpg", // Update with actual image path
    services: [
      { name: "Deep Cleansing Facial", duration: "90min", price: 500 }
    ],
    rating: 4,
  },
];

// Simulated user and booking data
let currentUser = null; // {name, email, role}
let bookings = [];

// Initialize service grid on page load
window.onload = function() {
  initServices();
  checkUserSession();
};

// Populate the service grid
function initServices() {
  const grid = document.getElementById('services');
  grid.innerHTML = '';
  providers.forEach(provider => {
    provider.services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <img src="${provider.image}" alt="${provider.name}" class="provider-image">
        <h3>${service.name}</h3>
        <p>${service.duration} | R${service.price}</p>
        <p><strong>Provider:</strong> ${provider.name}</p>
        <p class="rating">Rating: ${provider.rating} ★</p>
      `;
      card.addEventListener('click', () => openSupplierModal(provider));
      grid.appendChild(card);
    });
  });
}

// Filter services
function applyFilters() {
  const locationFilter = document.getElementById('locationFilter').value;
  const ratingFilter = document.getElementById('ratingFilter').value;
  const searchQuery = document.getElementById('search').value.toLowerCase();

  const filteredProviders = providers.filter(provider => {
    const matchesLocation = !locationFilter || provider.location === locationFilter;
    const matchesRating = !ratingFilter || provider.rating >= parseFloat(ratingFilter);
    const matchesSearch = provider.services.some(service =>
      service.name.toLowerCase().includes(searchQuery)
    );
    return matchesLocation && matchesRating && matchesSearch;
  });

  const grid = document.getElementById('services');
  grid.innerHTML = '';
  filteredProviders.forEach(provider => {
    provider.services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <img src="${provider.image}" alt="${provider.name}" class="provider-image">
        <h3>${service.name}</h3>
        <p>${service.duration} | R${service.price}</p>
        <p><strong>Provider:</strong> ${provider.name}</p>
        <p class="rating">Rating: ${provider.rating} ★</p>
      `;
      card.addEventListener('click', () => openSupplierModal(provider));
      grid.appendChild(card);
    });
  });
}

// Open modal by id
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

// Open Supplier Details Modal
function openSupplierModal(provider) {
  document.getElementById('supplierName').textContent = provider.name;
  document.getElementById('supplierLocation').textContent = `Location: ${provider.location}`;
  document.getElementById('supplierRating').textContent = `Rating: ${provider.rating} ★`;
  
  // Populate available services list
  const serviceList = document.getElementById('supplierServicesList');
  serviceList.innerHTML = '';
  provider.services.forEach(service => {
    const li = document.createElement('li');
    li.textContent = `${service.name} (${service.duration} | R${service.price})`;
    serviceList.appendChild(li);
  });
  
  // Save selected provider details for booking
  document.getElementById('bookingProvider').value = provider.name;
  // Populate booking service options
  const bookingServiceSelect = document.getElementById('bookingService');
  bookingServiceSelect.innerHTML = '';
  provider.services.forEach(service => {
    const option = document.createElement('option');
    option.value = service.name;
    option.textContent = `${service.name} (R${service.price})`;
    bookingServiceSelect.appendChild(option);
  });
  
  openModal('supplierModal');
}

// Open Booking Modal directly (from navbar)
function openBookingModal() {
  // If a provider has been selected previously, bookingService is already populated.
  // Otherwise, prompt user to select a provider via supplier details.
  if (!document.getElementById('bookingProvider').value) {
    alert('Please select a service provider first by clicking on a service card.');
    return;
  }
  closeModal('supplierModal');
  openModal('bookingModal');
}

// Open Booking Modal from supplier modal button
function openBookingModalFromSupplier() {
  closeModal('supplierModal');
  openModal('bookingModal');
}

// Handle Booking Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const service = document.getElementById('bookingService').value;
  const provider = document.getElementById('bookingProvider').value;
  const dateTime = document.getElementById('dateTime').value;
  const location = document.getElementById('bookingLocation').value;
  
  // Save booking (simulate API call)
  const booking = { service, provider, dateTime, location };
  bookings.push(booking);
  
  alert(`Booking Confirmed!\nService: ${service}\nProvider: ${provider}\nDate & Time: ${dateTime}\nLocation: ${location}`);
  document.getElementById('bookingForm').reset();
  closeModal('bookingModal');
  updateProfileBookings();
});

// Login Modal functions
function openLoginModal() {
  openModal('loginModal');
}
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  // Simulate login process (in production, validate via API)
  currentUser = { name: "John Doe", email, role: "user" };
  alert('Login successful!');
  closeModal('loginModal');
  updateProfileSection();
});

// Signup Modal functions
function openSignupModal() {
  openModal('signupModal');
}
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const role = document.getElementById('signupRole').value;
  // Simulate signup process (store user in database in production)
  currentUser = { name, email, role };
  alert('Signup successful!');
  closeModal('signupModal');
  updateProfileSection();
});

// Profile Section functions
function openProfileSection() {
  if (!currentUser) {
    alert('Please login to view your profile.');
    openLoginModal();
    return;
  }
  document.getElementById('profile').classList.remove('hidden');
  scrollToSection('profile');
  updateProfileSection();
}
function updateProfileSection() {
  if (currentUser) {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role;
    updateProfileBookings();
  }
}
function updateProfileBookings() {
  const bookingList = document.getElementById('bookingList');
  bookingList.innerHTML = '';
  if (bookings.length === 0) {
    bookingList.innerHTML = '<li>No bookings yet.</li>';
  } else {
    bookings.forEach(b => {
      const li = document.createElement('li');
      li.textContent = `${b.service} with ${b.provider} on ${new Date(b.dateTime).toLocaleString()} at ${b.location}`;
      bookingList.appendChild(li);
    });
  }
}

// Logout function
function logout() {
  currentUser = null;
  bookings = [];
  document.getElementById('profile').classList.add('hidden');
  alert('You have been logged out.');
}

// Utility function to scroll to sections
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Simulated check for an active user session (e.g., from localStorage)
function checkUserSession() {
  // For simulation, we'll assume no active session on load.
}
