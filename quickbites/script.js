document.addEventListener('DOMContentLoaded', function() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (this.getAttribute('href') === '#header') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        document.querySelector(this.getAttribute('href')).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Order modal functionality
            const orderModal = document.getElementById('orderModal');
            const orderModalClose = document.getElementById('orderModalClose');
            const orderNowButton = document.querySelector('.ordernow-button button');

            function openOrderModal() {
                orderModal.classList.add('active');
            }
            function closeOrderModal() {
                orderModal.classList.remove('active');
            }

            orderNowButton.addEventListener('click', function() {
                openOrderModal();
            });
            orderModalClose.addEventListener('click', function() {
                closeOrderModal();
            });
            window.addEventListener('click', function(event) {
                if (event.target === orderModal) {
                    closeOrderModal();
                }
            });

            // Pickup/Delivery radio buttons
            const pickupRadio = document.getElementById('pickupRadio');
            const deliveryRadio = document.getElementById('deliveryRadio');
            const addressField = document.getElementById('addressField');

            pickupRadio.addEventListener('change', function() {
                if (this.checked) {
                    addressField.style.display = 'none';
                }
            });

            deliveryRadio.addEventListener('change', function() {
                if (this.checked) {
                    addressField.style.display = 'block';
                }
            });

            // Product Details Modal
            const productDetailsModal = document.getElementById('productDetailsModal');
            const productDetailsClose = document.getElementById('productDetailsClose');
            const productDetailsOrderBtn = document.getElementById('productDetailsOrderBtn');

            function openProductDetailsModal(imgSrc, name, desc, price) {
                document.getElementById('productDetailsImage').innerHTML =
                    `<img src="${imgSrc}" alt="${name}" style="width:100%;border-radius:18px;max-height:400px;object-fit:cover;">`;
                document.getElementById('productDetailsName').textContent = name;
                document.getElementById('productDetailsDesc').textContent = desc;
                document.getElementById('productDetailsPrice').textContent = price;
                productDetailsModal.classList.add('active');
            }
            function closeProductDetailsModal() {
                productDetailsModal.classList.remove('active');
            }

            productDetailsClose.addEventListener('click', closeProductDetailsModal);
            window.addEventListener('click', function(event) {
                if (event.target === productDetailsModal) {
                    closeProductDetailsModal();
                }
            });

            // Open order modal from product details modal
            productDetailsOrderBtn.addEventListener('click', function() {
                closeProductDetailsModal();
                openOrderModal();
            });

            // Attach to all view-details buttons
            document.querySelectorAll('.view-details').forEach((btn) => {
                btn.addEventListener('click', function() {
                    const product = btn.closest('.product');
                    const img = product.querySelector('img') ? product.querySelector('img').src : '';
                    const name = product.querySelector('.product-title').textContent;
                    const desc = product.querySelector('.product-desc').textContent;
                    const price = product.querySelector('.product-price').textContent;
                    openProductDetailsModal(img, name, desc, price);
                });
            });

                // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const closeMobileNav = document.getElementById('closeMobileNav');
        const mobileOrderNow = document.getElementById('mobileOrderNow');

        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
        });
        closeMobileNav.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
        });
        mobileNavOverlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
        });

        // Mobile nav links scroll
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                if (this.getAttribute('href') === '#header') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        // Mobile "Order Now" button
        mobileOrderNow.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.getElementById('orderModal').classList.add('active');
        });

                // NEW: Set minimum quantity to 4 when Banana Pudding Mini Pan is selected
                const cakeFlavorSelect = document.getElementById('cakeFlavor');
                const cakeQuantityInput = document.getElementById('cakeQuantity');

                cakeFlavorSelect.addEventListener('change', function() {
                    if (this.value === 'Banana Pudding Mini Pan') {
                        cakeQuantityInput.min = 4;
                        cakeQuantityInput.value = 4;
                    } else {
                        cakeQuantityInput.min = 1;
                        cakeQuantityInput.value = 1;
                    }
                });
            });


            // Testimonials carousel functionality
            const track = document.querySelector('.testimonials-track');
            const pauseBtn = document.getElementById('pauseBtn');
            const playBtn = document.getElementById('playBtn');
            const dots = document.querySelectorAll('.dot');
            
            // Pause animation on hover
            track.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            track.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
            
            // Control buttons
            pauseBtn.addEventListener('click', () => {
                track.style.animationPlayState = 'paused';
            });
            
            playBtn.addEventListener('click', () => {
                track.style.animationPlayState = 'running';
            });
            
            // Dot indicators
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    // Remove active class from all dots
                    dots.forEach(d => d.classList.remove('active'));
                    // Add active class to clicked dot
                    dot.classList.add('active');
                });
            });
                
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwekMnB1exXCeUVrvWdnwsZ3XSo3qxzriNb5YJKBDIUVeK4cZdV9m-IS1YbfXC-SzG8jQ/exec';
            const web3FormURL = 'https://api.web3forms.com/submit';
            const web3SuccessURL = 'https://web3forms.com/success';
            const form = document.getElementById('orderForm');
            const orderLoading = document.getElementById('orderLoading');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                orderLoading.style.display = 'block'; // Show loading

                // Send to Google Sheets
                fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                    .then(response => {
                        // After Google Sheets submission, send to Web3Forms
                        fetch(web3FormURL, { method: 'POST', body: new FormData(form) })
                            .then(response => {
                                orderLoading.style.display = 'none'; // Hide loading
                                window.location.href = web3SuccessURL;
                            })
                            .catch(error => {
                                orderLoading.style.display = 'none';
                                alert('Web3Forms submission failed. Please try again.');
                            });
                    })
                    .catch(error => {
                        orderLoading.style.display = 'none';
                        alert('Google Sheets submission failed. Please try again.');
                    });
            });