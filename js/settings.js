(function() {
    // ── Register Translations ──────────────────────────────────────────
    Lang.register({
        en: {
            'set_title': 'Settings',
            'set_pump_info': 'Pump Information',
            'set_pump_name': 'Pump Name (English)',
            'set_pump_name_ur': 'Pump Name (Urdu)',
            'set_address': 'Address',
            'set_phone': 'Phone',
            'set_fuel_types': 'Fuel Types & Rates',
            'set_fuel_name': 'Fuel Name',
            'set_fuel_name_ur': 'Fuel Name (Urdu)',
            'set_rate': 'Rate',
            'set_tank_capacity': 'Tank Capacity (L)',
            'set_add_fuel': 'Add Fuel Type',
            'set_edit_rate': 'Edit Rate',
            'set_delete_fuel': 'Delete Fuel Type',
            'set_shifts': 'Shift Settings',
            'set_shift_count': 'Number of Shifts',
            'set_language': 'Language / زبان',
            'set_current_lang': 'Current Language',
            'set_toggle_lang': 'Switch Language',
            'set_backup': 'Data Backup & Restore',
            'set_export': 'Export Data',
            'set_import': 'Import Data',
            'set_import_warning': '⚠️ Importing data will overwrite ALL existing data. This action cannot be undone!',
            'set_clear_data': 'Clear All Data',
            'set_clear_warning': 'This will permanently delete ALL data including sales, customers, expenses, and employees. This action CANNOT be undone!',
            'set_clear_confirm': 'Are you absolutely sure? Type "DELETE" to confirm.',
            'set_saved': 'Settings saved successfully!',
            'set_english': 'English',
            'set_urdu': 'اردو (Urdu)',
            'set_data_backup': 'Data Management',
            'set_danger_zone': '⚠️ Danger Zone',
            'set_per_liter': 'per liter',
            'set_per_kg': 'per kg',
            'set_save': 'Save',
            'set_cancel': 'Cancel',
            'set_fuel_added': 'Fuel type added!',
            'set_fuel_deleted': 'Fuel type deleted!',
            'set_rate_updated': 'Rate updated!',
            'set_delete_fuel_confirm': 'Are you sure you want to delete this fuel type?',
            'set_import_success': 'Data imported successfully!',
            'set_import_error': 'Error importing data. Please check the file.',
            'set_data_cleared': 'All data has been cleared!',
            'set_export_desc': 'Download a backup of all your data as a JSON file.',
            'set_import_desc': 'Restore data from a previously exported backup file.',
            'set_lang_note': 'Language can also be toggled from the header bar.',
            'set_current_stock': 'Current Stock'
        },
        ur: {
            'set_title': 'ترتیبات',
            'set_pump_info': 'پمپ کی معلومات',
            'set_pump_name': 'پمپ کا نام (انگریزی)',
            'set_pump_name_ur': 'پمپ کا نام (اردو)',
            'set_address': 'پتہ',
            'set_phone': 'فون',
            'set_fuel_types': 'ایندھن کی اقسام اور نرخ',
            'set_fuel_name': 'ایندھن کا نام',
            'set_fuel_name_ur': 'ایندھن کا نام (اردو)',
            'set_rate': 'نرخ',
            'set_tank_capacity': 'ٹینک کی گنجائش (لیٹر)',
            'set_add_fuel': 'نئی ایندھن کی قسم',
            'set_edit_rate': 'نرخ تبدیل کریں',
            'set_delete_fuel': 'ایندھن حذف کریں',
            'set_shifts': 'شفٹ ترتیبات',
            'set_shift_count': 'شفٹوں کی تعداد',
            'set_language': 'زبان / Language',
            'set_current_lang': 'موجودہ زبان',
            'set_toggle_lang': 'زبان تبدیل کریں',
            'set_backup': 'ڈیٹا بیک اپ اور بحالی',
            'set_export': 'ڈیٹا ایکسپورٹ',
            'set_import': 'ڈیٹا امپورٹ',
            'set_import_warning': '⚠️ ڈیٹا امپورٹ کرنے سے تمام موجودہ ڈیٹا اوور رائٹ ہو جائے گا۔ یہ عمل واپس نہیں ہو سکتا!',
            'set_clear_data': 'تمام ڈیٹا صاف کریں',
            'set_clear_warning': 'یہ تمام ڈیٹا بشمول فروخت، گاہک، اخراجات، اور ملازمین کو مستقل طور پر حذف کر دے گا۔ یہ عمل واپس نہیں ہو سکتا!',
            'set_clear_confirm': 'کیا آپ بالکل یقین رکھتے ہیں؟ تصدیق کے لیے "DELETE" ٹائپ کریں۔',
            'set_saved': 'ترتیبات کامیابی سے محفوظ ہو گئیں!',
            'set_english': 'English (انگریزی)',
            'set_urdu': 'اردو',
            'set_data_backup': 'ڈیٹا مینجمنٹ',
            'set_danger_zone': '⚠️ خطرناک علاقہ',
            'set_per_liter': 'فی لیٹر',
            'set_per_kg': 'فی کلو',
            'set_save': 'محفوظ کریں',
            'set_cancel': 'منسوخ',
            'set_fuel_added': 'ایندھن کی قسم شامل ہو گئی!',
            'set_fuel_deleted': 'ایندھن کی قسم حذف ہو گئی!',
            'set_rate_updated': 'نرخ اپ ڈیٹ ہو گیا!',
            'set_delete_fuel_confirm': 'کیا آپ واقعی یہ ایندھن کی قسم حذف کرنا چاہتے ہیں؟',
            'set_import_success': 'ڈیٹا کامیابی سے امپورٹ ہو گیا!',
            'set_import_error': 'ڈیٹا امپورٹ میں خرابی۔ براہ کرم فائل چیک کریں۔',
            'set_data_cleared': 'تمام ڈیٹا صاف ہو گیا!',
            'set_export_desc': 'اپنے تمام ڈیٹا کا بیک اپ JSON فائل کے طور پر ڈاؤن لوڈ کریں۔',
            'set_import_desc': 'پہلے سے ایکسپورٹ شدہ بیک اپ فائل سے ڈیٹا بحال کریں۔',
            'set_lang_note': 'زبان ہیڈر بار سے بھی تبدیل کی جا سکتی ہے۔',
            'set_current_stock': 'موجودہ اسٹاک'
        }
    });

    var liveRates = null;

    // ── Render ──────────────────────────────────────────────────────────
    function render() {
        var settings = Store.getSettings() || {};
        var fuelTypes = settings.fuelTypes || [];
        var user = Store.getCurrentUser() || {};
        if (!settings.passwords) {
            settings.passwords = { admin: 'admin123', manager1: 'manager123', manager2: 'manager223' };
        }

        // Fuel types table rows
        var fuelRows = '';
        if (fuelTypes.length === 0) {
            fuelRows = '<tr><td colspan="6" class="text-center text-muted">—</td></tr>';
        } else {
            fuelTypes.forEach(function(ft) {
                fuelRows += '<tr>' +
                    '<td>' + (ft.name || '') + '</td>' +
                    '<td>' + (ft.nameUr || '') + '</td>' +
                    '<td class="text-right">' + App.formatCurrency(ft.rate || 0) + '</td>' +
                    '<td class="text-right">' + (ft.tankCapacity || 0) + ' L</td>' +
                    '<td class="text-right">' + (ft.currentStock || 0).toFixed(1) + ' L</td>' +
                    '<td>' +
                        '<button class="btn btn-secondary btn-sm set-edit-rate-btn" data-id="' + ft.id + '" style="margin-right:4px;">✏️ ' + Lang.t('set_edit_rate') + '</button>' +
                        '<button class="btn btn-danger btn-sm set-delete-fuel-btn" data-id="' + ft.id + '">🗑 ' + Lang.t('set_delete_fuel') + '</button>' +
                    '</td>' +
                '</tr>';
            });
        }

        var adminSecurityCard = '';
        if (user.role === 'admin') {
            adminSecurityCard = '<div class="card mt-2"><div class="card-header"><h3 class="card-title">🔑 ' + Lang.t('login_select_portal') + ' ' + Lang.t('nav_settings') + '</h3></div><div class="card-body">' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('role_admin') + ' - ' + Lang.t('enter_password') + '</label>' +
                        '<input type="password" class="form-input" id="set_pwd_admin" value="' + (settings.passwords.admin || 'admin123') + '"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('role_manager') + ' - ' + Lang.t('enter_password') + '</label>' +
                        '<input type="password" class="form-input" id="set_pwd_manager" value="' + (settings.passwords.manager || 'manager123') + '"></div>' +
                '</div>' +
                '<button class="btn btn-primary" id="set_save_passwords">💾 ' + Lang.t('set_save') + '</button>' +
            '</div></div>';
        }

        var rateSyncCard = '<div class="card mt-2 rates-sync-card"><div class="card-header"><h3 class="card-title">🇵🇰 ' + Lang.t('rates_sync_title') + '</h3></div><div class="card-body">' +
            '<p class="text-secondary mb-2">' + Lang.t('rates_sync_desc') + '</p>' +
            '<div id="ratesSyncStatus" class="mb-2"></div>' +
            '<div class="rates-sync-comparison" id="ratesSyncComparison" style="display: none; margin-bottom: 16px;">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                    '<th>' + Lang.t('fuel_type') + '</th>' +
                    '<th class="text-right">' + Lang.t('current_pump_price') + '</th>' +
                    '<th class="text-right">' + Lang.t('pakistan_market') + '</th>' +
                '</tr></thead><tbody>' +
                    '<tr>' +
                        '<td><strong>' + Lang.t('petrol') + '</strong></td>' +
                        '<td class="text-right">' + App.formatCurrency((fuelTypes.find(function(f) { return f.id === 'petrol'; }) || {}).rate || 0) + '</td>' +
                        '<td class="text-right text-success"><strong id="compare_petrol_val">' + (liveRates ? App.formatCurrency(liveRates.petrol) : 'Loading...') + '</strong></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><strong>' + Lang.t('diesel') + '</strong></td>' +
                        '<td class="text-right">' + App.formatCurrency((fuelTypes.find(function(f) { return f.id === 'diesel'; }) || {}).rate || 0) + '</td>' +
                        '<td class="text-right text-success"><strong id="compare_diesel_val">' + (liveRates ? App.formatCurrency(liveRates.diesel) : 'Loading...') + '</strong></td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td><strong>' + Lang.t('cng') + '</strong></td>' +
                        '<td class="text-right">' + App.formatCurrency((fuelTypes.find(function(f) { return f.id === 'cng'; }) || {}).rate || 0) + '</td>' +
                        '<td class="text-right text-success"><strong id="compare_cng_val">' + (liveRates ? App.formatCurrency(liveRates.cng) : 'Loading...') + '</strong></td>' +
                    '</tr>' +
                '</tbody></table></div>' +
                '<button class="btn btn-success mt-2" id="btnSyncRatesApply">⚡ ' + Lang.t('apply_new_rates') + '</button>' +
            '</div>' +
            '<button class="btn btn-primary" id="btnCheckLiveRates">📡 ' + Lang.t('check_live_rates') + '</button>' +
        '</div></div>';

        var currentLangLabel = Lang.isUrdu() ? Lang.t('set_urdu') : Lang.t('set_english');

        return '<div class="page">' +
            '<div class="page-header"><h1 class="page-title">⚙️ ' + Lang.t('set_title') + '</h1></div>' +

            // Pump Info Card
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">🏢 ' + Lang.t('set_pump_info') + '</h3></div><div class="card-body">' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_pump_name') + '</label>' +
                        '<input type="text" class="form-input" id="set_pump_name" value="' + (settings.pumpName || '') + '"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_pump_name_ur') + '</label>' +
                        '<input type="text" class="form-input" id="set_pump_name_ur" value="' + (settings.pumpNameUr || '') + '" dir="rtl"></div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_address') + '</label>' +
                        '<textarea class="form-textarea" id="set_address" rows="2">' + (settings.address || '') + '</textarea></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_phone') + '</label>' +
                        '<input type="text" class="form-input" id="set_phone" value="' + (settings.phone || '') + '"></div>' +
                '</div>' +
                '<button class="btn btn-primary" id="set_save_info">💾 ' + Lang.t('set_save') + '</button>' +
            '</div></div>' +

            // Fuel Types Card
            '<div class="card mt-2"><div class="card-header flex-between"><h3 class="card-title">⛽ ' + Lang.t('set_fuel_types') + '</h3>' +
                '<button class="btn btn-primary btn-sm" id="set_add_fuel_btn">➕ ' + Lang.t('set_add_fuel') + '</button></div><div class="card-body">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                    '<th>' + Lang.t('set_fuel_name') + '</th>' +
                    '<th>' + Lang.t('set_fuel_name_ur') + '</th>' +
                    '<th class="text-right">' + Lang.t('set_rate') + '</th>' +
                    '<th class="text-right">' + Lang.t('set_tank_capacity') + '</th>' +
                    '<th class="text-right">' + Lang.t('set_current_stock') + '</th>' +
                    '<th>' + '</th>' +
                '</tr></thead><tbody>' + fuelRows + '</tbody></table></div>' +
            '</div></div>' +

            // Shift Settings Card
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">🔄 ' + Lang.t('set_shifts') + '</h3></div><div class="card-body">' +
                '<div class="form-group"><label class="form-label">' + Lang.t('set_shift_count') + '</label>' +
                    '<select class="form-select" id="set_shift_count" style="max-width:200px;">' +
                        '<option value="2"' + ((settings.shifts || 2) == 2 ? ' selected' : '') + '>2</option>' +
                        '<option value="3"' + (settings.shifts == 3 ? ' selected' : '') + '>3</option>' +
                    '</select></div>' +
                '<button class="btn btn-primary" id="set_save_shifts">💾 ' + Lang.t('set_save') + '</button>' +
            '</div></div>' +

            adminSecurityCard +
            rateSyncCard +

            // Language Card
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">🌐 ' + Lang.t('set_language') + '</h3></div><div class="card-body">' +
                '<div class="mb-2"><span class="text-muted">' + Lang.t('set_current_lang') + ': </span><strong>' + currentLangLabel + '</strong></div>' +
                '<button class="btn btn-primary" id="set_toggle_lang" style="font-size:1.1em;padding:12px 28px;">' +
                    '🌐 ' + Lang.t('set_toggle_lang') + ' → ' + (Lang.isUrdu() ? 'English' : 'اردو') +
                '</button>' +
                '<div class="mt-1 text-muted" style="font-size:0.9em;">ℹ️ ' + Lang.t('set_lang_note') + '</div>' +
            '</div></div>' +

            // Data Backup & Restore Card
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">💾 ' + Lang.t('set_data_backup') + '</h3></div><div class="card-body">' +
                '<div class="mb-2">' +
                    '<h4 style="margin-bottom:8px;">📤 ' + Lang.t('set_export') + '</h4>' +
                    '<p class="text-muted mb-1" style="font-size:0.9em;">' + Lang.t('set_export_desc') + '</p>' +
                    '<button class="btn btn-success" id="set_export_btn">📤 ' + Lang.t('set_export') + '</button>' +
                '</div>' +
                '<hr style="border-color:rgba(255,255,255,0.1);margin:20px 0;">' +
                '<div>' +
                    '<h4 style="margin-bottom:8px;">📥 ' + Lang.t('set_import') + '</h4>' +
                    '<p class="text-muted mb-1" style="font-size:0.9em;">' + Lang.t('set_import_desc') + '</p>' +
                    '<div class="badge badge-warning mb-2" style="font-size:0.85em;padding:8px 12px;display:inline-block;">' + Lang.t('set_import_warning') + '</div>' +
                    '<div class="flex" style="gap:12px;flex-wrap:wrap;align-items:center;">' +
                        '<input type="file" id="set_import_file" accept=".json" class="form-input" style="max-width:300px;">' +
                        '<button class="btn btn-primary" id="set_import_btn">📥 ' + Lang.t('set_import') + '</button>' +
                    '</div>' +
                '</div>' +
            '</div></div>' +

            // Danger Zone
            '<div class="card mt-2" style="border:2px solid #e74c3c;">' +
                '<div class="card-header" style="background:rgba(231,76,60,0.15);"><h3 class="card-title text-danger">' + Lang.t('set_danger_zone') + '</h3></div>' +
                '<div class="card-body">' +
                    '<p class="text-danger mb-2" style="font-size:0.95em;">' + Lang.t('set_clear_warning') + '</p>' +
                    '<button class="btn btn-danger" id="set_clear_btn" style="font-size:1.1em;padding:12px 32px;">🗑 ' + Lang.t('set_clear_data') + '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    // ── Add Fuel Type Modal ─────────────────────────────────────────────
    function showAddFuelModal() {
        var html = '<div class="modal-header"><h3 class="modal-title">➕ ' + Lang.t('set_add_fuel') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_fuel_name') + '</label>' +
                        '<input type="text" class="form-input" id="set_fuel_form_name" placeholder="e.g. Petrol"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_fuel_name_ur') + '</label>' +
                        '<input type="text" class="form-input" id="set_fuel_form_name_ur" dir="rtl" placeholder="مثلاً پٹرول"></div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_rate') + ' (' + Lang.t('set_per_liter') + ')</label>' +
                        '<input type="number" class="form-input" id="set_fuel_form_rate" min="0" step="0.01" placeholder="0.00"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('set_tank_capacity') + '</label>' +
                        '<input type="number" class="form-input" id="set_fuel_form_capacity" min="0" placeholder="0"></div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="set_fuel_form_cancel">' + Lang.t('set_cancel') + '</button>' +
                '<button class="btn btn-primary" id="set_fuel_form_save">' + Lang.t('set_save') + '</button>' +
            '</div>';
        App.showModal(html);

        setTimeout(function() {
            document.getElementById('set_fuel_form_cancel').addEventListener('click', function() { App.closeModal(); });
            document.getElementById('set_fuel_form_save').addEventListener('click', function() {
                var name = document.getElementById('set_fuel_form_name').value.trim();
                var nameUr = document.getElementById('set_fuel_form_name_ur').value.trim();
                var rate = parseFloat(document.getElementById('set_fuel_form_rate').value) || 0;
                var capacity = parseFloat(document.getElementById('set_fuel_form_capacity').value) || 0;
                if (!name) { App.showToast(Lang.t('set_fuel_name') + '!', 'error'); return; }

                var settings = Store.getSettings();
                var fuelTypes = settings.fuelTypes || [];
                fuelTypes.push({
                    id: 'fuel_' + Date.now(),
                    name: name,
                    nameUr: nameUr,
                    rate: rate,
                    tankCapacity: capacity,
                    currentStock: 0
                });
                settings.fuelTypes = fuelTypes;
                Store.saveSettings(settings);
                App.closeModal();
                App.showToast(Lang.t('set_fuel_added'), 'success');
                App.rerender();
            });
        }, 50);
    }

    // ── Edit Rate Modal ─────────────────────────────────────────────────
    function showEditRateModal(fuelId) {
        var settings = Store.getSettings();
        var fuelTypes = settings.fuelTypes || [];
        var fuel = fuelTypes.find(function(f) { return f.id === fuelId; });
        if (!fuel) return;

        var html = '<div class="modal-header"><h3 class="modal-title">✏️ ' + Lang.t('set_edit_rate') + ' — ' + fuel.name + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group"><label class="form-label">' + Lang.t('set_rate') + ' (' + Lang.t('set_per_liter') + ')</label>' +
                    '<input type="number" class="form-input" id="set_rate_input" min="0" step="0.01" value="' + (fuel.rate || 0) + '"></div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="set_rate_cancel">' + Lang.t('set_cancel') + '</button>' +
                '<button class="btn btn-primary" id="set_rate_save">' + Lang.t('set_save') + '</button>' +
            '</div>';
        App.showModal(html);

        setTimeout(function() {
            document.getElementById('set_rate_cancel').addEventListener('click', function() { App.closeModal(); });
            document.getElementById('set_rate_save').addEventListener('click', function() {
                var newRate = parseFloat(document.getElementById('set_rate_input').value) || 0;
                var s = Store.getSettings();
                var ft = (s.fuelTypes || []).find(function(f) { return f.id === fuelId; });
                if (ft) {
                    ft.rate = newRate;
                    Store.saveSettings(s);
                    App.closeModal();
                    App.showToast(Lang.t('set_rate_updated'), 'success');
                    App.rerender();
                }
            });
        }, 50);
    }

    // ── Init ────────────────────────────────────────────────────────────
    function init() {
        // Save pump info
        var saveInfo = document.getElementById('set_save_info');
        if (saveInfo) saveInfo.addEventListener('click', function() {
            var settings = Store.getSettings();
            settings.pumpName = document.getElementById('set_pump_name').value.trim();
            settings.pumpNameUr = document.getElementById('set_pump_name_ur').value.trim();
            settings.address = document.getElementById('set_address').value.trim();
            settings.phone = document.getElementById('set_phone').value.trim();
            Store.saveSettings(settings);
            App.showToast(Lang.t('set_saved'), 'success');
        });

        // Save shift settings
        var saveShifts = document.getElementById('set_save_shifts');
        if (saveShifts) saveShifts.addEventListener('click', function() {
            var settings = Store.getSettings();
            settings.shifts = parseInt(document.getElementById('set_shift_count').value) || 2;
            Store.saveSettings(settings);
            App.showToast(Lang.t('set_saved'), 'success');
        });

        // Save custom passwords (Admin only)
        var savePasswords = document.getElementById('set_save_passwords');
        if (savePasswords) savePasswords.addEventListener('click', function() {
            var settings = Store.getSettings();
            if (!settings.passwords) settings.passwords = {};
            settings.passwords.admin = document.getElementById('set_pwd_admin').value;
            settings.passwords.manager = document.getElementById('set_pwd_manager').value;
            Store.saveSettings(settings);
            App.showToast(Lang.t('set_saved'), 'success');
        });

        // Pakistan Live rates check button
        var btnCheckLiveRates = document.getElementById('btnCheckLiveRates');
        if (btnCheckLiveRates) btnCheckLiveRates.addEventListener('click', function() {
            var ratesSyncStatus = document.getElementById('ratesSyncStatus');
            var ratesSyncComparison = document.getElementById('ratesSyncComparison');
            
            if (ratesSyncStatus) {
                ratesSyncStatus.innerHTML = '<span class="text-warning">📡 ' + Lang.t('rates_checking') + '</span>';
            }

            btnCheckLiveRates.disabled = true;

            App.fetchLiveRates(function(err, data) {
                if (err) {
                    console.error("Failed to check rates:", err);
                    if (ratesSyncStatus) {
                        ratesSyncStatus.innerHTML = '<span class="text-danger">❌ Failed to connect to server</span>';
                    }
                    btnCheckLiveRates.disabled = false;
                } else {
                    liveRates = data;
                    
                    if (ratesSyncStatus) {
                        ratesSyncStatus.innerHTML = '<span class="text-success">✅ ' + Lang.t('rates_up_to_date') + '</span>';
                    }
                    
                    // Update comparison table values dynamically
                    var petrolVal = document.getElementById('compare_petrol_val');
                    var dieselVal = document.getElementById('compare_diesel_val');
                    var cngVal = document.getElementById('compare_cng_val');
                    
                    if (petrolVal) petrolVal.textContent = App.formatCurrency(data.petrol);
                    if (dieselVal) dieselVal.textContent = App.formatCurrency(data.diesel);
                    if (cngVal) cngVal.textContent = App.formatCurrency(data.cng);

                    if (ratesSyncComparison) {
                        ratesSyncComparison.style.display = 'block';
                    }
                    btnCheckLiveRates.disabled = false;
                }
            });
        });

        // Pakistan Apply Sync rates button
        var btnSyncRatesApply = document.getElementById('btnSyncRatesApply');
        if (btnSyncRatesApply) btnSyncRatesApply.addEventListener('click', function() {
            if (!liveRates) return;
            var settings = Store.getSettings();
            settings.fuelTypes.forEach(function(f) {
                if (f.id === 'petrol') f.rate = liveRates.petrol;
                if (f.id === 'diesel') f.rate = liveRates.diesel;
                if (f.id === 'cng') f.rate = liveRates.cng;
            });
            Store.saveSettings(settings);
            App.showToast(Lang.t('rate_applied_success'), 'success');
            App.rerender();
        });

        // Add fuel type
        var addFuelBtn = document.getElementById('set_add_fuel_btn');
        if (addFuelBtn) addFuelBtn.addEventListener('click', showAddFuelModal);

        // Edit rate buttons
        document.querySelectorAll('.set-edit-rate-btn').forEach(function(btn) {
            btn.addEventListener('click', function() { showEditRateModal(btn.getAttribute('data-id')); });
        });

        // Delete fuel type buttons
        document.querySelectorAll('.set-delete-fuel-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (!confirm(Lang.t('set_delete_fuel_confirm'))) return;
                var fuelId = btn.getAttribute('data-id');
                var settings = Store.getSettings();
                settings.fuelTypes = (settings.fuelTypes || []).filter(function(f) { return f.id !== fuelId; });
                Store.saveSettings(settings);
                App.showToast(Lang.t('set_fuel_deleted'), 'success');
                App.rerender();
            });
        });

        // Toggle language
        var toggleLang = document.getElementById('set_toggle_lang');
        if (toggleLang) toggleLang.addEventListener('click', function() {
            Lang.current = Lang.isUrdu() ? 'en' : 'ur';
            if (typeof Lang.save === 'function') Lang.save();
            App.rerender();
        });

        // Export data
        var exportBtn = document.getElementById('set_export_btn');
        if (exportBtn) exportBtn.addEventListener('click', function() {
            var data = Store.exportAll();
            var blob = new Blob([data], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'petrol-pump-backup-' + new Date().toISOString().slice(0, 10) + '.json';
            a.click();
            URL.revokeObjectURL(url);
            App.showToast(Lang.t('set_export') + ' ✅', 'success');
        });

        // Import data
        var importBtn = document.getElementById('set_import_btn');
        if (importBtn) importBtn.addEventListener('click', function() {
            var fileInput = document.getElementById('set_import_file');
            if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                App.showToast(Lang.t('set_import') + '!', 'error');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var result = Store.importAll(e.target.result);
                    if (result) {
                        App.showToast(Lang.t('set_import_success'), 'success');
                        App.rerender();
                    } else {
                        App.showToast(Lang.t('set_import_error'), 'error');
                    }
                } catch (err) {
                    App.showToast(Lang.t('set_import_error'), 'error');
                }
            };
            reader.readAsText(fileInput.files[0]);
        });

        // Clear all data
        var clearBtn = document.getElementById('set_clear_btn');
        if (clearBtn) clearBtn.addEventListener('click', function() {
            var input = prompt(Lang.t('set_clear_confirm'));
            if (input === 'DELETE') {
                localStorage.clear();
                App.showToast(Lang.t('set_data_cleared'), 'success');
                App.rerender();
            }
        });
    }

    // ── Register ────────────────────────────────────────────────────────
    App.registerModule('settings', { render: render, init: init });
})();
