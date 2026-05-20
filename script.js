const cartCount = document.querySelector('.cart-count');
const addCartButtons = document.querySelectorAll('.add-cart, .buy-btn');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const signInForm = document.getElementById('signInForm');
const signInFeedback = document.getElementById('signInFeedback');
const accountButton = document.getElementById('accountButton');
const cartItemsListElement = document.getElementById('cartItemsList');
const cartItemTotal = document.getElementById('cartItemTotal');
const cartValueTotal = document.getElementById('cartValueTotal');
const cartOrderFeedback = document.getElementById('cartOrderFeedback');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const signInModalElement = document.getElementById('signInModal');
let cartItems = [];

const cartModalElement = document.getElementById('cartModal');

window.addEventListener('load', () => {
    console.log('ShopEase Website Loaded Successfully!');
    renderCart();
});

const formatCurrency = amount => `$${amount.toFixed(2)}`;

const renderCart = () => {
    cartCount.textContent = cartItems.length;
    cartItemTotal.textContent = cartItems.length;

    cartItemsListElement.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsListElement.innerHTML = `<div class="list-group-item bg-transparent border text-center text-secondary" style="border-style: dashed;">Your cart is empty. Add products to place an order.</div>`;
        placeOrderBtn.disabled = true;
        cartValueTotal.textContent = '$0.00';
        return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {
        total += item.price;
        const itemRow = document.createElement('div');
        itemRow.className = 'list-group-item bg-transparent border-0 px-0 py-3 d-flex justify-content-between align-items-center text-white';
        itemRow.innerHTML = `
            <div>
                <h6 class="mb-1">${item.name}</h6>
                <small class="text-secondary">Qty 1</small>
            </div>
            <span class="fw-bold">${formatCurrency(item.price)}</span>
        `;
        cartItemsListElement.appendChild(itemRow);
    });

    cartValueTotal.textContent = formatCurrency(total);
    placeOrderBtn.disabled = false;
};

addCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name || 'Premium item';
        const price = Number(button.dataset.price || 0);

        cartItems.push({ name, price });
        renderCart();

        button.classList.add('btn-warning');
        button.classList.remove('btn-outline-warning');
        const originalLabel = button.classList.contains('add-cart') ? 'Add to Cart' : 'Buy Now';
        button.textContent = 'Added';

        setTimeout(() => {
            button.classList.remove('btn-warning');
            button.classList.add('btn-outline-warning');
            button.textContent = originalLabel;
        }, 1800);
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    formFeedback.classList.remove('d-none');
    formFeedback.textContent = 'Thanks for reaching out! We will contact you shortly.';

    contactForm.reset();

    setTimeout(() => {
        formFeedback.classList.add('d-none');
    }, 4500);
});

signInForm?.addEventListener('submit', event => {
    event.preventDefault();

    const userNameInput = document.getElementById('signinName');
    const userName = userNameInput?.value?.trim() || 'Your Account';

    signInFeedback.classList.remove('d-none');
    signInFeedback.textContent = `Welcome back, ${userName}!`;
    accountButton.textContent = `Hi, ${userName.split(' ')[0]}`;
    accountButton.classList.remove('btn-warning');
    accountButton.classList.add('btn-outline-light');

    signInForm.reset();

    setTimeout(() => {
        signInFeedback.classList.add('d-none');
        const bsModal = bootstrap.Modal.getInstance(signInModalElement);
        if (bsModal) {
            bsModal.hide();
        }
    }, 2500);
});

placeOrderBtn?.addEventListener('click', () => {
    if (cartItems.length === 0) {
        return;
    }
    cartOrderFeedback.classList.remove('d-none');
    cartOrderFeedback.textContent = 'Order placed successfully! Thank you for shopping with ShopEase.';

    cartItems = [];
    renderCart();

    setTimeout(() => {
        cartOrderFeedback.classList.add('d-none');
    }, 4500);
});

const observerOptions = {
    threshold: 0.4
};

const sections = document.querySelectorAll('main section');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    navLinks.forEach(item => item.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});