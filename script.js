// script.js

const products = [
    { id: 1, name: 'Raven Shades', price: 50, description: 'Classic and stylish, these black sunglasses are perfect for any occasion. With UV protection and a sleek design, they offer both protection and fashion.', image: 'sg1.png', quantity: 1 },
    { id: 2, name: 'Stealth Spectacles', price: 100, description: 'These black sunglasses are designed for those who demand the best. With advanced lens technology, they enhance your vision while providing a bold and modern look.', image: 'sg2.png', quantity: 1 },
    { id: 3, name: 'Onyx Optics', price: 75, description: 'Make a statement with these black sunglasses. Featuring cutting-edge materials and craftsmanship, they offer unparalleled comfort and style.', image: 'sg3.png', quantity: 1 },
    { id: 4, name: 'Midnight Shades', price: 120, description: 'Elevate your style with these black sunglasses. With premium materials and attention to detail, they are the ultimate accessory for any outfit.', image: 'sg4.png', quantity: 1 }
    // Add more products as needed
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    document.getElementById('search').addEventListener('input', searchProducts);
    document.getElementById('sort').addEventListener('change', sortProducts);
    document.getElementById('checkout').addEventListener('click', checkout);
});

function displayProducts(products) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p  font-weight: 700">Price: PHP ${product.price}</p>
            
            <p class="product-description" id="desc-${product.id}">${truncateDescription(product.description)}</p>
            <br>
            <label for="quantity-${product.id}">Quantity: <input type="number" id="quantity-${product.id}" name="quantity" value="${product.quantity}" min="1" style="width: 50px;">  </label>  
            <br>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            
            
        `;
        productContainer.appendChild(productElement);
    });
}

function truncateDescription(description) {
    return description.length > 350 ? description.substring(0, 350) + '...' : description;
}

function toggleDescription(id) {
    const descElement = document.getElementById(`desc-${id}`);
    const product = products.find(p => p.id === id);
    if (descElement.textContent.includes('...')) {
        descElement.textContent = product.description;
        descElement.nextElementSibling.textContent = 'Read less';
    } else {
        descElement.textContent = truncateDescription(product.description);
        descElement.nextElementSibling.textContent = 'Read more';
    }
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sort').value;
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
    });
    displayProducts(sortedProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - PHP ${item.price} x ${item.quantity}`;
        cartContainer.appendChild(cartItem);
    });
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Checking out: ${cart.map(item => `${item.name} x ${item.quantity}`).join(', ')}. Total: PHP ${total}`);
    cart = [];
    updateCart();
}
