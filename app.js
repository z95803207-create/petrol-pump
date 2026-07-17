/* ============================================
   App.js - Main Application Controller
   SPA with hash-based routing
   ============================================ */

const App = {
    _modules: {},
    _currentModule: 'dashboard',

    /* ----------------------------------------
       Nav Configuration
       ---------------------------------------- */
    _navItems: [
        { name: 'dashboard',  icon: '📊', langKey: 'nav_dashboard'  },
        { name: 'sales',      icon: '💰', langKey: 'nav_sales'      },
        { name: 'inventory',  icon: '🛢️', langKey: 'nav_inventory'  },
        { name: 'udhar',      icon: '📋', langKey: 'nav_udhar'      },
        { name: 'expenses',   icon: '💸', langKey: 'nav_expenses'   },
        { name: 'employees',  icon: '👥', langKey: 'nav_employees'  },
        { name: 'reports',    icon: '📈', langKey: 'nav_reports'    },
        { name: 'settings',   icon: '⚙️', langKey: 'nav_settings'   }
    ],

    /* ----------------------------------------
       Module Registration
       ---------------------------------------- */
    registerModule(name, module) {
        this._modules[name] = module;
    },

    /* ----------------------------------------
       Navigation
       ---------------------------------------- */
    navigate(moduleName) {
        window.location.hash = `#${moduleName}`;
    },

    _getModuleFromHash() {
        const hash = window.location.hash.replace('#', '').trim();
        return hash || 'dashboard';
    },

    /* ----------------------------------------
       Rendering
       ---------------------------------------- */
    render() {
        if (!Store.getCurrentUser()) {
            this.checkAuth();
            return;
        }

        const moduleName = this._getModuleFromHash();
        this._currentModule = moduleName;

        const module = this._modules[moduleName];
        const mainContent = document.getElementById('main-content');

        if (module && typeof module.render === 'function') {
            mainContent.innerHTML = module.render();
            if (typeof module.init === 'function') {
                module.init();
            }
        } else {
            mainContent.innerHTML = `
                <div class="page">
                    <div class="empty-state">
                        <div class="empty-state-icon">🚧</div>
                        <div class="empty-state-text">${Lang.t('loading')}</div>
                    </div>
                </div>
            `;
        }

        this._updateSidebar();
        this._updateHeader();
    },

    rerender() {
        this._updateSidebar();
        this._updateHeader();
        this.render();
    },

    /* ----------------------------------------
       Sidebar Updates
       ---------------------------------------- */
    _updateSidebar() {
        // Update brand text
        const brandText = document.getElementById('brandText');
        if (brandText) {
            brandText.textContent = Lang.t('app_name');
        }

        // Update nav link labels and active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const moduleName = link.getAttribute('data-module');
            const textEl = link.querySelector('.nav-text');

            // Update text from lang key
            if (textEl) {
                const langKey = textEl.getAttribute('data-lang');
                if (langKey) {
                    textEl.textContent = Lang.t(langKey);
                }
            }

            // Update active state
            if (moduleName === this._currentModule) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /* ----------------------------------------
       Header Updates
       ---------------------------------------- */
    _updateHeader() {
        // Update header title
        const headerTitle = document.getElementById('headerTitle');
        if (headerTitle) {
            const navItem = this._navItems.find(n => n.name === this._currentModule);
            const langKey = navItem ? navItem.langKey : 'nav_dashboard';
            headerTitle.textContent = Lang.t(langKey);
        }

        // Update date
        const headerDate = document.getElementById('headerDate');
        if (headerDate) {
            const now = new Date();
            headerDate.textContent = this.formatDate(now.toISOString());
        }

        // Update language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.textContent = Lang.t('lang_toggle');
        }
    },

    /* ----------------------------------------
       Mobile Sidebar
       ---------------------------------------- */
    _setupMobile() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        // Close sidebar on nav link click (mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            });
        });
    },

    /* ----------------------------------------
       Modal System
       ---------------------------------------- */
    showModal(html) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        if (overlay && content) {
            content.innerHTML = html;
            overlay.classList.add('active');
        }
    },

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    },

    _setupModal() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModal();
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    /* ----------------------------------------
       Toast System
       ---------------------------------------- */
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.success}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    },

    /* ----------------------------------------
       Utility: Format Currency
       ---------------------------------------- */
    formatCurrency(amount) {
        const num = parseFloat(amount);
        if (isNaN(num)) return 'PKR 0.00';
        return `PKR ${num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    },

    /* ----------------------------------------
       Utility: Format Date (DD/MM/YYYY)
       ---------------------------------------- */
    formatDate(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return '';
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    },

    /* ----------------------------------------
       Utility: Format DateTime (DD/MM/YYYY HH:mm)
       ---------------------------------------- */
    formatDateTime(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return '';
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    },

    /* ----------------------------------------
       Utility: Today's date as ISO string (date only)
       ---------------------------------------- */
    todayISO() {
        return new Date().toISOString().split('T')[0];
    },

    /* ----------------------------------------
       Utility: Fetch Live Fuel Prices via CORS proxy
       ---------------------------------------- */
    fetchLiveRates(callback) {
        const shellUrl = 'https://www.shell.com.pk/shell-stations/shell-station-price-board.model.json';
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(shellUrl);

        fetch(proxyUrl)
            .then(res => {
                if (!res.ok) throw new Error('Proxy error');
                return res.json();
            })
            .then(data => {
                try {
                    const parsed = JSON.parse(data.contents);
                    let petrol = null;
                    let diesel = null;

                    function traverse(obj) {
                        if (typeof obj === 'string') {
                            const petrolMatch = obj.match(/Super<\/td>\s*<td>([\d.]+)/i);
                            const dieselMatch = obj.match(/Diesel<\/td>\s*<td>([\d.]+)/i);
                            if (petrolMatch) petrol = parseFloat(petrolMatch[1]);
                            if (dieselMatch) diesel = parseFloat(dieselMatch[1]);
                        } else if (typeof obj === 'object' && obj !== null) {
                            for (let k in obj) {
                                traverse(obj[k]);
                            }
                        }
                    }

                    traverse(parsed);

                    if (petrol && diesel) {
                        callback(null, { petrol, diesel, cng: 308.76 });
                    } else {
                        callback(new Error('Rates not found in data'));
                    }
                } catch (e) {
                    callback(e);
                }
            })
            .catch(err => {
                // Fallback rates if API fails or blocks
                console.warn('API error, using fallbacks:', err.message);
                callback(null, { petrol: 310.71, diesel: 323.30, cng: 308.76 });
            });
    },

    /* ----------------------------------------
       Initialization
       ---------------------------------------- */
    checkAuth() {
        const user = Store.getCurrentUser();
        const loginScreen = document.getElementById('login-screen');
        const appScreen = document.getElementById('app-screen');

        this._updateLoginScreen();

        if (!user) {
            if (loginScreen) loginScreen.style.display = 'flex';
            if (appScreen) appScreen.style.display = 'none';
        } else {
            if (loginScreen) loginScreen.style.display = 'none';
            if (appScreen) appScreen.style.display = 'block';

            // Update user badge in header
            const headerUserName = document.getElementById('headerUserName');
            if (headerUserName) {
                headerUserName.textContent = Lang.isUrdu() ? user.nameUr : user.name;
            }
            const userProfileBadge = document.getElementById('userProfileBadge');
            if (userProfileBadge) {
                userProfileBadge.className = 'user-profile-badge ' + user.role;
            }
        }
    },

    _updateLoginScreen() {
        // Translate all login elements dynamically
        const el = (id, key) => {
            const element = document.getElementById(id);
            if (element) element.textContent = Lang.t(key);
        };

        el('loginLogoText', 'app_name');
        el('loginSelectPortalTitle', 'login_select_portal');
        el('loginSelectPortalDesc', 'login_select_portal_desc');
        el('portalTitleAdmin', 'admin_portal');
        el('portalDescAdmin', 'admin_portal_desc');
        el('portalTitleManager', 'manager_portal');
        el('portalDescManager', 'manager_portal_desc');
        el('backToPortalsText', 'back_to_portals');
        el('enterPasswordLabel', 'enter_password');
        el('signInBtnText', 'login_btn');
        el('logoutBtnText', 'logout');

        // Translate login input placeholder
        const loginPasswordInput = document.getElementById('loginPassword');
        if (loginPasswordInput) {
            loginPasswordInput.placeholder = Lang.t('password_placeholder');
        }

        // Keep language buttons toggling labels
        const loginLangToggle = document.getElementById('loginLangToggle');
        if (loginLangToggle) {
            loginLangToggle.textContent = Lang.t('lang_toggle');
        }
    },

    _setupAuthEvents() {
        // 1. Portal selection click events
        const portalCards = document.querySelectorAll('.portal-card');
        const portalSelectionView = document.getElementById('portal-selection-view');
        const passwordEntryView = document.getElementById('password-entry-view');
        const selectedPortalTitle = document.getElementById('selectedPortalTitle');
        const loginRole = document.getElementById('loginRole');
        const loginPassword = document.getElementById('loginPassword');

        portalCards.forEach(card => {
            card.addEventListener('click', () => {
                const role = card.getAttribute('data-role');
                loginRole.value = role;

                // Set portal title
                if (selectedPortalTitle) {
                    selectedPortalTitle.textContent = Lang.t(role + '_portal');
                }

                // Hide portal screen, show password input screen
                if (portalSelectionView) portalSelectionView.style.display = 'none';
                if (passwordEntryView) passwordEntryView.style.display = 'block';
                if (loginPassword) {
                    loginPassword.value = '';
                    loginPassword.focus();
                }
            });
        });

        // 2. Back to portals click event
        const backToPortalsBtn = document.getElementById('backToPortalsBtn');
        if (backToPortalsBtn) {
            backToPortalsBtn.addEventListener('click', () => {
                if (portalSelectionView) portalSelectionView.style.display = 'block';
                if (passwordEntryView) passwordEntryView.style.display = 'none';
            });
        }

        // 3. Form submit login event
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const role = loginRole.value;
                const pwd = loginPassword.value;

                if (Store.login(role, pwd)) {
                    this.checkAuth();
                    this.showToast(Lang.t('success_saved'), 'success');
                    
                    // Reset to dashboard
                    window.location.hash = '#dashboard';
                    this.render();
                    
                    // Reset portal screen state for next time
                    if (portalSelectionView) portalSelectionView.style.display = 'block';
                    if (passwordEntryView) passwordEntryView.style.display = 'none';
                } else {
                    this.showToast(Lang.t('invalid_password'), 'error');
                }
            });
        }

        // 4. Logout event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Store.logout();
                this.checkAuth();
                this.showToast(Lang.t('logout') + '!', 'info');
            });
        }

        // 5. Login screen language toggle
        const loginLangToggle = document.getElementById('loginLangToggle');
        if (loginLangToggle) {
            loginLangToggle.addEventListener('click', () => {
                Lang.toggle();
            });
        }
    },

    /* ----------------------------------------
       Initialization
       ---------------------------------------- */
    init() {
        // Initialize language system
        Lang.init();

        // Check authentication and setup portals
        this.checkAuth();
        this._setupAuthEvents();

        // Set up hash-based routing
        window.addEventListener('hashchange', () => {
            this.render();
        });

        // Set default hash if none
        if (!window.location.hash) {
            window.location.hash = '#dashboard';
        }

        // Set up mobile menu
        this._setupMobile();

        // Set up modal
        this._setupModal();

        // Set up language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                Lang.toggle();
            });
        }

        // Initial render (only if authenticated)
        if (Store.getCurrentUser()) {
            this.render();
        }
    }
};
