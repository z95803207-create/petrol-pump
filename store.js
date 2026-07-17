/* ============================================
   Store.js - localStorage Data Layer
   CRUD operations for all collections
   ============================================ */

const Store = {
    // All collection names used in the app
    _collections: [
        'sales',
        'customers',
        'udhar_records',
        'fuel_stock',
        'stock_entries',
        'expenses',
        'employees',
        'salary_records'
    ],

    _settingsKey: 'pp_settings',
    _sessionKey: 'pp_session',

    // Default settings
    _defaultSettings: {
        pumpName: 'My Petrol Pump',
        pumpNameUr: 'میرا پیٹرول پمپ',
        address: '',
        phone: '',
        fuelTypes: [
            {
                id: 'petrol',
                name: 'Petrol',
                nameUr: 'پیٹرول',
                rate: 316.15,
                unit: 'liters',
                tankCapacity: 25000,
                currentStock: 0
            },
            {
                id: 'diesel',
                name: 'Diesel',
                nameUr: 'ڈیزل',
                rate: 354.35,
                unit: 'liters',
                tankCapacity: 25000,
                currentStock: 0
            },
            {
                id: 'cng',
                name: 'CNG',
                nameUr: 'سی این جی',
                rate: 308.76,
                unit: 'kg',
                tankCapacity: 5000,
                currentStock: 0
            }
        ],
        shifts: 2,
        currency: 'PKR',
        passwords: {
            admin: 'admin123',
            manager: 'manager123'
        }
    },

    /* ----------------------------------------
       Collection Key Helper
       ---------------------------------------- */
    _key(collection) {
        return `pp_${collection}`;
    },

    /* ----------------------------------------
       Generate Unique ID
       ---------------------------------------- */
    _generateId() {
        return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    },

    /* ----------------------------------------
       Auth Session Methods
       ---------------------------------------- */
    getCurrentUser() {
        try {
            const session = localStorage.getItem(this._sessionKey);
            return session ? JSON.parse(session) : null;
        } catch (e) {
            return null;
        }
    },

    login(role, password) {
        try {
            const settings = this.getSettings();
            const correctPassword = settings.passwords[role] || (role === 'admin' ? 'admin123' : 'manager123');
            if (password === correctPassword) {
                const user = {
                    role: role,
                    name: role === 'admin' ? 'Admin' : 'Manager',
                    nameUr: role === 'admin' ? 'ایڈمن' : 'مینیجر'
                };
                localStorage.setItem(this._sessionKey, JSON.stringify(user));
                return true;
            }
            return false;
        } catch (e) {
            console.error('Store.login error:', e);
            return false;
        }
    },

    logout() {
        localStorage.removeItem(this._sessionKey);
    },

    /* ----------------------------------------
       CRUD: Get All Raw Items (No filters)
       ---------------------------------------- */
    getRaw(collection) {
        try {
            const data = localStorage.getItem(this._key(collection));
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error(`Store.getRaw error for "${collection}":`, e);
            return [];
        }
    },

    /* ----------------------------------------
       CRUD: Get Filtered Items (Isolated per role)
       ---------------------------------------- */
    get(collection) {
        const rawItems = this.getRaw(collection);
        const user = this.getCurrentUser();
        if (!user) return [];

        // Shared collections across all portals
        const sharedCollections = ['fuel_stock', 'stock_entries', 'employees'];
        if (user.role === 'admin' || sharedCollections.includes(collection)) {
            return rawItems;
        }

        // Partitioned collections: filter by manager's role
        return rawItems.filter(item => item.managerId === user.role);
    },

    /* ----------------------------------------
       CRUD: Get Single Item by ID
       ---------------------------------------- */
    getById(collection, id) {
        const items = this.get(collection);
        return items.find(item => item.id === id) || null;
    },

    /* ----------------------------------------
       CRUD: Add New Item
       ---------------------------------------- */
    add(collection, item) {
        try {
            const items = this.getRaw(collection);
            const user = this.getCurrentUser();
            const managerId = user ? user.role : 'admin';

            const newItem = {
                ...item,
                id: this._generateId(),
                managerId: managerId,
                createdAt: new Date().toISOString()
            };
            items.push(newItem);
            localStorage.setItem(this._key(collection), JSON.stringify(items));
            return newItem;
        } catch (e) {
            console.error(`Store.add error for "${collection}":`, e);
            return null;
        }
    },

    /* ----------------------------------------
       CRUD: Update Existing Item
       ---------------------------------------- */
    update(collection, id, updates) {
        try {
            const items = this.getRaw(collection);
            const index = items.findIndex(item => item.id === id);
            if (index === -1) return null;

            // Security check: managers cannot update other managers' data
            const user = this.getCurrentUser();
            const sharedCollections = ['fuel_stock', 'stock_entries', 'employees'];
            if (user && user.role !== 'admin' && !sharedCollections.includes(collection)) {
                if (items[index].managerId !== user.role) {
                    console.error("Unauthorized update attempt.");
                    return null;
                }
            }

            items[index] = {
                ...items[index],
                ...updates,
                id: items[index].id, // Preserve original id
                createdAt: items[index].createdAt, // Preserve original createdAt
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(this._key(collection), JSON.stringify(items));
            return items[index];
        } catch (e) {
            console.error(`Store.update error for "${collection}":`, e);
            return null;
        }
    },

    /* ----------------------------------------
       CRUD: Remove Item
       ---------------------------------------- */
    remove(collection, id) {
        try {
            const items = this.getRaw(collection);
            const index = items.findIndex(item => item.id === id);
            if (index === -1) return false;

            // Security check: managers cannot delete other managers' data
            const user = this.getCurrentUser();
            const sharedCollections = ['fuel_stock', 'stock_entries', 'employees'];
            if (user && user.role !== 'admin' && !sharedCollections.includes(collection)) {
                if (items[index].managerId !== user.role) {
                    console.error("Unauthorized delete attempt.");
                    return false;
                }
            }

            const filtered = items.filter(item => item.id !== id);
            localStorage.setItem(this._key(collection), JSON.stringify(filtered));
            return true;
        } catch (e) {
            console.error(`Store.remove error for "${collection}":`, e);
            return false;
        }
    },

    /* ----------------------------------------
       Settings: Get
       ---------------------------------------- */
    getSettings() {
        try {
            const stored = localStorage.getItem(this._settingsKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge with defaults to ensure new fields are present
                return { ...this._defaultSettings, ...parsed };
            }
            return { ...this._defaultSettings };
        } catch (e) {
            console.error('Store.getSettings error:', e);
            return { ...this._defaultSettings };
        }
    },

    /* ----------------------------------------
       Settings: Save
       ---------------------------------------- */
    saveSettings(settings) {
        try {
            localStorage.setItem(this._settingsKey, JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('Store.saveSettings error:', e);
            return false;
        }
    },

    /* ----------------------------------------
       Export: All Data as JSON
       ---------------------------------------- */
    exportAll() {
        try {
            const data = {
                _exportedAt: new Date().toISOString(),
                _version: '1.0',
                settings: this.getSettings()
            };
            this._collections.forEach(collection => {
                data[collection] = this.get(collection);
            });
            return JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Store.exportAll error:', e);
            return null;
        }
    },

    /* ----------------------------------------
       Import: All Data from JSON
       ---------------------------------------- */
    importAll(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (!data || typeof data !== 'object') return false;

            // Import settings if present
            if (data.settings) {
                this.saveSettings(data.settings);
            }

            // Import each collection if present
            this._collections.forEach(collection => {
                if (Array.isArray(data[collection])) {
                    localStorage.setItem(this._key(collection), JSON.stringify(data[collection]));
                }
            });

            return true;
        } catch (e) {
            console.error('Store.importAll error:', e);
            return false;
        }
    },

    /* ----------------------------------------
       Utility: Clear All Data
       ---------------------------------------- */
    clearAll() {
        this._collections.forEach(collection => {
            localStorage.removeItem(this._key(collection));
        });
        localStorage.removeItem(this._settingsKey);
    },

    /* ----------------------------------------
       Utility: Get Collection Count
       ---------------------------------------- */
    count(collection) {
        return this.get(collection).length;
    },

    /* ----------------------------------------
       Utility: Query with filter
       ---------------------------------------- */
    query(collection, filterFn) {
        return this.get(collection).filter(filterFn);
    }
};
