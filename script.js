const productCards = [...document.querySelectorAll('.product-card')];
const categoryButtons = [...document.querySelectorAll('.category-card')];
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const emptyState = document.getElementById('emptyState');
const viewAllButton = document.getElementById('viewAll');

let activeCategory = '';

function filterProducts() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let matches = 0;

  productCards.forEach((card) => {
    const matchesSearch = card.dataset.search.includes(query);
    const matchesCategory =
      !activeCategory ||
      card.dataset.category.includes(activeCategory);

    const shouldShow = matchesSearch && matchesCategory;

    card.style.display = shouldShow ? '' : 'none';

    if (shouldShow) {
      matches++;
    }
  });

  emptyState.style.display = matches ? 'none' : 'block';
}

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  activeCategory = '';

  categoryButtons.forEach((button) => {
    button.classList.remove('active');
  });

  filterProducts();

  document.getElementById('products').scrollIntoView({
    behavior: 'smooth'
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const chosenCategory = button.dataset.category;

    activeCategory =
      activeCategory === chosenCategory ? '' : chosenCategory;

    categoryButtons.forEach((item) => {
      item.classList.toggle(
        'active',
        item.dataset.category === activeCategory
      );
    });

    filterProducts();

    document.getElementById('products').scrollIntoView({
      behavior: 'smooth'
    });
  });
});

viewAllButton?.addEventListener('click', () => {
  activeCategory = '';
  searchInput.value = '';

  categoryButtons.forEach((button) => {
    button.classList.remove('active');
  });

  filterProducts();
});

document.querySelectorAll('.bookmark').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('saved');

    button.setAttribute('aria-pressed', String(button.classList.contains('saved')));
    button.textContent = button.classList.contains('saved')
      ? '♥'
      : '♡';
  });
});

const modal = document.getElementById('actionModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('[data-modal-title]').forEach((button) => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.modalTitle;
    modalText.textContent = button.dataset.modalText;

    modal.classList.add('open');

    document.getElementById('email').focus();
  });
});

function hideModal() {
  modal?.classList.remove('open');
}

