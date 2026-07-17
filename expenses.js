(function() {
    // ── Register Translations ──────────────────────────────────────────
    Lang.register({
        en: {
            'exp_title': 'Expenses',
            'exp_add': 'Add Expense',
            'exp_today': "Today's Expenses",
            'exp_this_month': 'This Month Total',
            'exp_top_category': 'Top Category',
            'exp_category': 'Category',
            'exp_amount': 'Amount',
            'exp_description': 'Description',
            'exp_date': 'Date',
            'exp_electricity': 'Electricity',
            'exp_salary': 'Salary',
            'exp_maintenance': 'Maintenance',
            'exp_rent': 'Rent',
            'exp_fuel_transport': 'Fuel Transport',
            'exp_misc': 'Miscellaneous',
            'exp_no_expenses': 'No expenses recorded yet',
            'exp_monthly_summary': 'Monthly Category Breakdown',
            'exp_delete_confirm': 'Are you sure you want to delete this expense?',
            'exp_total': 'Total',
            'exp_save': 'Save Expense',
            'exp_cancel': 'Cancel',
            'exp_actions': 'Actions',
            'exp_delete': 'Delete',
            'exp_filter': 'Filter',
            'exp_today_filter': 'Today',
            'exp_week_filter': 'This Week',
            'exp_month_filter': 'This Month',
            'exp_all_filter': 'All Time',
            'exp_all_categories': 'All Categories',
            'exp_added_success': 'Expense added successfully!',
            'exp_deleted_success': 'Expense deleted successfully!',
            'exp_no_category': 'No expenses this month'
        },
        ur: {
            'exp_title': 'اخراجات',
            'exp_add': 'نیا خرچہ',
            'exp_today': 'آج کے اخراجات',
            'exp_this_month': 'اس ماہ کا کل',
            'exp_top_category': 'سب سے بڑی قسم',
            'exp_category': 'قسم',
            'exp_amount': 'رقم',
            'exp_description': 'تفصیل',
            'exp_date': 'تاریخ',
            'exp_electricity': 'بجلی',
            'exp_salary': 'تنخواہ',
            'exp_maintenance': 'مرمت',
            'exp_rent': 'کرایہ',
            'exp_fuel_transport': 'ایندھن ٹرانسپورٹ',
            'exp_misc': 'متفرق',
            'exp_no_expenses': 'ابھی تک کوئی خرچہ درج نہیں ہوا',
            'exp_monthly_summary': 'ماہانہ قسم وار خلاصہ',
            'exp_delete_confirm': 'کیا آپ واقعی یہ خرچہ حذف کرنا چاہتے ہیں؟',
            'exp_total': 'کل',
            'exp_save': 'خرچہ محفوظ کریں',
            'exp_cancel': 'منسوخ',
            'exp_actions': 'کارروائیاں',
            'exp_delete': 'حذف کریں',
            'exp_filter': 'فلٹر',
            'exp_today_filter': 'آج',
            'exp_week_filter': 'اس ہفتے',
            'exp_month_filter': 'اس ماہ',
            'exp_all_filter': 'تمام',
            'exp_all_categories': 'تمام اقسام',
            'exp_added_success': 'خرچہ کامیابی سے شامل ہو گیا!',
            'exp_deleted_success': 'خرچہ کامیابی سے حذف ہو گیا!',
            'exp_no_category': 'اس ماہ کوئی خرچہ نہیں'
        }
    });

    // ── Category Definitions ───────────────────────────────────────────
    var CATEGORIES = [
        { key: 'electricity', labelKey: 'exp_electricity', color: '#f1c40f', badge: 'badge-warning' },
        { key: 'salary',      labelKey: 'exp_salary',      color: '#3498db', badge: 'badge-success' },
        { key: 'maintenance', labelKey: 'exp_maintenance',  color: '#e67e22', badge: 'badge-warning' },
        { key: 'rent',        labelKey: 'exp_rent',         color: '#9b59b6', badge: 'badge-danger' },
        { key: 'fuel_transport', labelKey: 'exp_fuel_transport', color: '#1abc9c', badge: 'badge-success' },
        { key: 'misc',        labelKey: 'exp_misc',         color: '#95a5a6', badge: 'badge-warning' }
    ];

    function getCategoryInfo(key) {
        return CATEGORIES.find(function(c) { return c.key === key; }) || CATEGORIES[5];
    }

    // ── Helpers ─────────────────────────────────────────────────────────
    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }

    function isToday(dateStr) {
        return dateStr && dateStr.slice(0, 10) === todayISO();
    }

    function isThisWeek(dateStr) {
        if (!dateStr) return false;
        var now = new Date();
        var d = new Date(dateStr);
        var startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return d >= startOfWeek && d <= now;
    }

    function isThisMonth(dateStr) {
        if (!dateStr) return false;
        var now = new Date();
        var d = new Date(dateStr);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }

    function getFilteredExpenses(dateFilter, categoryFilter) {
        var expenses = Store.get('expenses');
        if (dateFilter === 'today') {
            expenses = expenses.filter(function(e) { return isToday(e.date); });
        } else if (dateFilter === 'week') {
            expenses = expenses.filter(function(e) { return isThisWeek(e.date); });
        } else if (dateFilter === 'month') {
            expenses = expenses.filter(function(e) { return isThisMonth(e.date); });
        }
        if (categoryFilter && categoryFilter !== 'all') {
            expenses = expenses.filter(function(e) { return e.category === categoryFilter; });
        }
        expenses.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
        return expenses;
    }

    function getMonthlyByCategory() {
        var expenses = Store.get('expenses').filter(function(e) { return isThisMonth(e.date); });
        var totals = {};
        expenses.forEach(function(e) {
            totals[e.category] = (totals[e.category] || 0) + (parseFloat(e.amount) || 0);
        });
        return totals;
    }

    function getTopCategory() {
        var totals = getMonthlyByCategory();
        var maxKey = null, maxVal = 0;
        Object.keys(totals).forEach(function(k) {
            if (totals[k] > maxVal) { maxVal = totals[k]; maxKey = k; }
        });
        return { key: maxKey, amount: maxVal };
    }

    // ── Render ──────────────────────────────────────────────────────────
    function render() {
        var allExpenses = Store.get('expenses');
        var todayTotal = allExpenses.filter(function(e) { return isToday(e.date); })
            .reduce(function(s, e) { return s + (parseFloat(e.amount) || 0); }, 0);
        var monthTotal = allExpenses.filter(function(e) { return isThisMonth(e.date); })
            .reduce(function(s, e) { return s + (parseFloat(e.amount) || 0); }, 0);
        var topCat = getTopCategory();
        var topCatLabel = topCat.key ? Lang.t(getCategoryInfo(topCat.key).labelKey) : Lang.t('exp_no_category');

        var filteredExpenses = getFilteredExpenses(
            (document.getElementById('exp_date_filter') || {}).value || 'month',
            (document.getElementById('exp_cat_filter') || {}).value || 'all'
        );

        // Monthly breakdown
        var monthlyTotals = getMonthlyByCategory();
        var maxCatVal = 0;
        Object.keys(monthlyTotals).forEach(function(k) { if (monthlyTotals[k] > maxCatVal) maxCatVal = monthlyTotals[k]; });

        var categoryOptionsHtml = CATEGORIES.map(function(c) {
            return '<option value="' + c.key + '">' + Lang.t(c.labelKey) + '</option>';
        }).join('');

        var tableRows = '';
        if (filteredExpenses.length === 0) {
            tableRows = '<tr><td colspan="5" class="text-center"><div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-text">' + Lang.t('exp_no_expenses') + '</div></div></td></tr>';
        } else {
            filteredExpenses.forEach(function(e) {
                var catInfo = getCategoryInfo(e.category);
                tableRows += '<tr>' +
                    '<td>' + App.formatDate(e.date) + '</td>' +
                    '<td><span class="badge ' + catInfo.badge + '">' + Lang.t(catInfo.labelKey) + '</span></td>' +
                    '<td>' + (e.description || '—') + '</td>' +
                    '<td class="text-right">' + App.formatCurrency(e.amount) + '</td>' +
                    '<td><button class="btn btn-danger btn-sm exp-delete-btn" data-id="' + e.id + '">🗑 ' + Lang.t('exp_delete') + '</button></td>' +
                    '</tr>';
            });
        }

        var barRows = '';
        if (Object.keys(monthlyTotals).length === 0) {
            barRows = '<div class="empty-state"><div class="empty-state-icon">📊</div><div class="empty-state-text">' + Lang.t('exp_no_category') + '</div></div>';
        } else {
            CATEGORIES.forEach(function(c) {
                var val = monthlyTotals[c.key] || 0;
                if (val <= 0) return;
                var pct = maxCatVal > 0 ? Math.round((val / maxCatVal) * 100) : 0;
                barRows += '<div style="margin-bottom:10px;">' +
                    '<div class="flex-between mb-1"><span>' + Lang.t(c.labelKey) + '</span><span>' + App.formatCurrency(val) + '</span></div>' +
                    '<div style="background:rgba(255,255,255,0.08);border-radius:6px;height:22px;overflow:hidden;">' +
                    '<div style="width:' + pct + '%;height:100%;background:' + c.color + ';border-radius:6px;transition:width .5s ease;"></div>' +
                    '</div></div>';
            });
        }

        return '<div class="page">' +
            '<div class="page-header flex-between">' +
                '<h1 class="page-title">💰 ' + Lang.t('exp_title') + '</h1>' +
                '<button class="btn btn-primary" id="exp_add_btn">➕ ' + Lang.t('exp_add') + '</button>' +
            '</div>' +

            // Stats
            '<div class="stats-grid">' +
                '<div class="stat-card danger"><div class="stat-icon">📉</div><div class="stat-value">' + App.formatCurrency(todayTotal) + '</div><div class="stat-label">' + Lang.t('exp_today') + '</div></div>' +
                '<div class="stat-card warning"><div class="stat-icon">📅</div><div class="stat-value">' + App.formatCurrency(monthTotal) + '</div><div class="stat-label">' + Lang.t('exp_this_month') + '</div></div>' +
                '<div class="stat-card primary"><div class="stat-icon">🏆</div><div class="stat-value">' + topCatLabel + '</div><div class="stat-label">' + Lang.t('exp_top_category') + (topCat.amount ? ' — ' + App.formatCurrency(topCat.amount) : '') + '</div></div>' +
            '</div>' +

            // Filters
            '<div class="card mt-2"><div class="card-body"><div class="flex" style="gap:12px;flex-wrap:wrap;align-items:center;">' +
                '<div class="form-group" style="margin-bottom:0;flex:1;min-width:160px;">' +
                    '<label class="form-label">' + Lang.t('exp_filter') + '</label>' +
                    '<select class="form-select" id="exp_date_filter">' +
                        '<option value="today">' + Lang.t('exp_today_filter') + '</option>' +
                        '<option value="week">' + Lang.t('exp_week_filter') + '</option>' +
                        '<option value="month" selected>' + Lang.t('exp_month_filter') + '</option>' +
                        '<option value="all">' + Lang.t('exp_all_filter') + '</option>' +
                    '</select>' +
                '</div>' +
                '<div class="form-group" style="margin-bottom:0;flex:1;min-width:160px;">' +
                    '<label class="form-label">' + Lang.t('exp_category') + '</label>' +
                    '<select class="form-select" id="exp_cat_filter">' +
                        '<option value="all">' + Lang.t('exp_all_categories') + '</option>' +
                        categoryOptionsHtml +
                    '</select>' +
                '</div>' +
            '</div></div></div>' +

            // Table
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📋 ' + Lang.t('exp_title') + '</h3></div><div class="card-body">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                    '<th>' + Lang.t('exp_date') + '</th>' +
                    '<th>' + Lang.t('exp_category') + '</th>' +
                    '<th>' + Lang.t('exp_description') + '</th>' +
                    '<th class="text-right">' + Lang.t('exp_amount') + '</th>' +
                    '<th>' + Lang.t('exp_actions') + '</th>' +
                '</tr></thead><tbody>' + tableRows + '</tbody></table></div>' +
            '</div></div>' +

            // Monthly Summary
            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📊 ' + Lang.t('exp_monthly_summary') + '</h3></div><div class="card-body">' +
                barRows +
            '</div></div>' +
        '</div>';
    }

    // ── Add Expense Modal ───────────────────────────────────────────────
    function showAddModal() {
        var categoryOptions = CATEGORIES.map(function(c) {
            return '<option value="' + c.key + '">' + Lang.t(c.labelKey) + '</option>';
        }).join('');

        var html = '<div class="modal-header"><h3 class="modal-title">➕ ' + Lang.t('exp_add') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group"><label class="form-label">' + Lang.t('exp_category') + '</label>' +
                    '<select class="form-select" id="exp_form_category">' + categoryOptions + '</select></div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('exp_amount') + '</label>' +
                        '<input type="number" class="form-input" id="exp_form_amount" min="0" step="1" placeholder="0"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('exp_date') + '</label>' +
                        '<input type="date" class="form-input" id="exp_form_date" value="' + todayISO() + '"></div>' +
                '</div>' +
                '<div class="form-group"><label class="form-label">' + Lang.t('exp_description') + '</label>' +
                    '<textarea class="form-textarea" id="exp_form_desc" rows="3"></textarea></div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="exp_form_cancel">' + Lang.t('exp_cancel') + '</button>' +
                '<button class="btn btn-primary" id="exp_form_save">' + Lang.t('exp_save') + '</button>' +
            '</div>';
        App.showModal(html);

        setTimeout(function() {
            var saveBtn = document.getElementById('exp_form_save');
            var cancelBtn = document.getElementById('exp_form_cancel');
            if (saveBtn) saveBtn.addEventListener('click', function() {
                var category = document.getElementById('exp_form_category').value;
                var amount = parseFloat(document.getElementById('exp_form_amount').value);
                var date = document.getElementById('exp_form_date').value;
                var description = document.getElementById('exp_form_desc').value.trim();
                if (!amount || amount <= 0) {
                    App.showToast(Lang.t('exp_amount') + '!', 'error');
                    return;
                }
                Store.add('expenses', {
                    category: category,
                    amount: amount,
                    description: description,
                    date: date || todayISO()
                });
                App.closeModal();
                App.showToast(Lang.t('exp_added_success'), 'success');
                App.rerender();
            });
            if (cancelBtn) cancelBtn.addEventListener('click', function() { App.closeModal(); });
        }, 50);
    }

    // ── Init ────────────────────────────────────────────────────────────
    function init() {
        var addBtn = document.getElementById('exp_add_btn');
        if (addBtn) addBtn.addEventListener('click', showAddModal);

        // Filter change
        var dateFilter = document.getElementById('exp_date_filter');
        var catFilter = document.getElementById('exp_cat_filter');
        if (dateFilter) dateFilter.addEventListener('change', function() { App.rerender(); });
        if (catFilter) catFilter.addEventListener('change', function() { App.rerender(); });

        // Delete buttons
        document.querySelectorAll('.exp-delete-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.getAttribute('data-id');
                if (confirm(Lang.t('exp_delete_confirm'))) {
                    Store.remove('expenses', id);
                    App.showToast(Lang.t('exp_deleted_success'), 'success');
                    App.rerender();
                }
            });
        });
    }

    // ── Register ────────────────────────────────────────────────────────
    App.registerModule('expenses', { render: render, init: init });
})();
