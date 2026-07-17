(function() {
    // 1. Register translations
    Lang.register({
        en: {
            'udhar_title': 'Udhar (Credit) Management',
            'udhar_add_customer': 'Add Customer',
            'udhar_total_outstanding': 'Total Outstanding',
            'udhar_total_customers': 'Total Customers',
            'udhar_month_credit': 'This Month Credit',
            'udhar_give': 'Give Udhar',
            'udhar_receive': 'Receive Payment',
            'udhar_view_ledger': 'View Ledger',
            'udhar_customer_name': 'Customer Name',
            'udhar_phone': 'Phone',
            'udhar_address': 'Address',
            'udhar_vehicle': 'Vehicle No',
            'udhar_credit_limit': 'Credit Limit',
            'udhar_outstanding': 'Outstanding',
            'udhar_ledger': 'Customer Ledger',
            'udhar_credit': 'Credit',
            'udhar_payment': 'Payment',
            'udhar_amount_received': 'Amount Received',
            'udhar_payment_method': 'Payment Method',
            'udhar_notes': 'Notes',
            'udhar_no_customers': 'No customers added yet',
            'udhar_no_records': 'No records found for this customer',
            'udhar_balance': 'Balance',
            'udhar_over_limit': 'Over Limit!',
            'udhar_running_balance': 'Running Balance',
            'udhar_edit_customer': 'Edit Customer',
            'udhar_delete_customer': 'Delete Customer',
            'udhar_search_placeholder': 'Search by name, phone, or vehicle...',
            'udhar_save': 'Save',
            'udhar_cancel': 'Cancel',
            'udhar_date': 'Date',
            'udhar_fuel_type': 'Fuel Type',
            'udhar_quantity': 'Quantity',
            'udhar_rate': 'Rate',
            'udhar_amount': 'Amount',
            'udhar_type': 'Type',
            'udhar_details': 'Details',
            'udhar_customer_added': 'Customer added successfully!',
            'udhar_customer_updated': 'Customer updated successfully!',
            'udhar_customer_deleted': 'Customer deleted successfully!',
            'udhar_credit_added': 'Udhar recorded successfully!',
            'udhar_payment_received': 'Payment received successfully!',
            'udhar_delete_confirm': 'Are you sure you want to delete this customer? All their records will be kept.',
            'udhar_select_fuel': 'Select Fuel Type',
            'udhar_select_customer': 'Select Customer',
            'udhar_cash': 'Cash',
            'udhar_card': 'Card',
            'udhar_upi': 'UPI',
            'udhar_total': 'Total'
        },
        ur: {
            'udhar_title': 'ادھار کا انتظام',
            'udhar_add_customer': 'گاہک شامل کریں',
            'udhar_total_outstanding': 'کل بقایا',
            'udhar_total_customers': 'کل گاہک',
            'udhar_month_credit': 'اس ماہ کا ادھار',
            'udhar_give': 'ادھار دیں',
            'udhar_receive': 'ادائیگی وصول کریں',
            'udhar_view_ledger': 'لیجر دیکھیں',
            'udhar_customer_name': 'گاہک کا نام',
            'udhar_phone': 'فون',
            'udhar_address': 'پتہ',
            'udhar_vehicle': 'گاڑی نمبر',
            'udhar_credit_limit': 'ادھار کی حد',
            'udhar_outstanding': 'بقایا',
            'udhar_ledger': 'گاہک لیجر',
            'udhar_credit': 'ادھار',
            'udhar_payment': 'ادائیگی',
            'udhar_amount_received': 'وصول شدہ رقم',
            'udhar_payment_method': 'ادائیگی کا طریقہ',
            'udhar_notes': 'نوٹس',
            'udhar_no_customers': 'ابھی تک کوئی گاہک شامل نہیں ہوا',
            'udhar_no_records': 'اس گاہک کا کوئی ریکارڈ نہیں ملا',
            'udhar_balance': 'بیلنس',
            'udhar_over_limit': 'حد سے زیادہ!',
            'udhar_running_balance': 'جاری بیلنس',
            'udhar_edit_customer': 'گاہک میں ترمیم',
            'udhar_delete_customer': 'گاہک حذف کریں',
            'udhar_search_placeholder': 'نام، فون، یا گاڑی نمبر سے تلاش کریں...',
            'udhar_save': 'محفوظ کریں',
            'udhar_cancel': 'منسوخ',
            'udhar_date': 'تاریخ',
            'udhar_fuel_type': 'ایندھن کی قسم',
            'udhar_quantity': 'مقدار',
            'udhar_rate': 'ریٹ',
            'udhar_amount': 'رقم',
            'udhar_type': 'قسم',
            'udhar_details': 'تفصیلات',
            'udhar_customer_added': 'گاہک کامیابی سے شامل ہو گیا!',
            'udhar_customer_updated': 'گاہک کامیابی سے تبدیل ہو گیا!',
            'udhar_customer_deleted': 'گاہک کامیابی سے حذف ہو گیا!',
            'udhar_credit_added': 'ادھار کامیابی سے درج ہو گیا!',
            'udhar_payment_received': 'ادائیگی کامیابی سے وصول ہو گئی!',
            'udhar_delete_confirm': 'کیا آپ واقعی اس گاہک کو حذف کرنا چاہتے ہیں؟ ان کے تمام ریکارڈ محفوظ رہیں گے۔',
            'udhar_select_fuel': 'ایندھن کی قسم منتخب کریں',
            'udhar_select_customer': 'گاہک منتخب کریں',
            'udhar_cash': 'نقد',
            'udhar_card': 'کارڈ',
            'udhar_upi': 'یو پی آئی',
            'udhar_total': 'کل'
        }
    });

    // 2. Helper functions
    var searchQuery = '';

    function getCustomerOutstanding(customerId) {
        var records = Store.get('udhar_records') || [];
        var custRecords = records.filter(function(r) { return r.customerId === customerId; });
        var totalCredit = custRecords.filter(function(r) { return r.type === 'credit'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        var totalPayment = custRecords.filter(function(r) { return r.type === 'payment'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        return totalCredit - totalPayment;
    }

    function getTotalOutstanding() {
        var records = Store.get('udhar_records') || [];
        var totalCredit = records.filter(function(r) { return r.type === 'credit'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        var totalPayment = records.filter(function(r) { return r.type === 'payment'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        return totalCredit - totalPayment;
    }

    function getMonthCredit() {
        var now = new Date();
        var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        var records = Store.get('udhar_records') || [];
        return records.filter(function(r) {
            return r.type === 'credit' && r.date && r.date >= monthStart;
        }).reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
    }

    function getFilteredCustomers() {
        var customers = Store.get('customers') || [];
        if (!searchQuery) return customers;
        var q = searchQuery.toLowerCase();
        return customers.filter(function(c) {
            return (c.name && c.name.toLowerCase().indexOf(q) !== -1) ||
                   (c.phone && c.phone.toLowerCase().indexOf(q) !== -1) ||
                   (c.vehicleNo && c.vehicleNo.toLowerCase().indexOf(q) !== -1);
        });
    }

    function getFuelDisplayName(fuel) {
        if (Lang.isUrdu() && fuel.nameUr) return fuel.nameUr;
        return fuel.name || '';
    }

    function getTodayStr() {
        return new Date().toISOString().split('T')[0];
    }

    // Modal functions
    function showAddCustomerModal(editCustomer) {
        var isEdit = !!editCustomer;
        var title = isEdit ? Lang.t('udhar_edit_customer') : Lang.t('udhar_add_customer');

        var html = '<div class="modal-header"><h3 class="modal-title">👤 ' + title + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('udhar_customer_name') + ' *</label>' +
                    '<input type="text" class="form-input" id="udhar-cust-name" value="' + (isEdit ? (editCustomer.name || '') : '') + '">' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_phone') + '</label>' +
                        '<input type="text" class="form-input" id="udhar-cust-phone" value="' + (isEdit ? (editCustomer.phone || '') : '') + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_vehicle') + '</label>' +
                        '<input type="text" class="form-input" id="udhar-cust-vehicle" value="' + (isEdit ? (editCustomer.vehicleNo || '') : '') + '">' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('udhar_address') + '</label>' +
                    '<input type="text" class="form-input" id="udhar-cust-address" value="' + (isEdit ? (editCustomer.address || '') : '') + '">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('udhar_credit_limit') + ' (PKR)</label>' +
                    '<input type="number" class="form-input" id="udhar-cust-limit" step="1" min="0" value="' + (isEdit ? (Number(editCustomer.creditLimit) || 0) : '0') + '">' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="udhar-cust-cancel">' + Lang.t('udhar_cancel') + '</button>' +
                '<button class="btn btn-primary" id="udhar-cust-save">' + Lang.t('udhar_save') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var cancelBtn = document.getElementById('udhar-cust-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('udhar-cust-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var name = document.getElementById('udhar-cust-name').value.trim();
                    var phone = document.getElementById('udhar-cust-phone').value.trim();
                    var address = document.getElementById('udhar-cust-address').value.trim();
                    var vehicleNo = document.getElementById('udhar-cust-vehicle').value.trim();
                    var creditLimit = Number(document.getElementById('udhar-cust-limit').value) || 0;

                    if (!name) {
                        App.showToast('Customer name is required', 'error');
                        return;
                    }

                    var data = {
                        name: name,
                        phone: phone,
                        address: address,
                        vehicleNo: vehicleNo,
                        creditLimit: creditLimit
                    };

                    if (isEdit) {
                        Store.update('customers', editCustomer.id, data);
                        App.showToast(Lang.t('udhar_customer_updated'), 'success');
                    } else {
                        Store.add('customers', data);
                        App.showToast(Lang.t('udhar_customer_added'), 'success');
                    }

                    App.closeModal();
                    App.rerender();
                });
            }
        }, 100);
    }

    function showGiveUdharModal(customerId) {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var customers = Store.get('customers') || [];
        var today = getTodayStr();

        var customerOptions = '<option value="">' + Lang.t('udhar_select_customer') + '</option>';
        customers.forEach(function(c) {
            var sel = c.id === customerId ? ' selected' : '';
            customerOptions += '<option value="' + c.id + '"' + sel + '>' + c.name + (c.phone ? ' (' + c.phone + ')' : '') + '</option>';
        });

        var fuelOptions = '<option value="">' + Lang.t('udhar_select_fuel') + '</option>';
        fuelTypes.forEach(function(f) {
            fuelOptions += '<option value="' + f.id + '" data-rate="' + f.rate + '">' + getFuelDisplayName(f) + '</option>';
        });

        var html = '<div class="modal-header"><h3 class="modal-title">📋 ' + Lang.t('udhar_give') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('udhar_customer_name') + '</label>' +
                    '<select class="form-select" id="udhar-give-customer">' + customerOptions + '</select>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_fuel_type') + '</label>' +
                        '<select class="form-select" id="udhar-give-fuel">' + fuelOptions + '</select>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_quantity') + '</label>' +
                        '<input type="number" class="form-input" id="udhar-give-qty" step="0.01" min="0" placeholder="0.00">' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_rate') + '</label>' +
                        '<input type="number" class="form-input" id="udhar-give-rate" step="0.01" min="0">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_amount') + '</label>' +
                        '<input type="number" class="form-input" id="udhar-give-amount" readonly>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_date') + '</label>' +
                        '<input type="date" class="form-input" id="udhar-give-date" value="' + today + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_notes') + '</label>' +
                        '<input type="text" class="form-input" id="udhar-give-notes">' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="udhar-give-cancel">' + Lang.t('udhar_cancel') + '</button>' +
                '<button class="btn btn-primary" id="udhar-give-save">' + Lang.t('udhar_save') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var fuelSelect = document.getElementById('udhar-give-fuel');
            var qtyInput = document.getElementById('udhar-give-qty');
            var rateInput = document.getElementById('udhar-give-rate');
            var amountInput = document.getElementById('udhar-give-amount');

            function recalculate() {
                var qty = Number(qtyInput.value) || 0;
                var rate = Number(rateInput.value) || 0;
                amountInput.value = (qty * rate).toFixed(2);
            }

            if (fuelSelect) {
                fuelSelect.addEventListener('change', function() {
                    var selected = fuelSelect.options[fuelSelect.selectedIndex];
                    rateInput.value = selected ? selected.getAttribute('data-rate') || '' : '';
                    recalculate();
                });
            }
            if (qtyInput) qtyInput.addEventListener('input', recalculate);
            if (rateInput) rateInput.addEventListener('input', recalculate);

            var cancelBtn = document.getElementById('udhar-give-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('udhar-give-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var custId = document.getElementById('udhar-give-customer').value;
                    var fuelId = fuelSelect.value;
                    var qty = Number(qtyInput.value);
                    var rate = Number(rateInput.value);
                    var amount = Number(amountInput.value);
                    var date = document.getElementById('udhar-give-date').value;
                    var notes = document.getElementById('udhar-give-notes').value;

                    if (!custId || !fuelId || !qty || !amount) {
                        App.showToast('Please fill all required fields', 'error');
                        return;
                    }

                    var customer = Store.getById('customers', custId);
                    var settings = Store.getSettings();
                    var fuelInfo = (settings.fuelTypes || []).find(function(f) { return f.id === fuelId; });

                    Store.add('udhar_records', {
                        customerId: custId,
                        customerName: customer ? customer.name : '',
                        type: 'credit',
                        fuelType: fuelId,
                        fuelName: fuelInfo ? fuelInfo.name : fuelId,
                        quantity: qty,
                        amount: amount,
                        date: date || getTodayStr(),
                        notes: notes
                    });

                    App.closeModal();
                    App.showToast(Lang.t('udhar_credit_added'), 'success');
                    App.rerender();
                });
            }
        }, 100);
    }

    function showReceivePaymentModal(customerId) {
        var customers = Store.get('customers') || [];
        var today = getTodayStr();

        var customerOptions = '<option value="">' + Lang.t('udhar_select_customer') + '</option>';
        customers.forEach(function(c) {
            var outstanding = getCustomerOutstanding(c.id);
            var sel = c.id === customerId ? ' selected' : '';
            customerOptions += '<option value="' + c.id + '"' + sel + '>' + c.name + ' (' + Lang.t('udhar_outstanding') + ': ' + App.formatCurrency(outstanding) + ')</option>';
        });

        var html = '<div class="modal-header"><h3 class="modal-title">💵 ' + Lang.t('udhar_receive') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group">' +
                    '<label class="form-label">' + Lang.t('udhar_customer_name') + '</label>' +
                    '<select class="form-select" id="udhar-pay-customer">' + customerOptions + '</select>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_amount_received') + ' (PKR)</label>' +
                        '<input type="number" class="form-input" id="udhar-pay-amount" step="0.01" min="0" placeholder="0.00">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_payment_method') + '</label>' +
                        '<select class="form-select" id="udhar-pay-method">' +
                            '<option value="cash">' + Lang.t('udhar_cash') + '</option>' +
                            '<option value="card">' + Lang.t('udhar_card') + '</option>' +
                            '<option value="upi">' + Lang.t('udhar_upi') + '</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_date') + '</label>' +
                        '<input type="date" class="form-input" id="udhar-pay-date" value="' + today + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="form-label">' + Lang.t('udhar_notes') + '</label>' +
                        '<input type="text" class="form-input" id="udhar-pay-notes">' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="udhar-pay-cancel">' + Lang.t('udhar_cancel') + '</button>' +
                '<button class="btn btn-success" id="udhar-pay-save">' + Lang.t('udhar_save') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var cancelBtn = document.getElementById('udhar-pay-cancel');
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });

            var saveBtn = document.getElementById('udhar-pay-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', function() {
                    var custId = document.getElementById('udhar-pay-customer').value;
                    var amount = Number(document.getElementById('udhar-pay-amount').value);
                    var method = document.getElementById('udhar-pay-method').value;
                    var date = document.getElementById('udhar-pay-date').value;
                    var notes = document.getElementById('udhar-pay-notes').value;

                    if (!custId || !amount || amount <= 0) {
                        App.showToast('Please fill all required fields', 'error');
                        return;
                    }

                    var customer = Store.getById('customers', custId);

                    Store.add('udhar_records', {
                        customerId: custId,
                        customerName: customer ? customer.name : '',
                        type: 'payment',
                        fuelType: '',
                        fuelName: '',
                        quantity: 0,
                        amount: amount,
                        date: date || getTodayStr(),
                        notes: notes + (method ? ' [' + method + ']' : '')
                    });

                    App.closeModal();
                    App.showToast(Lang.t('udhar_payment_received'), 'success');
                    App.rerender();
                });
            }
        }, 100);
    }

    function showLedgerModal(customerId) {
        var customer = Store.getById('customers', customerId);
        if (!customer) return;

        var records = (Store.get('udhar_records') || [])
            .filter(function(r) { return r.customerId === customerId; })
            .sort(function(a, b) { return (a.date || '').localeCompare(b.date || '') || (a.createdAt || '').localeCompare(b.createdAt || ''); });

        var outstanding = getCustomerOutstanding(customerId);

        var tableRows = '';
        var runningBalance = 0;

        if (records.length === 0) {
            tableRows = '<tr><td colspan="5" class="text-center text-muted">' + Lang.t('udhar_no_records') + '</td></tr>';
        } else {
            records.forEach(function(r) {
                if (r.type === 'credit') {
                    runningBalance += Number(r.amount) || 0;
                } else {
                    runningBalance -= Number(r.amount) || 0;
                }

                var typeClass = r.type === 'credit' ? 'text-danger' : 'text-success';
                var typeBadge = r.type === 'credit'
                    ? '<span class="badge badge-danger">' + Lang.t('udhar_credit') + '</span>'
                    : '<span class="badge badge-success">' + Lang.t('udhar_payment') + '</span>';
                var details = r.type === 'credit'
                    ? (r.fuelName || r.fuelType || '-') + ' - ' + (Number(r.quantity) || 0) + 'L'
                    : (r.notes || '-');

                tableRows += '<tr>' +
                    '<td>' + App.formatDate(r.date) + '</td>' +
                    '<td>' + typeBadge + '</td>' +
                    '<td>' + details + '</td>' +
                    '<td class="' + typeClass + '"><strong>' + (r.type === 'credit' ? '+' : '-') + App.formatCurrency(r.amount) + '</strong></td>' +
                    '<td class="' + (runningBalance > 0 ? 'text-danger' : 'text-success') + '">' + App.formatCurrency(Math.abs(runningBalance)) + '</td>' +
                '</tr>';
            });
        }

        var html = '<div class="modal-header"><h3 class="modal-title">📒 ' + Lang.t('udhar_ledger') + ' - ' + customer.name + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="flex flex-between mb-2">' +
                    '<span><strong>' + Lang.t('udhar_phone') + ':</strong> ' + (customer.phone || '-') + '</span>' +
                    '<span class="' + (outstanding > 0 ? 'text-danger' : 'text-success') + '"><strong>' + Lang.t('udhar_outstanding') + ': ' + App.formatCurrency(outstanding) + '</strong></span>' +
                '</div>' +
                '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                    '<th>' + Lang.t('udhar_date') + '</th>' +
                    '<th>' + Lang.t('udhar_type') + '</th>' +
                    '<th>' + Lang.t('udhar_details') + '</th>' +
                    '<th>' + Lang.t('udhar_amount') + '</th>' +
                    '<th>' + Lang.t('udhar_running_balance') + '</th>' +
                '</tr></thead><tbody>' + tableRows + '</tbody></table></div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="udhar-ledger-close">' + Lang.t('udhar_cancel') + '</button>' +
            '</div>';

        App.showModal(html);

        setTimeout(function() {
            var closeBtn = document.getElementById('udhar-ledger-close');
            if (closeBtn) closeBtn.addEventListener('click', function() { App.closeModal(); });
        }, 100);
    }

    // 3. Render function
    function render() {
        var customers = getFilteredCustomers();
        var allCustomers = Store.get('customers') || [];
        var totalOutstanding = getTotalOutstanding();
        var monthCredit = getMonthCredit();

        // Page Header
        var headerHtml = '<div class="page-header"><h1 class="page-title">📋 ' + Lang.t('udhar_title') + '</h1>' +
            '<button class="btn btn-primary" id="udhar-add-customer-btn">➕ ' + Lang.t('udhar_add_customer') + '</button></div>';

        // Stats Cards
        var statsHtml = '<div class="stats-grid">' +
            '<div class="stat-card danger"><div class="stat-icon">💳</div><div class="stat-value">' + App.formatCurrency(totalOutstanding) + '</div><div class="stat-label">' + Lang.t('udhar_total_outstanding') + '</div></div>' +
            '<div class="stat-card primary"><div class="stat-icon">👥</div><div class="stat-value">' + allCustomers.length + '</div><div class="stat-label">' + Lang.t('udhar_total_customers') + '</div></div>' +
            '<div class="stat-card warning"><div class="stat-icon">📅</div><div class="stat-value">' + App.formatCurrency(monthCredit) + '</div><div class="stat-label">' + Lang.t('udhar_month_credit') + '</div></div>' +
        '</div>';

        // Search Bar
        var searchHtml = '<div class="search-bar mb-2">' +
            '<input type="text" class="search-input" id="udhar-search" placeholder="🔍 ' + Lang.t('udhar_search_placeholder') + '" value="' + (searchQuery || '') + '">' +
        '</div>';

        // Customer Cards
        var cardsHtml = '';
        if (customers.length === 0) {
            cardsHtml = '<div class="empty-state"><div class="empty-state-icon">👥</div><div class="empty-state-text">' + Lang.t('udhar_no_customers') + '</div></div>';
        } else {
            cardsHtml = '<div class="stats-grid">';
            customers.forEach(function(c) {
                var outstanding = getCustomerOutstanding(c.id);
                var creditLimit = Number(c.creditLimit) || 0;
                var isOverLimit = creditLimit > 0 && outstanding > creditLimit;
                var balanceClass = outstanding > 0 ? 'text-danger' : 'text-success';
                var overLimitBadge = isOverLimit ? '<span class="badge badge-danger">' + Lang.t('udhar_over_limit') + '</span>' : '';

                cardsHtml += '<div class="card" style="min-width:280px;">' +
                    '<div class="card-header">' +
                        '<div class="card-title">👤 ' + c.name + '</div>' +
                        overLimitBadge +
                    '</div>' +
                    '<div class="card-body">' +
                        '<div class="mb-1"><strong>' + Lang.t('udhar_phone') + ':</strong> ' + (c.phone || '-') + '</div>' +
                        '<div class="mb-1"><strong>' + Lang.t('udhar_vehicle') + ':</strong> ' + (c.vehicleNo || '-') + '</div>' +
                        (creditLimit > 0 ? '<div class="mb-1"><strong>' + Lang.t('udhar_credit_limit') + ':</strong> ' + App.formatCurrency(creditLimit) + '</div>' : '') +
                        '<div class="mb-2 ' + balanceClass + '" style="font-size:1.2em;"><strong>' + Lang.t('udhar_outstanding') + ': ' + App.formatCurrency(outstanding) + '</strong></div>' +
                        '<div class="flex gap-1" style="flex-wrap:wrap;">' +
                            '<button class="btn btn-sm btn-primary" data-udhar-ledger="' + c.id + '">📒 ' + Lang.t('udhar_view_ledger') + '</button>' +
                            '<button class="btn btn-sm btn-warning" data-udhar-give="' + c.id + '">📋 ' + Lang.t('udhar_give') + '</button>' +
                            '<button class="btn btn-sm btn-success" data-udhar-receive="' + c.id + '">💵 ' + Lang.t('udhar_receive') + '</button>' +
                        '</div>' +
                        '<div class="flex gap-1 mt-1">' +
                            '<button class="btn btn-sm btn-secondary" data-udhar-edit="' + c.id + '">✏️ ' + Lang.t('udhar_edit_customer') + '</button>' +
                            '<button class="btn btn-sm btn-danger" data-udhar-delete="' + c.id + '">🗑️ ' + Lang.t('udhar_delete_customer') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            });
            cardsHtml += '</div>';
        }

        return '<div class="page">' + headerHtml + statsHtml + searchHtml + cardsHtml + '</div>';
    }

    // 4. Init function
    function init() {
        // Add Customer
        var addBtn = document.getElementById('udhar-add-customer-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function() { showAddCustomerModal(); });
        }

        // Search
        var searchInput = document.getElementById('udhar-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchQuery = searchInput.value;
                App.rerender();
            });
            // Keep focus on search after rerender
            if (searchQuery) {
                searchInput.focus();
                searchInput.setSelectionRange(searchQuery.length, searchQuery.length);
            }
        }

        // View Ledger
        var ledgerBtns = document.querySelectorAll('[data-udhar-ledger]');
        ledgerBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                showLedgerModal(btn.getAttribute('data-udhar-ledger'));
            });
        });

        // Give Udhar
        var giveBtns = document.querySelectorAll('[data-udhar-give]');
        giveBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                showGiveUdharModal(btn.getAttribute('data-udhar-give'));
            });
        });

        // Receive Payment
        var receiveBtns = document.querySelectorAll('[data-udhar-receive]');
        receiveBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                showReceivePaymentModal(btn.getAttribute('data-udhar-receive'));
            });
        });

        // Edit Customer
        var editBtns = document.querySelectorAll('[data-udhar-edit]');
        editBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var customer = Store.getById('customers', btn.getAttribute('data-udhar-edit'));
                if (customer) showAddCustomerModal(customer);
            });
        });

        // Delete Customer
        var deleteBtns = document.querySelectorAll('[data-udhar-delete]');
        deleteBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (confirm(Lang.t('udhar_delete_confirm'))) {
                    Store.remove('customers', btn.getAttribute('data-udhar-delete'));
                    App.showToast(Lang.t('udhar_customer_deleted'), 'success');
                    App.rerender();
                }
            });
        });
    }

    // 5. Register with App
    App.registerModule('udhar', { render: render, init: init });
})();