closeModal?.addEventListener('click', hideModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

document
  .getElementById('demoForm')
  ?.addEventListener('submit', (event) => {
    event.preventDefault();

    modalText.textContent =
      'Demo submitted successfully. Connect this form to your backend when ready.';

    event.target.reset();
  });
// Additional multi-page functionality
const $ = (s) => document.querySelector(s);
let toastTimer;
function notify(message) { const box = $('#toast'); box.textContent = message; box.style.display = 'block'; clearTimeout(toastTimer); toastTimer = setTimeout(() => box.style.display = 'none', 5000); }
document.querySelectorAll('.save').forEach(button => button.addEventListener('click', () => { const saved = button.getAttribute('aria-pressed') !== 'true'; button.setAttribute('aria-pressed', saved); notify(saved ? 'Saved for this visit.' : 'Removed from saved items.'); }));
const grid = $('.grid');
const originalCards = grid ? [...grid.children] : [];
function filterCards() {
 const search = ($('#search')?.value || $('#model-search')?.value || '').toLowerCase().trim();
 const categories = [...document.querySelectorAll('input[name=category]:checked')].map(i => i.value);
 const make = $('select[name=make]')?.value;
 const max = $('#max-price')?.value;
 let count = 0;
 originalCards.forEach(card => { const visible = (card.dataset.search || card.dataset.name || '').includes(search) && (!categories.length || categories.includes(card.dataset.category)) && (!make || make === 'All makes' || make === card.dataset.category) && (!max || Number(card.dataset.price) <= Number(max)); card.hidden = !visible; if (visible) count++; });
 const sort = ($('#sort') || $('#car-sort'))?.value;
 const ordered = [...originalCards];
 if (sort === 'low') ordered.sort((a,b) => a.dataset.price - b.dataset.price);
 if (sort === 'high') ordered.sort((a,b) => b.dataset.price - a.dataset.price);
 ordered.forEach(card => grid.append(card));
 if ($('#empty')) $('#empty').hidden = count > 0;
 const resultCount = $('.results .pagination .muted');
 if (resultCount) resultCount.textContent = `${count} of ${originalCards.length} sample listings`;
}
document.querySelectorAll('#search,#model-search,#max-price,#sort,#car-sort,input[name=category],select[name=make]').forEach(input => input.addEventListener('input',filterCards));
$('#clear')?.addEventListener('click', () => { document.querySelectorAll('input[name=category]').forEach(i => i.checked = false); $('#max-price').value = ''; $('#search').value = ''; $('#sort').value = 'default'; filterCards(); });
$('#photos')?.addEventListener('change', e => { $('#previews').replaceChildren(); [...e.target.files].filter(f => f.type.startsWith('image/')).forEach(file => { const img = document.createElement('img'); img.alt = file.name; img.src = URL.createObjectURL(file); img.onload = () => URL.revokeObjectURL(img.src); $('#previews').append(img); }); });
$('#sell-form')?.addEventListener('submit', e => { e.preventDefault(); const data = new FormData(e.target); const target = $('#review-content'); target.replaceChildren(); ['item','category','description','price','fitment','location'].forEach(key => { const line = document.createElement('p'); line.textContent = key.toUpperCase() + ': ' + data.get(key); target.append(line); }); $('#review').showModal(); });
$('#close-review')?.addEventListener('click', () => $('#review').close());
$('#login-form')?.addEventListener('submit', e => { e.preventDefault(); notify('Demo only: connect a backend to enable login.'); });
const confirmField = $('input[name=confirm]');
function matchPasswords() { if (confirmField) confirmField.setCustomValidity(confirmField.value !== $('input[name=password]').value ? 'Passwords must match.' : ''); }
confirmField?.addEventListener('input',matchPasswords);
if (confirmField) $('input[name=password]').addEventListener('input',matchPasswords);
$('#signup-form')?.addEventListener('submit', e => { e.preventDefault(); notify('Details validated. This demo does not create an account.'); });


document.querySelectorAll('.nav-links a').forEach(link => { if(link.getAttribute('href') === location.pathname.split('/').pop()) link.setAttribute('aria-current','page'); });
const categoryFromLink = new URLSearchParams(location.search).get('category');
if ($('#max-price') && categoryFromLink) {
 const mapping = {car:'Car Parts & Gear', moto:'Motorcycle Components', accessories:'Motorcycle Accessories'};
 document.querySelectorAll('input[name=category]').forEach(input => input.checked = input.value === mapping[categoryFromLink]);
 filterCards();
}
$('#add-build')?.addEventListener('click', () => $('#build-dialog').showModal());
$('#cancel-build')?.addEventListener('click', () => $('#build-dialog').close());
$('#build-form')?.addEventListener('submit', event => {
 event.preventDefault();
 const data = new FormData(event.target);
 const file = data.get('photo');
 if (!file || !file.type.startsWith('image/')) { notify('Please select an image file.'); return; }
 const card = document.createElement('article'); card.className = 'product-card';
 card.dataset.name = String(data.get('name')).toLowerCase(); card.dataset.category = String(data.get('make')); card.dataset.price = '0';
 const wrap = document.createElement('div'); wrap.className = 'product-image-wrap';
 const img = document.createElement('img'); img.alt = String(data.get('name')); img.src = URL.createObjectURL(file); img.onload = () => URL.revokeObjectURL(img.src); wrap.append(img);
 const info = document.createElement('div'); info.className = 'product-info'; const title = document.createElement('h3'); title.textContent = String(data.get('name')); const note = document.createElement('p'); note.textContent = String(data.get('make')) + ' · Local preview only'; info.append(title,note); card.append(wrap,info);
 originalCards.unshift(card); const makeSelect = $('select[name=make]');
 if (![...makeSelect.options].some(o => o.value === card.dataset.category)) { const option = document.createElement('option'); option.textContent = card.dataset.category; makeSelect.append(option); }
 makeSelect.value = 'All makes'; $('#model-search').value = ''; $('#car-sort').value = 'default'; filterCards(); $('#build-dialog').close(); event.target.reset(); notify('Build preview added for this visit. It has not been published.');
});

// Simple cart and orders. Session storage carries them between pages.
let cart = [];
let orders = [];
try {
  cart = JSON.parse(sessionStorage.getItem('autohub-cart')) || [];
  orders = JSON.parse(sessionStorage.getItem('autohub-orders')) || [];
} catch (error) {
  cart = [];
  orders = [];
}

function saveShopping() {
  try {
    sessionStorage.setItem('autohub-cart', JSON.stringify(cart));
    sessionStorage.setItem('autohub-orders', JSON.stringify(orders));
  } catch (error) {
    alert('Your browser could not save the cart between pages.');
  }
}

// Treat stored names as text when building the cards.
function shoppingText(value) {
  let text = document.createElement('span');
  text.textContent = value;
  return text.innerHTML;
}

function updateCartCount() {
  let counts = document.querySelectorAll('.cart-count');
  for (let i = 0; i < counts.length; i++) {
    counts[i].textContent = cart.length;
  }
}

function addToCart(name, price) {
  cart.push({ name: name, price: price });
  saveShopping();
  updateCartCount();
  displayCart();
}

let cartButtons = document.querySelectorAll('[data-cart-name]');
for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener('click', function () {
    addToCart(this.dataset.cartName, Number(this.dataset.cartPrice));
    this.textContent = 'Added! Add another';
  });
}

