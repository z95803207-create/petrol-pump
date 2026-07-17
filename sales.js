(function() {
    // 1. Register translations
    Lang.register({
        en: {
            'sales_title': 'Sales Management',
            'sales_new': 'New Sale',
            'sales_fuel_type': 'Fuel Type',
            'sales_quantity': 'Quantity (Liters)',
            'sales_rate': 'Rate per Liter/kg',
            'sales_amount': 'Total Amount',
            'sales_payment': 'Payment Method',
            'sales_shift': 'Shift No',
            'sales_date': 'Date',
            'sales_cash': 'Cash',
            'sales_card': 'Card',
            'sales_upi': 'UPI',
            'sales_credit': 'Credit (Udhar)',
            'sales_customer_name': 'Customer Name',
            'sales_customer_phone': 'Customer Phone',
            'sales_total_sales': 'Total Sales',
            'sales_total_qty': 'Total Quantity',
            'sales_avg_sale': 'Average Sale',
            'sales_delete_confirm': 'Are you sure you want to delete this sale?',
            'sales_liters': 'L',
            'sales_filter_today': 'Today',
            'sales_filter_week': 'This Week',
            'sales_filter_month': 'This Month',
            'sales_filter_all': 'All Time',
            'sales_filter_fuel': 'All Fuels',
            'sales_filter_payment': 'All Payments',
            'sales_fuel': 'Fuel',
            'sales_qty': 'Qty',
            'sales_actions': 'Actions',
            'sales_delete': 'Delete',
            'sales_save': 'Save Sale',
            'sales_cancel': 'Cancel',
            'sales_no_sales': 'No sales found',
            'sales_added': 'Sale added successfully!',
            'sales_deleted': 'Sale deleted successfully!',
            'sales_select_fuel': 'Select Fuel Type',
            'sales_select_payment': 'Select Payment Method'
        },
        ur: {
            'sales_title': 'فروخت کا انتظام',
            'sales_new': 'نئی فروخت',
            'sales_fuel_type': 'ایندھن کی قسم',
            'sales_quantity': 'مقدار (لیٹر)',
            'sales_rate': 'فی لیٹر/کلو ریٹ',
            'sales_amount': 'کل رقم',
            'sales_payment': 'ادائیگی کا طریقہ',
            'sales_shift': 'شفٹ نمبر',
            'sales_date': 'تاریخ',
            'sales_cash': 'نقد',
            'sales_card': 'کارڈ',
            'sales_upi': 'یو پی آئی',
            'sales_credit': 'ادھار',
            'sales_customer_name': 'گاہک کا نام',
            'sales_customer_phone': 'گاہک کا فون',
            'sales_total_sales': 'کل فروخت',
            'sales_total_qty': 'کل مقدار',
            'sales_avg_sale': 'اوسط فروخت',
            'sales_delete_confirm': 'کیا آپ واقعی اس فروخت کو حذف کرنا چاہتے ہیں؟',
            'sales_liters': 'لیٹر',
            'sales_filter_today': 'آج',
            'sales_filter_week': 'اس ہفتے',
            'sales_filter_month': 'اس مہینے',
            'sales_filter_all': 'سب',
            'sales_filter_fuel': 'تمام ایندھن',
            'sales_filter_payment': 'تمام ادائیگیاں',
            'sales_fuel': 'ایندھن',
            'sales_qty': 'مقدار',
            'sales_actions': 'کارروائیاں',
            'sales_delete': 'حذف',
            'sales_save': 'فروخت محفوظ کریں',
            'sales_cancel': 'منسوخ',
            'sales_no_sales': 'کوئی فروخت نہیں ملی',
            'sales_added': 'فروخت کامیابی سے شامل ہو گئی!',
            'sales_deleted': 'فروخت کامیابی سے حذف ہو گئی!',
            'sales_select_fuel': 'ایندھن کی قسم منتخب کریں',
            'sales_select_payment': 'ادائیگی کا طریقہ منتخب کریں'
        }
    });

    // 2. Helper functions
    var currentFilter = 'today';
    var currentFuelFilter = '';
    var currentPaymentFilter = '';

    function getTodayStr() {
        return new Date().toISOString().split('T')[0];
    }

    function getWeekStart() {
        var now = new Date();
        var day = now.getDay();
        var diff = now.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(now.getFullYear(), now.getMonth(), diff).toISOString().split('T')[0];
    }

    function getMonthStart() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    }

    function getFilteredSales() {
        var sales = Store.get('sales') || [];
        var today = getTodayStr();
        var weekStart = getWeekStart();
        var monthStart = getMonthStart();

        sales = sales.filter(function(s) {
            if (currentFilter === 'today') return s.date && s.date.startsWith(today);
            if (currentFilter === 'week') return s.date && s.date >= weekStart;
            if (currentFilter === 'month') return s.date && s.date >= monthStart;
            return true;
        });

        if (currentFuelFilter) {
            sales = sales.filter(function(s) { return s.fuelType === currentFuelFilter; });
        }

        if (currentPaymentFilter) {
            sales = sales.filter(function(s) { return s.paymentMethod === currentPaymentFilter; });
        }

        return sales.sort(function(a, b) {
            return (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || '');
        });
    }

    function getFuelDisplayName(fuel) {
        if (Lang.isUrdu() && fuel.nameUr) return fuel.nameUr;
        return fuel.name || '';
    }

    function getPaymentLabel(method) {
        if (method === 'cash') return Lang.t('sales_cash');
        if (method === 'card') return Lang.t('sales_card');
        if (method === 'upi') return Lang.t('sales_upi');
        if (method === 'credit') return Lang.t('sales_credit');
        return method || '-';
    }

    function showNewSaleModal() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var shifts = (settings && settings.shifts) || 2;
        var today = getTodayStr();

        var fuelOptions = '<option value="">' + Lang.t('sales_select_fuel') + '</option>';
        fuelTypes.forEach(function(f) {
            fuelOptions += '<option value="' + f.id + '" data-rate="' + f.rate + '">' + getFuelDisplayName(f) + '</option>';
        });

        var shiftOptions = '';
        for (var i = 1; i <= shifts; i++) {
            shiftOptions += '<option value="' + i + '">' + i + '</option>';
        }

        var paymentOptions = '<option value="">' + Lang.t('sales_select_payment') + '</option>' +
            '<option value="cash">' + Lang.t('sales_cash') + '</option>' +
            '<option value="card">' + Lang.t('sales_card') + '</option>' +
            '<option value="upi">' + Lang.t('sales_upi') + '</option>' +
            '<option value="credit">' + Lang.t('sales_credit') + '</option>';

        var html = '<div class="modal-header"><h3 class="modal-title">💰 ' + Lang.t('sales_new') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_fuel_type') + '</label>' +
                        '<select class="form-select" id="sale-fuel-type">' + fuelOptions + '</select>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_quantity') + '</label>' +
                        '<input type="number" class="form-input" id="sale-quantity" step="0.01" min="0" placeholder="0.00">' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_rate') + '</label>' +
                        '<input type="number" class="form-input" id="sale-rate" step="0.01" min="0">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_amount') + '</label>' +
                        '<input type="number" class="form-input" id="sale-amount" readonly>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_payment') + '</label>' +
                        '<select class="form-select" id="sale-payment">' + paymentOptions + '</select>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('sales_shift') + '</label>' +
                        '<select class="form-select" id="sale-shift">' + shiftOptions + '</select>' +
                    '</div>' +
                '</div>' +
                '<div id="sale-credit-fields" style="display:none;">' +
                    '<div class="form-row">' +
                        '<div class="form-group">' +
                            '<label class="form-label">' + Lang.t('sales_customer_name') + '</label>' +
                            '<input type="text" class="form-input" id="sale-customer-name">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label class="form-label">' + Lang.t('sales_customer_phone') + '</label>' +
                            '<input type="text" class="form-input" id="sale-customer-phone">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('sales_date') + '</label>' +
                    '<input type="date" class="form-input" id="sale-date" value="' + today + '">' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="sale-cancel">' + Lang.t('sales_cancel') + '</button>' +
                '<button class="btn btn-primary" id="sale-save">' + Lang.t('sales_save') + '</button>' +
            '</div>';

        App.showModal(html);

        // Set up modal event listeners
        setTimeout(function() {
            var fuelSelect = document.getElementById('sale-fuel-type');
            var qtyInput = document.getElementById('sale-quantity');
            var rateInput = document.getElementById('sale-rate');
            var amountInput = document.getElementById('sale-amount');
            var paymentSelect = document.getElementById('sale-payment');
            var creditFields = document.getElementById('sale-credit-fields');

            function recalculate() {
                var qty = Number(qtyInput.value) || 0;
                var rate = Number(rateInput.value) || 0;
                amountInput.value = (qty * rate).toFixed(2);
            }

            if (fuelSelect) {
                fuelSelect.addEventListener('change', function() {
                    var selected = fuelSelect.options[fuelSelect.selectedIndex];
                    var rate = selected ? selected.getAttribute('data-rate') : '';
                    rateInput.value = rate || '';
                    recalculate();
                });
            }

            if (qtyInput) qtyInput.addEventListener('input', recalculate);
            if (rateInput) rateInput.addEventListener('input', recalculate);

            if (paymentSelect) {
                paymentSelect.addEventListener('change', function() {
                    if (creditFields) {
                        creditFields.style.display = paymentSelect.value === 'credit' ? 'block' : 'none';
                    }
                });
            }

            var cancelBtn = document.getElementById('sale-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('sale-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var fuelTypeId = fuelSelect.value;
                    var qty = Number(qtyInput.value);
                    var rate = Number(rateInput.value);
                    var amount = Number(amountInput.value);
                    var payment = paymentSelect.value;
                    var shift = document.getElementById('sale-shift').value;
                    var date = document.getElementById('sale-date').value;

                    if (!fuelTypeId || !qty || !rate || !payment) {
                        App.showToast('Please fill all required fields', 'error');
                        return;
                    }

                    var settings = Store.getSettings();
                    var fuelInfo = (settings.fuelTypes || []).find(function(f) { return f.id === fuelTypeId; });
                    var fuelName = fuelInfo ? getFuelDisplayName(fuelInfo) : fuelTypeId;

                    var saleData = {
                        fuelType: fuelTypeId,
                        fuelName: fuelInfo ? fuelInfo.name : fuelTypeId,
                        quantity: qty,
                        rate: rate,
                        amount: amount,
                        paymentMethod: payment,
                        shiftNo: Number(shift) || 1,
                        date: date || getTodayStr()
                    };

                    if (payment === 'credit') {
                        saleData.customerName = document.getElementById('sale-customer-name').value;
                        saleData.customerPhone = document.getElementById('sale-customer-phone').value;
                    }

                    Store.add('sales', saleData);

                    // Update fuel stock
                    if (fuelInfo) {
                        var currentStock = Number(fuelInfo.currentStock) || 0;
                        fuelInfo.currentStock = Math.max(0, currentStock - qty);
                        Store.saveSettings(settings);
                    }

                    // Create udhar record for credit sales
                    if (payment === 'credit') {
                        var customerName = saleData.customerName || '';
                        var customers = Store.get('customers') || [];
                        var existingCustomer = customers.find(function(c) {
                            return c.name && c.name.toLowerCase() === customerName.toLowerCase();
                        });
                        var customerId = existingCustomer ? existingCustomer.id : null;

                        if (!customerId && customerName) {
                            var newCustomer = Store.add('customers', {
                                name: customerName,
                                phone: saleData.customerPhone || '',
                                address: '',
                                vehicleNo: '',
                                creditLimit: 0
                            });
                            customerId = newCustomer.id;
                        }

                        if (customerId) {
                            Store.add('udhar_records', {
                                customerId: customerId,
                                customerName: customerName,
                                type: 'credit',
                                fuelType: fuelTypeId,
                                fuelName: fuelInfo ? fuelInfo.name : fuelTypeId,
                                quantity: qty,
                                amount: amount,
                                date: date || getTodayStr(),
                                notes: ''
                            });
                        }
                    }

                    App.closeModal();
                    App.showToast(Lang.t('sales_added'), 'success');
                    App.rerender();
                });
            }
        }, 100);
    }

    // 3. Render function
    function render() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var sales = getFilteredSales();
        var totalAmount = sales.reduce(function(s, sale) { return s + (Number(sale.amount) || 0); }, 0);
        var totalQty = sales.reduce(function(s, sale) { return s + (Number(sale.quantity) || 0); }, 0);
        var avgSale = sales.length > 0 ? totalAmount / sales.length : 0;

        // Page Header
        var headerHtml = '<div class="page-header"><h1 class="page-title">🧾 ' + Lang.t('sales_title') + '</h1>' +
            '<button class="btn btn-primary" id="sales-new-btn">➕ ' + Lang.t('sales_new') + '</button></div>';

        // Filter Bar
        var fuelFilterOptions = '<option value="">' + Lang.t('sales_filter_fuel') + '</option>';
        fuelTypes.forEach(function(f) {
            var sel = currentFuelFilter === f.id ? ' selected' : '';
            fuelFilterOptions += '<option value="' + f.id + '"' + sel + '>' + getFuelDisplayName(f) + '</option>';
        });

        var paymentMethods = ['cash', 'card', 'upi', 'credit'];
        var paymentFilterOptions = '<option value="">' + Lang.t('sales_filter_payment') + '</option>';
        paymentMethods.forEach(function(m) {
            var sel = currentPaymentFilter === m ? ' selected' : '';
            paymentFilterOptions += '<option value="' + m + '"' + sel + '>' + getPaymentLabel(m) + '</option>';
        });

        var filterHtml = '<div class="card mb-2"><div class="card-body"><div class="flex gap-1" style="flex-wrap:wrap;align-items:center;">' +
            '<div class="tabs">' +
                '<button class="tab-btn' + (currentFilter === 'today' ? ' active' : '') + '" data-sales-filter="today">' + Lang.t('sales_filter_today') + '</button>' +
                '<button class="tab-btn' + (currentFilter === 'week' ? ' active' : '') + '" data-sales-filter="week">' + Lang.t('sales_filter_week') + '</button>' +
                '<button class="tab-btn' + (currentFilter === 'month' ? ' active' : '') + '" data-sales-filter="month">' + Lang.t('sales_filter_month') + '</button>' +
                '<button class="tab-btn' + (currentFilter === 'all' ? ' active' : '') + '" data-sales-filter="all">' + Lang.t('sales_filter_all') + '</button>' +
            '</div>' +
            '<select class="form-select" id="sales-fuel-filter" style="width:auto;min-width:150px;">' + fuelFilterOptions + '</select>' +
            '<select class="form-select" id="sales-payment-filter" style="width:auto;min-width:150px;">' + paymentFilterOptions + '</select>' +
        '</div></div></div>';

        // Stats Cards
        var statsHtml = '<div class="stats-grid">' +
            '<div class="stat-card primary"><div class="stat-icon">💰</div><div class="stat-value">' + App.formatCurrency(totalAmount) + '</div><div class="stat-label">' + Lang.t('sales_total_sales') + '</div></div>' +
            '<div class="stat-card success"><div class="stat-icon">⛽</div><div class="stat-value">' + totalQty.toFixed(2) + ' ' + Lang.t('sales_liters') + '</div><div class="stat-label">' + Lang.t('sales_total_qty') + '</div></div>' +
            '<div class="stat-card warning"><div class="stat-icon">📊</div><div class="stat-value">' + App.formatCurrency(avgSale) + '</div><div class="stat-label">' + Lang.t('sales_avg_sale') + '</div></div>' +
        '</div>';

        // Sales Table
        var tableHtml = '<div class="card"><div class="card-header"><div class="card-title">📋 ' + Lang.t('sales_title') + '</div></div><div class="card-body">';
        if (sales.length === 0) {
            tableHtml += '<div class="empty-state"><div class="empty-state-icon">🧾</div><div class="empty-state-text">' + Lang.t('sales_no_sales') + '</div></div>';
        } else {
            tableHtml += '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('sales_date') + '</th>' +
                '<th>' + Lang.t('sales_fuel') + '</th>' +
                '<th>' + Lang.t('sales_qty') + '</th>' +
                '<th>' + Lang.t('sales_rate') + '</th>' +
                '<th>' + Lang.t('sales_amount') + '</th>' +
                '<th>' + Lang.t('sales_payment') + '</th>' +
                '<th>' + Lang.t('sales_shift') + '</th>' +
                '<th>' + Lang.t('sales_actions') + '</th>' +
                '</tr></thead><tbody>';
            sales.forEach(function(sale) {
                tableHtml += '<tr>' +
                    '<td>' + App.formatDate(sale.date) + '</td>' +
                    '<td>' + (sale.fuelName || sale.fuelType || '-') + '</td>' +
                    '<td>' + (Number(sale.quantity) || 0).toFixed(2) + ' ' + Lang.t('sales_liters') + '</td>' +
                    '<td>' + App.formatCurrency(sale.rate) + '</td>' +
                    '<td><strong>' + App.formatCurrency(sale.amount) + '</strong></td>' +
                    '<td>' + getPaymentLabel(sale.paymentMethod) + '</td>' +
                    '<td>' + (sale.shiftNo || '-') + '</td>' +
                    '<td><button class="btn btn-sm btn-danger" data-sales-delete="' + sale.id + '">🗑️ ' + Lang.t('sales_delete') + '</button></td>' +
                '</tr>';
            });
            tableHtml += '</tbody></table></div>';
        }
        tableHtml += '</div></div>';

        return '<div class="page">' + headerHtml + filterHtml + statsHtml + tableHtml + '</div>';
    }

    // 4. Init function
    function init() {
        var newBtn = document.getElementById('sales-new-btn');
        if (newBtn) {
            newBtn.addEventListener('click', function() { showNewSaleModal(); });
        }

        // Filter tabs
        var filterBtns = document.querySelectorAll('[data-sales-filter]');
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                currentFilter = btn.getAttribute('data-sales-filter');
                App.rerender();
            });
        });

        var fuelFilter = document.getElementById('sales-fuel-filter');
        if (fuelFilter) {
            fuelFilter.addEventListener('change', function() {
                currentFuelFilter = fuelFilter.value;
                App.rerender();
            });
        }

        var paymentFilter = document.getElementById('sales-payment-filter');
        if (paymentFilter) {
            paymentFilter.addEventListener('change', function() {
                currentPaymentFilter = paymentFilter.value;
                App.rerender();
            });
        }

        // Delete buttons
        var deleteBtns = document.querySelectorAll('[data-sales-delete]');
        deleteBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var saleId = btn.getAttribute('data-sales-delete');
                if (confirm(Lang.t('sales_delete_confirm'))) {
                    Store.remove('sales', saleId);
                    App.showToast(Lang.t('sales_deleted'), 'success');
                    App.rerender();
                }
            });
        });
    }

    // 5. Register with App
    App.registerModule('sales', { render: render, init: init });
})();
