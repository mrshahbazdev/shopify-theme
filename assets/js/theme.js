/**
 * Bano Theme - Main JavaScript
 * Premium Advanced Shopify Theme
 */

(function() {
  'use strict';

  // ==========================================================================
  // BanoTheme - Main Theme Object
  // ==========================================================================
  const BanoTheme = {
    config: {
      shop: {
        currency: window.Shopify?.currency || { active: 'USD', rate: 1 },
        money_format: window.Shopify?.money_format || '${{amount}}'
      },
      strings: window.themeStrings || {},
      settings: window.themeSettings || {}
    },

    // Initialize theme
    init() {
      this.onReady();
      this.setupEventListeners();
      this.initComponents();
    },

    // DOM Ready
    onReady() {
      document.addEventListener('DOMContentLoaded', () => {
        this.body = document.body;
        this.initDarkMode();
        this.initLazyLoading();
        this.initBackToTop();
        this.initA11y();
      });
    },

    // Event Listeners
    setupEventListeners() {
      // Drawer close on overlay click
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('drawer-overlay')) {
          this.closeAllDrawers();
        }
      });

      // Close drawers on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllDrawers();
        }
      });

      // Prevent body scroll when drawer is open
      document.addEventListener('drawer:open', () => {
        this.body.classList.add('overflow-hidden', 'lg:overflow-auto');
      });

      document.addEventListener('drawer:close', () => {
        this.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
      });
    },

    // Initialize Components
    initComponents() {
      this.initCartDrawer();
      this.initSearchDrawer();
      this.initWishlistDrawer();
      this.initCompareDrawer();
      this.initQuickView();
      this.initHeader();
      this.initAnnouncementBar();
      this.initCountdownTimers();
      this.initQuantitySelectors();
      this.initVariantSelectors();
      this.initAddToCart();
    },

    // ==========================================================================
    // Dark Mode
    // ==========================================================================
    initDarkMode() {
      const toggle = document.querySelector('[data-dark-mode-toggle]');
      if (!toggle) return;

      const getDarkMode = () => {
        const stored = localStorage.getItem('bano-theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      };

      const setDarkMode = (isDark) => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('bano-theme', isDark ? 'dark' : 'light');
        toggle.setAttribute('aria-pressed', isDark);
        toggle.querySelector('span')?.classList.toggle('sr-only', !isDark);
      };

      toggle.addEventListener('click', () => {
        setDarkMode(!document.documentElement.classList.contains('dark'));
      });

      // Set initial state
      setDarkMode(getDarkMode());
    },

    // ==========================================================================
    // Lazy Loading
    // ==========================================================================
    initLazyLoading() {
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
        });
      } else {
        // Intersection Observer fallback
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          observer.observe(img);
        });
      }
    },

    // ==========================================================================
    // Back to Top
    // ==========================================================================
    initBackToTop() {
      const btn = document.getElementById('back-to-top');
      if (!btn) return;

      window.addEventListener('scroll', () => {
        btn.classList.toggle('opacity-0', window.scrollY < 500);
        btn.classList.toggle('invisible', window.scrollY < 500);
      });

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },

    // ==========================================================================
    // Accessibility
    // ==========================================================================
    initA11y() {
      // Focus trap for modals/drawers
      document.querySelectorAll('[data-focus-trap]').forEach(el => {
        el.addEventListener('keydown', (e) => {
          if (e.key !== 'Tab') return;
          
          const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        });
      });

      // Reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      document.documentElement.classList.toggle('motion-reduce', prefersReducedMotion.matches);
      
      prefersReducedMotion.addEventListener('change', (e) => {
        document.documentElement.classList.toggle('motion-reduce', e.matches);
      });
    },

    // ==========================================================================
    // Cart Drawer
    // ==========================================================================
    initCartDrawer() {
      const drawer = document.getElementById('CartDrawer');
      if (!drawer) return;

      // Open cart drawer
      document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer('CartDrawer');
        });
      });

      // Update cart on page load
      this.updateCart();
    },

    async updateCart() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();
        
        // Update cart count
        document.querySelectorAll('[data-cart-count]').forEach(el => {
          el.textContent = cart.item_count;
          el.classList.toggle('opacity-0', cart.item_count === 0);
        });

        // Update cart drawer content
        const drawerContent = document.getElementById('CartDrawerContent');
        if (drawerContent) {
          drawerContent.innerHTML = this.renderCartItems(cart);
        }

        // Dispatch cart update event
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    },

    renderCartItems(cart) {
      if (!cart.items || cart.items.length === 0) {
        return `
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <svg class="w-16 h-16 text-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <p class="text-lg font-medium text-text-primary mb-2">${this.config.strings.cart?.empty?.title || 'Your cart is empty'}</p>
            <p class="text-text-muted mb-6">${this.config.strings.cart?.empty?.subtitle || 'Add items to your cart to checkout.'}</p>
            <a href="/collections/all" class="btn-primary">${this.config.strings.cart?.empty?.continue_shopping || 'Continue Shopping'}</a>
          </div>
        `;
      }

      return `
        <div class="flex flex-col h-full">
          <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            ${cart.items.map(item => `
              <div class="flex gap-4 p-3 bg-background-secondary rounded-lg" data-cart-item data-key="${item.key}">
                <a href="${item.url}" class="flex-shrink-0">
                  <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-md">
                </a>
                <div class="flex-1 min-w-0">
                  <a href="${item.url}" class="font-medium text-text-primary hover:text-primary-600 line-clamp-2">
                    ${item.product_title}
                  </a>
                  ${item.variant_title !== 'Default Title' ? `
                    <p class="text-sm text-text-muted">${item.variant_title}</p>
                  ` : ''}
                  <div class="flex items-center justify-between mt-2">
                    <div class="quantity-selector flex items-center border border-border rounded-md">
                      <button type="button" class="px-2 py-1 hover:bg-background-secondary transition-colors" data-action="decrease" data-key="${item.key}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <input type="number" value="${item.quantity}" min="1" class="w-12 text-center border-0 bg-transparent py-1" data-key="${item.key}">
                      <button type="button" class="px-2 py-1 hover:bg-background-secondary transition-colors" data-action="increase" data-key="${item.key}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                      </button>
                    </div>
                    <span class="font-medium">${Shopify.formatMoney(item.price, this.config.shop.money_format)}</span>
                  </div>
                </div>
                <button type="button" class="flex-shrink-0 text-text-muted hover:text-error transition-colors" data-remove="${item.key}">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            `).join('')}
          </div>
          
          <div class="border-t border-border p-4 space-y-4">
            <div class="flex justify-between text-lg font-semibold">
              <span>${this.config.strings.cart?.subtotal || 'Subtotal'}</span>
              <span>${Shopify.formatMoney(cart.total_price, this.config.shop.money_format)}</span>
            </div>
            <p class="text-sm text-text-muted">${this.config.strings.cart?.taxes_and_shipping_at_checkout || 'Taxes and shipping calculated at checkout'}</p>
            <a href="/checkout" class="btn-primary w-full text-center">${this.config.strings.cart?.checkout || 'Checkout'}</a>
            <a href="/cart" class="btn-outline w-full text-center">${this.config.strings.cart?.view_cart || 'View Cart'}</a>
          </div>
        </div>
      `;
    },

    // ==========================================================================
    // Search Drawer
    // ==========================================================================
    initSearchDrawer() {
      const drawer = document.getElementById('SearchDrawer');
      const input = document.getElementById('SearchInput');
      if (!drawer || !input) return;

      // Open search drawer
      document.querySelectorAll('[data-search-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer('SearchDrawer');
          setTimeout(() => input.focus(), 300);
        });
      });

      // Search functionality
      let searchTimeout;
      input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
          this.clearSearchResults();
          return;
        }

        searchTimeout = setTimeout(() => this.performSearch(query), 300);
      });
    },

    async performSearch(query) {
      const resultsContainer = document.getElementById('SearchResults');
      if (!resultsContainer) return;

      resultsContainer.innerHTML = '<div class="p-4 text-center"><div class="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full mx-auto"></div></div>';

      try {
        const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection,page,article&resources[limit]=6`);
        const data = await response.json();
        
        this.renderSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<p class="p-4 text-center text-text-muted">An error occurred. Please try again.</p>';
      }
    },

    renderSearchResults(data) {
      const resultsContainer = document.getElementById('SearchResults');
      if (!resultsContainer) return;

      const { products, collections, pages, articles } = data.resources;

      if (!products?.length && !collections?.length && !pages?.length && !articles?.length) {
        resultsContainer.innerHTML = `
          <div class="p-8 text-center">
            <p class="text-lg font-medium text-text-primary mb-2">${this.config.strings.search?.no_results?.title || 'No results found'}</p>
            <p class="text-text-muted">${this.config.strings.search?.no_results?.subtitle || 'Try different keywords'}</p>
          </div>
        `;
        return;
      }

      let html = '';

      if (products?.length) {
        html += `
          <div class="px-4 py-3">
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">${this.config.strings.search?.products || 'Products'}</h3>
            <div class="space-y-3">
              ${products.map(p => `
                <a href="${p.url}" class="flex items-center gap-3 p-2 rounded-lg hover:bg-background-secondary transition-colors">
                  <img src="${p.image}" alt="${p.title}" class="w-12 h-12 object-cover rounded">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-text-primary line-clamp-1">${p.title}</p>
                    <p class="text-sm text-primary-600">${Shopify.formatMoney(p.price, this.config.shop.money_format)}</p>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      if (collections?.length || pages?.length || articles?.length) {
        const others = [
          ...(collections || []).map(c => ({ type: 'collection', title: c.title, url: c.url })),
          ...(pages || []).map(p => ({ type: 'page', title: p.title, url: p.url })),
          ...(articles || []).map(a => ({ type: 'article', title: a.title, url: a.url }))
        ];

        html += `
          <div class="px-4 py-3 border-t border-border">
            <h3 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">${this.config.strings.search?.other || 'Other'}</h3>
            <div class="space-y-1">
              ${others.map(o => `
                <a href="${o.url}" class="flex items-center gap-2 p-2 rounded-lg hover:bg-background-secondary transition-colors text-sm">
                  <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    ${o.type === 'collection' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>' : 
                      o.type === 'page' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>' :
                      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>'}
                  </svg>
                  ${o.title}
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      resultsContainer.innerHTML = html;
    },

    clearSearchResults() {
      const resultsContainer = document.getElementById('SearchResults');
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="p-8 text-center">
            <p class="text-text-muted">${this.config.strings.header?.search?.placeholder || 'Start typing to search...'}</p>
          </div>
        `;
      }
    },

    // ==========================================================================
    // Wishlist Drawer
    // ==========================================================================
    initWishlistDrawer() {
      // Wishlist data stored in localStorage
      this.wishlist = JSON.parse(localStorage.getItem('bano-wishlist') || '[]');

      document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer('WishlistDrawer');
        });
      });

      // Wishlist button click handler
      document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = btn.dataset.productId;
          const productUrl = btn.dataset.productUrl;
          this.toggleWishlist(productId, productUrl, btn);
        });
      });

      this.updateWishlistUI();
    },

    toggleWishlist(productId, productUrl, btn) {
      const index = this.wishlist.findIndex(w => w.id === productId);
      
      if (index > -1) {
        this.wishlist.splice(index, 1);
        btn.classList.remove('added');
        btn.setAttribute('aria-label', this.config.strings.wishlist?.add || 'Add to Wishlist');
      } else {
        this.wishlist.push({ id: productId, url: productUrl, addedAt: Date.now() });
        btn.classList.add('added');
        btn.setAttribute('aria-label', this.config.strings.wishlist?.remove || 'Remove from Wishlist');
      }

      localStorage.setItem('bano-wishlist', JSON.stringify(this.wishlist));
      this.updateWishlistUI();
      document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: this.wishlist }));
    },

    updateWishlistUI() {
      document.querySelectorAll('[data-wishlist-count]').forEach(el => {
        el.textContent = this.wishlist.length;
        el.classList.toggle('opacity-0', this.wishlist.length === 0);
      });
    },

    // ==========================================================================
    // Compare Drawer
    // ==========================================================================
    initCompareDrawer() {
      this.compare = JSON.parse(localStorage.getItem('bano-compare') || '[]');
      const maxProducts = 4;

      document.querySelectorAll('[data-compare-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer('CompareDrawer');
        });
      });

      document.querySelectorAll('[data-compare-btn]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (this.compare.length >= maxProducts && !this.compare.find(c => c.id === btn.dataset.productId)) {
            alert(`You can compare up to ${maxProducts} products`);
            return;
          }
          const productId = btn.dataset.productId;
          const productUrl = btn.dataset.productUrl;
          this.toggleCompare(productId, productUrl, btn);
        });
      });

      this.updateCompareUI();
    },

    toggleCompare(productId, productUrl, btn) {
      const index = this.compare.findIndex(c => c.id === productId);
      
      if (index > -1) {
        this.compare.splice(index, 1);
        btn.classList.remove('added');
      } else {
        this.compare.push({ id: productId, url: productUrl, addedAt: Date.now() });
        btn.classList.add('added');
      }

      localStorage.setItem('bano-compare', JSON.stringify(this.compare));
      this.updateCompareUI();
      document.dispatchEvent(new CustomEvent('compare:updated', { detail: this.compare }));
    },

    updateCompareUI() {
      document.querySelectorAll('[data-compare-count]').forEach(el => {
        el.textContent = this.compare.length;
        el.classList.toggle('opacity-0', this.compare.length === 0);
      });
    },

    // ==========================================================================
    // Quick View
    // ==========================================================================
    initQuickView() {
      document.querySelectorAll('[data-quick-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const productUrl = btn.dataset.productUrl;
          this.openQuickView(productUrl);
        });
      });
    },

    async openQuickView(productUrl) {
      const modal = document.getElementById('QuickViewModal');
      if (!modal) return;

      this.openDrawer('QuickViewModal', true);

      const content = modal.querySelector('[data-quick-view-content]');
      content.innerHTML = '<div class="p-8 flex items-center justify-center"><div class="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"></div></div>';

      try {
        const response = await fetch(productUrl + '?view=quick-view');
        const html = await response.text();
        content.innerHTML = html;
      } catch (error) {
        content.innerHTML = '<p class="p-8 text-center text-error">Failed to load product. Please try again.</p>';
      }
    },

    // ==========================================================================
    // Header
    // ==========================================================================
    initHeader() {
      const header = document.querySelector('.header');
      if (!header) return;

      let lastScroll = 0;
      const scrollThreshold = 100;

      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add/remove shadow
        header.classList.toggle('shadow-md', currentScroll > 10);
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
          header.classList.add('-translate-y-full');
        } else {
          header.classList.remove('-translate-y-full');
        }

        lastScroll = currentScroll;
      });

      // Mobile menu toggle
      const menuToggle = document.querySelector('[data-menu-toggle]');
      const mobileMenu = document.getElementById('MobileMenu');
      
      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
          menuToggle.classList.toggle('active');
          mobileMenu.classList.toggle('open');
          document.dispatchEvent(new CustomEvent(mobileMenu.classList.contains('open') ? 'drawer:open' : 'drawer:close'));
        });
      }
    },

    // ==========================================================================
    // Announcement Bar
    // ==========================================================================
    initAnnouncementBar() {
      const bar = document.querySelector('.announcement-bar');
      if (!bar) return;

      const closeBtn = bar.querySelector('[data-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          bar.classList.add('hidden');
          localStorage.setItem('bano-announcement-closed', 'true');
        });
      }

      // Check if previously closed
      if (localStorage.getItem('bano-announcement-closed') === 'true') {
        bar.classList.add('hidden');
      }
    },

    // ==========================================================================
    // Countdown Timers
    // ==========================================================================
    initCountdownTimers() {
      document.querySelectorAll('[data-countdown]').forEach(timer => {
        const endDate = new Date(timer.dataset.countdown).getTime();
        
        const update = () => {
          const now = new Date().getTime();
          const distance = endDate - now;

          if (distance < 0) {
            timer.innerHTML = '<span class="text-error">Expired</span>';
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          const daysEl = timer.querySelector('[data-days]');
          const hoursEl = timer.querySelector('[data-hours]');
          const minutesEl = timer.querySelector('[data-minutes]');
          const secondsEl = timer.querySelector('[data-seconds]');

          if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
          if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
          if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
          if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        update();
        setInterval(update, 1000);
      });
    },

    // ==========================================================================
    // Quantity Selectors
    // ==========================================================================
    initQuantitySelectors() {
      document.querySelectorAll('.quantity-selector').forEach(selector => {
        selector.addEventListener('click', async (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;

          const input = selector.querySelector('input');
          const key = input.dataset.key;
          let value = parseInt(input.value);
          const action = btn.dataset.action;

          if (action === 'decrease' && value > 1) {
            value--;
          } else if (action === 'increase') {
            value++;
          } else {
            return;
          }

          // Update cart
          try {
            const response = await fetch('/cart/change.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: key, quantity: value })
            });
            
            if (response.ok) {
              this.updateCart();
            }
          } catch (error) {
            console.error('Error updating quantity:', error);
          }
        });
      });
    },

    // ==========================================================================
    // Variant Selectors
    // ==========================================================================
    initVariantSelectors() {
      document.querySelectorAll('[data-variant-form]').forEach(form => {
        form.addEventListener('change', (e) => {
          if (e.target.type === 'radio' || e.target.tagName === 'SELECT') {
            this.updateVariantPrice(form);
            this.updateVariantImage(form);
          }
        });
      });
    },

    updateVariantPrice(form) {
      const selectedVariant = form.querySelector('[name="id"]')?.value;
      if (!selectedVariant) return;

      const priceEl = form.querySelector('[data-price]');
      const compareAtEl = form.querySelector('[data-compare-at]');
      
      // This would typically fetch variant data from a data attribute or API
      // For now, we'll rely on Shopify's native variant prices
    },

    updateVariantImage(form) {
      // Variant image switching logic
    },

    // ==========================================================================
    // Add to Cart
    // ==========================================================================
    initAddToCart() {
      document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          
          const form = btn.closest('form') || document.querySelector(`[data-product-form="${btn.dataset.productId}"]`);
          if (!form) return;

          const formData = new FormData(form);
          const variantId = formData.get('id');

          if (!variantId) {
            // Show variant selector
            form.querySelector('[name="id"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }

          btn.classList.add('loading');
          btn.disabled = true;

          try {
            const response = await fetch('/cart/add.js', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              btn.classList.remove('loading');
              btn.classList.add('success');
              btn.textContent = this.config.strings.product?.added_to_cart || 'Added!';
              
              this.updateCart();
              this.openDrawer('CartDrawer');
              
              setTimeout(() => {
                btn.classList.remove('success');
                btn.disabled = false;
                btn.textContent = this.config.strings.product?.add_to_cart || 'Add to Cart';
              }, 2000);
            } else {
              throw new Error('Failed to add to cart');
            }
          } catch (error) {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.textContent = this.config.strings.product?.unavailable || 'Unavailable';
            
            setTimeout(() => {
              btn.textContent = this.config.strings.product?.add_to_cart || 'Add to Cart';
            }, 2000);
          }
        });
      });
    },

    // ==========================================================================
    // Drawer Management
    // ==========================================================================
    openDrawer(id, isModal = false) {
      const drawer = document.getElementById(id);
      if (!drawer) return;

      drawer.classList.add('open');
      if (!isModal) {
        document.body.classList.add('overflow-hidden');
      }
      
      document.dispatchEvent(new CustomEvent('drawer:open', { detail: { id } }));
      
      // Focus first focusable element
      const focusable = drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusable?.focus();
    },

    closeDrawer(id) {
      const drawer = document.getElementById(id);
      if (!drawer) return;

      drawer.classList.remove('open');
      document.body.classList.remove('overflow-hidden');
      
      document.dispatchEvent(new CustomEvent('drawer:close', { detail: { id } }));
    },

    closeAllDrawers() {
      document.querySelectorAll('.drawer.open, .drawer-overlay.open').forEach(el => {
        el.classList.remove('open');
      });
      document.body.classList.remove('overflow-hidden');
      document.dispatchEvent(new CustomEvent('drawers:close'));
    },

    // ==========================================================================
    // Section Initialization (for Theme Editor)
    // ==========================================================================
    initSection(sectionId) {
      const section = document.querySelector(`[data-section-id="${sectionId}"]`);
      if (!section) return;

      // Re-initialize section-specific functionality
      section.querySelectorAll('[data-countdown]').forEach(timer => {
        // Reinitialize countdown
      });
    }
  };

  // Initialize theme
  BanoTheme.init();

  // Expose to global scope
  window.BanoTheme = BanoTheme;

})();