function displayCart() {
  let cartItems = document.getElementById('cartItems');
  if (!cartItems) return;
  let total = 0;
  cartItems.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    cartItems.innerHTML += `
      <div class="shopping-item">
        <p>${shoppingText(cart[i].name)} — ₱${cart[i].price.toLocaleString()}</p>
        <button class="btn btn-red" onclick="removeItem(${i})">Remove</button>
      </div>`;
    total += cart[i].price;
  }
  if (cart.length === 0) cartItems.innerHTML = '<p>Your cart is empty.</p>';
  document.getElementById('cartTotal').textContent = 'Total: ₱' + total.toLocaleString();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveShopping();
  updateCartCount();
  displayCart();
}

function placeOrder() {
  if (cart.length === 0) {
    alert('Add an item to your cart first.');
    return;
  }
  let payment = document.getElementById('payment').value;
  let status = 'To Pay';
  if (payment === 'Meet-up' || payment === 'COD') status = 'To Ship / Meet-up';
  for (let i = 0; i < cart.length; i++) {
    orders.push({ name: cart[i].name, price: cart[i].price, payment: payment, status: status });
  }
  cart = [];
  saveShopping();
  updateCartCount();
  displayCart();
  showOrders(status);
  document.getElementById('orders').scrollIntoView();
}

function showOrders(status) {
  let orderList = document.getElementById('orderList');
  if (!orderList) return;
  let found = false;
  orderList.innerHTML = '';
  let tabs = document.querySelectorAll('[data-order-status]');
  for (let i = 0; i < tabs.length; i++) {
    let selected = tabs[i].dataset.orderStatus === status;
    tabs[i].className = selected ? 'btn btn-cyan' : 'btn btn-outline';
    tabs[i].setAttribute('aria-pressed', selected);
  }
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === status) {
      found = true;
      let buttons = '';
      if (status === 'To Pay') {
        buttons += `<button class="btn btn-cyan" onclick="changeStatus(${i}, 'To Ship / Meet-up')">Mark as Paid (Demo)</button>`;
      }
      if (status === 'To Ship / Meet-up') {
        let buttonText = 'Order Received';
        if (orders[i].payment === 'Meet-up') buttonText = 'Meet-up Completed';
        buttons += `<button class="btn btn-cyan" onclick="changeStatus(${i}, 'Completed')">${buttonText}</button>`;
      }
      if (status === 'To Pay' || status === 'To Ship / Meet-up') {
        buttons += `<button class="btn btn-red" onclick="changeStatus(${i}, 'Cancelled')">Cancel</button>`;
      }
      orderList.innerHTML += `
        <div class="shopping-item">
          <h3>${shoppingText(orders[i].name)}</h3>
          <p>Price: ₱${orders[i].price.toLocaleString()}</p>
          <p>Payment: ${shoppingText(orders[i].payment)}</p>
          <p>Status: ${shoppingText(orders[i].status)}</p>
          ${buttons}
        </div>`;
    }
  }
  if (!found) orderList.innerHTML = '<p>No orders here yet.</p>';
}

function changeStatus(index, status) {
  orders[index].status = status;
  saveShopping();
  showOrders(status);
}

updateCartCount();
displayCart();
showOrders('To Pay');

// Hangout map selector: simple place names, no API key required.
function showHangoutMap(place) {
  let name = 'Nepo Quad';
  let address = 'Plaridel Street, Angeles City';
  let query = 'The Nepo Quad Angeles City Pampanga';
  if (place === 'marquee') {
    name = 'MarQuee Mall';
    address = 'Pulung Maragul, Angeles City';
    query = 'MarQuee Mall Angeles City Pampanga';
  } else if (place === 'clark') {
    name = 'SM City Clark';
    address = 'Manuel A. Roxas Highway, Angeles City';
    query = 'SM City Clark Angeles City Pampanga';
  } else {
    place = 'nepo';
  }
  document.getElementById('mapHeading').textContent = name;
  document.getElementById('mapAddress').textContent = address;
  document.getElementById('hangoutLocation').value = place;
  document.getElementById('hangoutMap').title = 'Google Maps — ' + name;
  document.getElementById('hangoutMap').src = 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
  document.getElementById('directionsLink').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(query);
}

function toggleInterest(button) {
  let interested = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', interested);
  button.textContent = interested ? 'Interested ✓' : "I'm Interested";
  button.className = interested ? 'btn btn-red' : 'btn btn-outline';
  document.getElementById('interestMessage').textContent = interested
    ? 'Marked as interested for this visit. This does not register you for an event.'
    : 'Interest removed.';
}

if (document.getElementById('hangoutMap')) {
  let mapLinks = document.querySelectorAll('.hangout-map-link');
  for (let i = 0; i < mapLinks.length; i++) {
    mapLinks[i].addEventListener('click', function () {
      showHangoutMap(this.dataset.place);
    });
  }
  showHangoutMap(window.location.hash.slice(1));
  window.addEventListener('hashchange', function () {
    let place = window.location.hash.slice(1);
    if (place === 'nepo' || place === 'marquee' || place === 'clark') {
      showHangoutMap(place);
    }
  });
}
