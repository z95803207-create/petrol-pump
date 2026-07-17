(function() {
    // 1. Register translations
    Lang.register({
        en: {
            'inv_title': 'Inventory Management',
            'inv_add_stock': 'Add Stock',
            'inv_current_stock': 'Current Stock',
            'inv_capacity': 'Capacity',
            'inv_rate': 'Rate',
            'inv_low_stock': '⚠️ Low Stock!',
            'inv_supplier': 'Supplier Name',
            'inv_vehicle_no': 'Vehicle / Tanker No',
            'inv_qty_added': 'Quantity Added',
            'inv_previous': 'Previous Stock',
            'inv_new_stock': 'New Stock',
            'inv_update_rate': 'Update Rate',
            'inv_stock_history': 'Stock Entry History',
            'inv_liters': 'L',
            'inv_kg': 'kg',
            'inv_save': 'Save',
            'inv_cancel': 'Cancel',
            'inv_date': 'Date',
            'inv_fuel_type': 'Fuel Type',
            'inv_select_fuel': 'Select Fuel Type',
            'inv_filter_all': 'All Fuels',
            'inv_stock_added': 'Stock added successfully!',
            'inv_rate_updated': 'Fuel rate updated successfully!',
            'inv_no_entries': 'No stock entries found',
            'inv_new_rate': 'New Rate',
            'inv_per_unit': 'per',
            'inv_stock_overview': 'Stock Overview',
            'inv_quantity': 'Quantity'
        },
        ur: {
            'inv_title': 'ذخیرہ کا انتظام',
            'inv_add_stock': 'ذخیرہ شامل کریں',
            'inv_current_stock': 'موجودہ ذخیرہ',
            'inv_capacity': 'گنجائش',
            'inv_rate': 'ریٹ',
            'inv_low_stock': '⚠️ ذخیرہ کم ہے!',
            'inv_supplier': 'سپلائر کا نام',
            'inv_vehicle_no': 'گاڑی / ٹینکر نمبر',
            'inv_qty_added': 'شامل کی گئی مقدار',
            'inv_previous': 'پچھلا ذخیرہ',
            'inv_new_stock': 'نیا ذخیرہ',
            'inv_update_rate': 'ریٹ تبدیل کریں',
            'inv_stock_history': 'ذخیرہ اندراج کی تاریخ',
            'inv_liters': 'لیٹر',
            'inv_kg': 'کلو',
            'inv_save': 'محفوظ کریں',
            'inv_cancel': 'منسوخ',
            'inv_date': 'تاریخ',
            'inv_fuel_type': 'ایندھن کی قسم',
            'inv_select_fuel': 'ایندھن کی قسم منتخب کریں',
            'inv_filter_all': 'تمام ایندھن',
            'inv_stock_added': 'ذخیرہ کامیابی سے شامل ہو گیا!',
            'inv_rate_updated': 'ایندھن کا ریٹ کامیابی سے تبدیل ہو گیا!',
            'inv_no_entries': 'کوئی ذخیرہ اندراج نہیں ملا',
            'inv_new_rate': 'نیا ریٹ',
            'inv_per_unit': 'فی',
            'inv_stock_overview': 'ذخیرہ کا جائزہ',
            'inv_quantity': 'مقدار'
        }
    });

    // 2. Helper functions
    var currentFuelFilter = '';

    function getFuelDisplayName(fuel) {
        if (Lang.isUrdu() && fuel.nameUr) return fuel.nameUr;
        return fuel.name || '';
    }

    function getUnit(fuelId) {
        return fuelId === 'cng' ? Lang.t('inv_kg') : Lang.t('inv_liters');
    }

    function getStockPercent(current, capacity) {
        if (!capacity || capacity <= 0) return 0;
        return Math.min(100, Math.max(0, (current / capacity) * 100));
    }

    function getStockColor(percent) {
        if (percent > 50) return '#27ae60';
        if (percent >= 25) return '#f39c12';
        return '#e74c3c';
    }

    function getCardClass(percent) {
        if (percent > 50) return 'success';
        if (percent >= 25) return 'warning';
        return 'danger';
    }

    function showAddStockModal() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];

        var fuelOptions = '<option value="">' + Lang.t('inv_select_fuel') + '</option>';
        fuelTypes.forEach(function(f) {
            fuelOptions += '<option value="' + f.id + '">' + getFuelDisplayName(f) + ' (' + (Number(f.currentStock) || 0).toLocaleString() + ' / ' + (Number(f.tankCapacity) || 0).toLocaleString() + ' ' + getUnit(f.id) + ')</option>';
        });

        var today = new Date().toISOString().split('T')[0];

        var html = '<div class="modal-header"><h3 class="modal-title">📦 ' + Lang.t('inv_add_stock') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('inv_fuel_type') + '</label>' +
                    '<select class="form-select" id="inv-fuel-type">' + fuelOptions + '</select>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('inv_qty_added') + '</label>' +
                        '<input type="number" class="form-input" id="inv-quantity" step="0.01" min="0" placeholder="0.00">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('inv_supplier') + '</label>' +
                        '<input type="text" class="form-input" id="inv-supplier" placeholder="">' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('inv_vehicle_no') + '</label>' +
                        '<input type="text" class="form-input" id="inv-vehicle" placeholder="">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('inv_date') + '</label>' +
                        '<input type="date" class="form-input" id="inv-date" value="' + today + '">' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="inv-cancel">' + Lang.t('inv_cancel') + '</button>' +
                '<button class="btn btn-primary" id="inv-save">' + Lang.t('inv_save') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var cancelBtn = document.getElementById('inv-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('inv-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var fuelTypeId = document.getElementById('inv-fuel-type').value;
                    var quantity = Number(document.getElementById('inv-quantity').value);
                    var supplier = document.getElementById('inv-supplier').value;
                    var vehicle = document.getElementById('inv-vehicle').value;
                    var date = document.getElementById('inv-date').value;

                    if (!fuelTypeId || !quantity || quantity <= 0) {
                        App.showToast('Please fill all required fields', 'error');
                        return;
                    }

                    var settings = Store.getSettings();
                    var fuelInfo = (settings.fuelTypes || []).find(function(f) { return f.id === fuelTypeId; });

                    if (!fuelInfo) {
                        App.showToast('Fuel type not found', 'error');
                        return;
                    }

                    var previousStock = Number(fuelInfo.currentStock) || 0;
                    var newStock = previousStock + quantity;

                    // Update settings
                    fuelInfo.currentStock = newStock;
                    Store.saveSettings(settings);

                    // Add stock entry log
                    Store.add('stock_entries', {
                        fuelType: fuelTypeId,
                        fuelName: fuelInfo.name,
                        quantity: quantity,
                        supplier: supplier,
                        vehicleNo: vehicle,
                        date: date || new Date().toISOString().split('T')[0],
                        previousStock: previousStock,
                        newStock: newStock
                    });

                    App.closeModal();
                    App.showToast(Lang.t('inv_stock_added'), 'success');
                    App.rerender();
                });
            }
        }, 100);
    }

    function showUpdateRateModal(fuelId) {
        var settings = Store.getSettings();
        var fuelInfo = (settings.fuelTypes || []).find(function(f) { return f.id === fuelId; });
        if (!fuelInfo) return;

        var unit = getUnit(fuelId);

        var html = '<div class="modal-header"><h3 class="modal-title">💲 ' + Lang.t('inv_update_rate') + ' - ' + getFuelDisplayName(fuelInfo) + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('inv_rate') + ' (' + Lang.t('inv_per_unit') + ' ' + unit + ')</label>' +
                    '<input type="number" class="form-input" id="inv-new-rate" step="0.01" min="0" value="' + (Number(fuelInfo.rate) || 0) + '">' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="inv-rate-cancel">' + Lang.t('inv_cancel') + '</button>' +
                '<button class="btn btn-primary" id="inv-rate-save">' + Lang.t('inv_save') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var cancelBtn = document.getElementById('inv-rate-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('inv-rate-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var newRate = Number(document.getElementById('inv-new-rate').value);
                    if (!newRate || newRate <= 0) {
                        App.showToast('Please enter a valid rate', 'error');
                        return;
                    }

                    var settings = Store.getSettings();
                    var fuel = (settings.fuelTypes || []).find(function(f) { return f.id === fuelId; });
                    if (fuel) {
                        fuel.rate = newRate;
                        Store.saveSettings(settings);
                    }

                    App.closeModal();
                    App.showToast(Lang.t('inv_rate_updated'), 'success');
                    App.rerender();
                });
            }
        }, 100);
    }

    // 3. Render function
    function render() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var stockEntries = Store.get('stock_entries') || [];

        // Page Header
        var headerHtml = '<div class="page-header"><h1 class="page-title">📦 ' + Lang.t('inv_title') + '</h1>' +
            '<button class="btn btn-primary" id="inv-add-btn">➕ ' + Lang.t('inv_add_stock') + '</button></div>';

        // Current Stock Cards
        var stockCardsHtml = '<div class="card mb-2"><div class="card-header"><div class="card-title">📊 ' + Lang.t('inv_stock_overview') + '</div></div><div class="card-body"><div class="stats-grid">';
        fuelTypes.forEach(function(fuel) {
            var current = Number(fuel.currentStock) || 0;
            var capacity = Number(fuel.tankCapacity) || 1;
            var percent = getStockPercent(current, capacity);
            var color = getStockColor(percent);
            var unit = getUnit(fuel.id);
            var cardClass = getCardClass(percent);
            var lowWarning = percent < 20 ? '<div class="mt-1"><span class="badge badge-danger">' + Lang.t('inv_low_stock') + '</span></div>' : '';

            stockCardsHtml += '<div class="stat-card ' + cardClass + '">' +
                '<div class="stat-icon">⛽</div>' +
                '<div class="stat-value">' + current.toLocaleString() + ' ' + unit + '</div>' +
                '<div class="stat-label">' + getFuelDisplayName(fuel) + '</div>' +
                '<div class="mt-1 mb-1"><small class="text-muted">' + Lang.t('inv_capacity') + ': ' + capacity.toLocaleString() + ' ' + unit + '</small></div>' +
                '<div class="progress-bar"><div class="progress-fill" style="width:' + percent.toFixed(1) + '%;background:' + color + '"></div></div>' +
                '<div class="mt-1"><small class="text-muted">' + Lang.t('inv_rate') + ': ' + App.formatCurrency(fuel.rate) + ' ' + Lang.t('inv_per_unit') + ' ' + unit + '</small></div>' +
                lowWarning +
                '<div class="mt-1"><button class="btn btn-sm btn-secondary" data-inv-update-rate="' + fuel.id + '">💲 ' + Lang.t('inv_update_rate') + '</button></div>' +
            '</div>';
        });
        stockCardsHtml += '</div></div></div>';

        // Stock Entries Table
        var filteredEntries = stockEntries;
        if (currentFuelFilter) {
            filteredEntries = filteredEntries.filter(function(e) { return e.fuelType === currentFuelFilter; });
        }
        filteredEntries = filteredEntries.sort(function(a, b) {
            return (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || '');
        });

        var fuelFilterOptions = '<option value="">' + Lang.t('inv_filter_all') + '</option>';
        fuelTypes.forEach(function(f) {
            var sel = currentFuelFilter === f.id ? ' selected' : '';
            fuelFilterOptions += '<option value="' + f.id + '"' + sel + '>' + getFuelDisplayName(f) + '</option>';
        });

        var tableHtml = '<div class="card"><div class="card-header"><div class="card-title">📋 ' + Lang.t('inv_stock_history') + '</div>' +
            '<select class="form-select" id="inv-fuel-filter" style="width:auto;min-width:150px;">' + fuelFilterOptions + '</select>' +
            '</div><div class="card-body">';

        if (filteredEntries.length === 0) {
            tableHtml += '<div class="empty-state"><div class="empty-state-icon">📦</div><div class="empty-state-text">' + Lang.t('inv_no_entries') + '</div></div>';
        } else {
            tableHtml += '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('inv_date') + '</th>' +
                '<th>' + Lang.t('inv_fuel_type') + '</th>' +
                '<th>' + Lang.t('inv_qty_added') + '</th>' +
                '<th>' + Lang.t('inv_supplier') + '</th>' +
                '<th>' + Lang.t('inv_vehicle_no') + '</th>' +
                '<th>' + Lang.t('inv_previous') + '</th>' +
                '<th>' + Lang.t('inv_new_stock') + '</th>' +
                '</tr></thead><tbody>';
            filteredEntries.forEach(function(entry) {
                var unit = getUnit(entry.fuelType);
                tableHtml += '<tr>' +
                    '<td>' + App.formatDate(entry.date) + '</td>' +
                    '<td>' + (entry.fuelName || entry.fuelType || '-') + '</td>' +
                    '<td class="text-success"><strong>+' + (Number(entry.quantity) || 0).toLocaleString() + ' ' + unit + '</strong></td>' +
                    '<td>' + (entry.supplier || '-') + '</td>' +
                    '<td>' + (entry.vehicleNo || '-') + '</td>' +
                    '<td>' + (Number(entry.previousStock) || 0).toLocaleString() + ' ' + unit + '</td>' +
                    '<td>' + (Number(entry.newStock) || 0).toLocaleString() + ' ' + unit + '</td>' +
                '</tr>';
            });
            tableHtml += '</tbody></table></div>';
        }
        tableHtml += '</div></div>';

        return '<div class="page">' + headerHtml + stockCardsHtml + tableHtml + '</div>';
    }

    // 4. Init function
    function init() {
        var addBtn = document.getElementById('inv-add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function() { showAddStockModal(); });
        }

        var fuelFilter = document.getElementById('inv-fuel-filter');
        if (fuelFilter) {
            fuelFilter.addEventListener('change', function() {
                currentFuelFilter = fuelFilter.value;
                App.rerender();
            });
        }

        // Update rate buttons
        var rateBtns = document.querySelectorAll('[data-inv-update-rate]');
        rateBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var fuelId = btn.getAttribute('data-inv-update-rate');
                showUpdateRateModal(fuelId);
            });
        });
    }

    // 5. Register with App
    App.registerModule('inventory', { render: render, init: init });
})();
