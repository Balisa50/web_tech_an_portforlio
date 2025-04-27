// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            // Create mobile menu
            const mobileMenu = document.createElement('div');
            mobileMenu.id = 'mobileMenu';
            mobileMenu.style.position = 'fixed';
            mobileMenu.style.top = '0';
            mobileMenu.style.left = '0';
            mobileMenu.style.width = '100%';
            mobileMenu.style.height = '100%';
            mobileMenu.style.backgroundColor = 'rgba(18, 18, 24, 0.98)';
            mobileMenu.style.backdropFilter = 'blur(10px)';
            mobileMenu.style.zIndex = '100';
            mobileMenu.style.display = 'flex';
            mobileMenu.style.flexDirection = 'column';
            mobileMenu.style.alignItems = 'center';
            mobileMenu.style.justifyContent = 'center';

            // Close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '<i class="ri-close-line ri-2x"></i>';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '20px';
            closeButton.style.right = '20px';
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.color = 'white';
            closeButton.style.cursor = 'pointer';

            // Menu items
            const menuItems = [
                { text: 'About', href: '#about' },
                { text: 'Skills', href: '#skills' },
                { text: 'Coursework', href: '#coursework' },
                { text: 'Projects', href: '#projects' },
                { text: 'Certifications', href: '#certifications' },
                { text: 'Contact', href: '#contact' }
            ];

            const menuList = document.createElement('div');
            menuList.style.display = 'flex';
            menuList.style.flexDirection = 'column';
            menuList.style.gap = '20px';
            menuList.style.textAlign = 'center';

            menuItems.forEach(item => {
                const menuItem = document.createElement('a');
                menuItem.href = item.href;
                menuItem.textContent = item.text;
                menuItem.style.color = 'white';
                menuItem.style.fontSize = '24px';
                menuItem.style.textDecoration = 'none';
                menuItem.style.padding = '10px';
                menuItem.style.transition = 'all 0.3s ease';
                menuItem.style.position = 'relative';
                menuItem.style.overflow = 'hidden';

                menuItem.addEventListener('mouseover', function() {
                    this.style.color = 'var(--color-primary)';
                    this.style.transform = 'translateY(-2px)';
                });

                menuItem.addEventListener('mouseout', function() {
                    this.style.color = 'white';
                    this.style.transform = 'translateY(0)';
                });

                menuItem.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.body.removeChild(mobileMenu);
                    const targetElement = document.querySelector(item.href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });

                menuList.appendChild(menuItem);
            });

            closeButton.addEventListener('click', function() {
                document.body.removeChild(mobileMenu);
            });

            mobileMenu.appendChild(closeButton);
            mobileMenu.appendChild(menuList);
            document.body.appendChild(mobileMenu);
        });
    }

    // Form validation
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '8px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '12px';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

        const icon = document.createElement('div');
        if (type === 'success') {
            notification.style.backgroundColor = 'rgba(76, 175, 80, 0.95)';
            notification.style.backdropFilter = 'blur(10px)';
            notification.style.border = '1px solid rgba(76, 175, 80, 0.3)';
            icon.innerHTML = '<i class="ri-check-line ri-lg"></i>';
        } else if (type === 'error') {
            notification.style.backgroundColor = 'rgba(244, 67, 54, 0.95)';
            notification.style.backdropFilter = 'blur(10px)';
            notification.style.border = '1px solid rgba(244, 67, 54, 0.3)';
            icon.innerHTML = '<i class="ri-error-warning-line ri-lg"></i>';
        }

        const text = document.createElement('div');
        text.textContent = message;
        notification.appendChild(icon);
        notification.appendChild(text);
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(10px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // Add custom checkbox functionality
    const checkbox = document.getElementById('newsletter');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.classList.add('checked');
            } else {
                this.classList.remove('checked');
            }
        });
    }
});