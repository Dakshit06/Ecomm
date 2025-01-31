// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    once: true
});

// Products Data
const products = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
        category: "Formal Wear",
        title: "Classic Suit",
        rating: 4.5,
        reviews: 30,
        price: 299.99,
        oldPrice: 399.99,
        discount: 25,
        tag: { text: "New", class: "bg-success" }
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/1760900/pexels-photo-1760900.jpeg",
        category: "Business Casual",
        title: "Modern Blazer",
        rating: 4.3,
        reviews: 25,
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        tag: { text: "Hot", class: "bg-danger" }
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg",
        category: "Street Style",
        title: "Urban Collection",
        rating: 4.7,
        reviews: 42,
        price: 159.99,
        oldPrice: 199.99,
        discount: 20,
        tag: { text: "Trending", class: "bg-primary" }
    },
    {
        id: 4,
        image: "https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg",
        category: "Premium Collection",
        title: "Designer Suit",
        rating: 5.0,
        reviews: 50,
        price: 499.99,
        oldPrice: 699.99,
        discount: 30,
        tag: { text: "Premium", class: "bg-warning" }
    },
    {
        id: 5,
        image: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
        category: "Business",
        title: "Executive Suit",
        rating: 4.8,
        reviews: 35,
        price: 399.99,
        oldPrice: 499.99,
        discount: 20,
        tag: { text: "Best Seller", class: "bg-success" }
    },
    {
        id: 6,
        image: "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg",
        category: "Casual Wear",
        title: "Smart Casual Set",
        rating: 4.6,
        reviews: 28,
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        tag: { text: "New", class: "bg-primary" }
    }
];

// Initialize Swiper Sliders
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        fadeEffect: {
            crossFade: true
        }
    });

    // Image Slider
    const imageSwiper = new Swiper('.image-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });

    // Products Slider
    const productsSlider = new Swiper('.products-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        }
    });

    // Generate product cards
    initializeProducts();

    // Initialize tooltips
    initializeTooltips();

    // Initialize Sale Timer
    initializeSaleTimer();

    // Add lazy loading to images
    initializeLazyLoading();

    // Initialize Featured Products
    const featuredProductsContainer = document.querySelector('.featured-products .row.g-4');
    if (featuredProductsContainer) {
        products.forEach(product => {
            const productCol = document.createElement('div');
            productCol.className = 'col-lg-3 col-md-6';
            productCol.innerHTML = createProductCard(product);
            featuredProductsContainer.appendChild(productCol);
        });
    }
});

// Initialize Products
function initializeProducts() {
    const productsWrapper = document.querySelector('.products-slider .swiper-wrapper');
    if (productsWrapper) {
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsWrapper.appendChild(productCard);
        });
    }
}

// Create Product Card
function createProductCard(product) {
    return `
        <div class="col-lg-3 col-md-6" data-aos="fade-up">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <span class="badge ${product.tag.class} product-tag">${product.tag.text}</span>
                    <div class="product-actions">
                        <button class="btn action-btn" data-bs-toggle="tooltip" title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn action-btn quick-view-btn" data-bs-toggle="tooltip" 
                                title="Quick View" data-product-id="${product.id}">
                            <i class="far fa-eye"></i>
                        </button>
                        <button class="btn action-btn" data-bs-toggle="tooltip" title="Compare">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="d-flex align-items-center mb-2">
                        <div class="rating text-warning me-2">
                            ${generateRatingStars(product.rating)}
                        </div>
                        <span class="rating-count text-muted">(${product.reviews})</span>
                    </div>
                    <div class="product-price mb-3">
                        <span class="h5 text-primary me-2">$${product.price}</span>
                        <span class="text-muted text-decoration-line-through">$${product.oldPrice}</span>
                        <span class="badge bg-danger ms-2">-${product.discount}%</span>
                    </div>
                    <button class="btn btn-primary w-100 add-to-cart" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate Rating Stars
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Initialize Tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Initialize Sale Timer
function initializeSaleTimer() {
    function updateTimer() {
        const now = new Date();
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 
                           now.getHours() + 15, now.getMinutes() + 30);
        const diff = end - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        const timerElement = document.getElementById('saleTimer');
        if (timerElement) {
            timerElement.textContent = `Ends in: ${days}d ${hours}h ${minutes}m`;
        }
    }

    updateTimer();
    setInterval(updateTimer, 60000);
}

// Initialize Lazy Loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Quick View Modal
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            showQuickViewModal(productId);
        });
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToCart(productId);
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }
});

// Quick View Modal
function showQuickViewModal(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        // Implement quick view modal functionality
        console.log('Show quick view for product:', product);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        // Implement add to cart functionality
        console.log('Added to cart:', product);
    }
}

// Newsletter Submit
function handleNewsletterSubmit(form) {
    const email = form.querySelector('input[type="email"]').value;
    // Implement newsletter subscription
    console.log('Newsletter subscription for:', email);
}

// Initialize Featured Products
function initializeFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (featuredProductsGrid) {
        let productsHTML = '';
        products.forEach(product => {
            productsHTML += createProductCard(product);
        });
        featuredProductsGrid.innerHTML = productsHTML;
        
        // Initialize tooltips for the new elements
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });
    }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Initialize Swiper sliders
    initializeSliders();
    
    // Initialize Featured Products
    initializeFeaturedProducts();
    
    // Initialize other components
    initializeTooltips();
    initializeSaleTimer();
    initializeLazyLoading();
    
    // Add event listeners
    addEventListeners();
});

// Add event listeners
function addEventListeners() {
    // Quick View buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            showQuickViewModal(productId);
        });
    });

    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToCart(productId);
        });
    });

    // View All button
    const viewAllBtn = document.querySelector('.view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            window.location.href = 'shop.html';
        });
    }
} 