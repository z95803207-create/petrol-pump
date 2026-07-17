(function() {
    // ── Register Translations ──────────────────────────────────────────
    Lang.register({
        en: {
            'emp_title': 'Employees',
            'emp_add': 'Add Employee',
            'emp_total': 'Total Active Employees',
            'emp_salary_bill': 'Monthly Salary Bill',
            'emp_name': 'Name',
            'emp_phone': 'Phone',
            'emp_role': 'Role',
            'emp_salary': 'Salary',
            'emp_shift': 'Shift',
            'emp_join_date': 'Join Date',
            'emp_pump_operator': 'Pump Operator',
            'emp_cashier': 'Cashier',
            'emp_manager': 'Manager',
            'emp_helper': 'Helper',
            'emp_guard': 'Guard',
            'emp_pay_salary': 'Pay Salary',
            'emp_edit': 'Edit',
            'emp_deactivate': 'Deactivate',
            'emp_activate': 'Activate',
            'emp_active': 'Active',
            'emp_inactive': 'Inactive',
            'emp_salary_history': 'Salary History',
            'emp_month': 'Month',
            'emp_year': 'Year',
            'emp_paid_date': 'Paid Date',
            'emp_notes': 'Notes',
            'emp_no_employees': 'No employees added yet',
            'emp_salary_paid': 'Salary paid successfully!',
            'emp_delete_confirm': 'Are you sure you want to delete this employee?',
            'emp_save': 'Save',
            'emp_cancel': 'Cancel',
            'emp_added_success': 'Employee added successfully!',
            'emp_updated_success': 'Employee updated successfully!',
            'emp_status_changed': 'Employee status updated!',
            'emp_amount': 'Amount',
            'emp_pay': 'Pay Now',
            'emp_no_salary_records': 'No salary records found',
            'emp_close': 'Close'
        },
        ur: {
            'emp_title': 'ملازمین',
            'emp_add': 'نیا ملازم',
            'emp_total': 'کل فعال ملازمین',
            'emp_salary_bill': 'ماہانہ تنخواہ بل',
            'emp_name': 'نام',
            'emp_phone': 'فون',
            'emp_role': 'عہدہ',
            'emp_salary': 'تنخواہ',
            'emp_shift': 'شفٹ',
            'emp_join_date': 'شمولیت کی تاریخ',
            'emp_pump_operator': 'پمپ آپریٹر',
            'emp_cashier': 'کیشیئر',
            'emp_manager': 'مینیجر',
            'emp_helper': 'ہیلپر',
            'emp_guard': 'گارڈ',
            'emp_pay_salary': 'تنخواہ ادا کریں',
            'emp_edit': 'ترمیم',
            'emp_deactivate': 'غیر فعال کریں',
            'emp_activate': 'فعال کریں',
            'emp_active': 'فعال',
            'emp_inactive': 'غیر فعال',
            'emp_salary_history': 'تنخواہ کی تاریخ',
            'emp_month': 'مہینہ',
            'emp_year': 'سال',
            'emp_paid_date': 'ادائیگی کی تاریخ',
            'emp_notes': 'نوٹس',
            'emp_no_employees': 'ابھی تک کوئی ملازم شامل نہیں',
            'emp_salary_paid': 'تنخواہ کامیابی سے ادا ہو گئی!',
            'emp_delete_confirm': 'کیا آپ واقعی اس ملازم کو حذف کرنا چاہتے ہیں؟',
            'emp_save': 'محفوظ کریں',
            'emp_cancel': 'منسوخ',
            'emp_added_success': 'ملازم کامیابی سے شامل ہو گیا!',
            'emp_updated_success': 'ملازم کامیابی سے اپ ڈیٹ ہو گیا!',
            'emp_status_changed': 'ملازم کی حیثیت تبدیل ہو گئی!',
            'emp_amount': 'رقم',
            'emp_pay': 'ابھی ادا کریں',
            'emp_no_salary_records': 'تنخواہ کا کوئی ریکارڈ نہیں ملا',
            'emp_close': 'بند کریں'
        }
    });

    // ── Role Definitions ────────────────────────────────────────────────
    var ROLES = [
        { key: 'pump_operator', labelKey: 'emp_pump_operator' },
        { key: 'cashier',       labelKey: 'emp_cashier' },
        { key: 'manager',       labelKey: 'emp_manager' },
        { key: 'helper',        labelKey: 'emp_helper' },
        { key: 'guard',         labelKey: 'emp_guard' }
    ];

    function getRoleLabel(key) {
        var role = ROLES.find(function(r) { return r.key === key; });
        return role ? Lang.t(role.labelKey) : key;
    }

    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }

    // ── Render ──────────────────────────────────────────────────────────
    function render() {
        var employees = Store.get('employees');
        var activeEmps = employees.filter(function(e) { return e.active !== false; });
        var totalSalary = activeEmps.reduce(function(s, e) { return s + (parseFloat(e.salary) || 0); }, 0);

        var empCards = '';
        if (employees.length === 0) {
            empCards = '<div class="empty-state"><div class="empty-state-icon">👥</div><div class="empty-state-text">' + Lang.t('emp_no_employees') + '</div></div>';
        } else {
            employees.forEach(function(emp) {
                var isActive = emp.active !== false;
                var statusBadge = isActive
                    ? '<span class="badge badge-success">' + Lang.t('emp_active') + '</span>'
                    : '<span class="badge badge-danger">' + Lang.t('emp_inactive') + '</span>';
                var toggleLabel = isActive ? Lang.t('emp_deactivate') : Lang.t('emp_activate');
                var toggleBtnClass = isActive ? 'btn btn-danger btn-sm' : 'btn btn-success btn-sm';

                empCards += '<div class="card mt-1">' +
                    '<div class="card-header flex-between">' +
                        '<h3 class="card-title">👤 ' + emp.name + ' ' + statusBadge + '</h3>' +
                    '</div>' +
                    '<div class="card-body">' +
                        '<div class="form-row">' +
                            '<div><span class="text-muted">' + Lang.t('emp_role') + ':</span> ' + getRoleLabel(emp.role) + '</div>' +
                            '<div><span class="text-muted">' + Lang.t('emp_phone') + ':</span> ' + (emp.phone || '—') + '</div>' +
                        '</div>' +
                        '<div class="form-row mt-1">' +
                            '<div><span class="text-muted">' + Lang.t('emp_shift') + ':</span> ' + (emp.shift || '—') + '</div>' +
                            '<div><span class="text-muted">' + Lang.t('emp_salary') + ':</span> ' + App.formatCurrency(emp.salary) + '</div>' +
                        '</div>' +
                        '<div class="mt-1"><span class="text-muted">' + Lang.t('emp_join_date') + ':</span> ' + (emp.joinDate ? App.formatDate(emp.joinDate) : '—') + '</div>' +
                        '<div class="mt-2" style="display:flex;gap:8px;flex-wrap:wrap;">' +
                            (isActive ? '<button class="btn btn-success btn-sm emp-pay-btn" data-id="' + emp.id + '">💵 ' + Lang.t('emp_pay_salary') + '</button>' : '') +
                            '<button class="btn btn-secondary btn-sm emp-edit-btn" data-id="' + emp.id + '">✏️ ' + Lang.t('emp_edit') + '</button>' +
                            '<button class="' + toggleBtnClass + ' emp-toggle-btn" data-id="' + emp.id + '">' + (isActive ? '🚫' : '✅') + ' ' + toggleLabel + '</button>' +
                            '<button class="btn btn-secondary btn-sm emp-history-btn" data-id="' + emp.id + '">📜 ' + Lang.t('emp_salary_history') + '</button>' +
                        '</div>' +
                    '</div></div>';
            });
        }

        return '<div class="page">' +
            '<div class="page-header flex-between">' +
                '<h1 class="page-title">👥 ' + Lang.t('emp_title') + '</h1>' +
                '<button class="btn btn-primary" id="emp_add_btn">➕ ' + Lang.t('emp_add') + '</button>' +
            '</div>' +

            '<div class="stats-grid">' +
                '<div class="stat-card primary"><div class="stat-icon">👤</div><div class="stat-value">' + activeEmps.length + '</div><div class="stat-label">' + Lang.t('emp_total') + '</div></div>' +
                '<div class="stat-card warning"><div class="stat-icon">💰</div><div class="stat-value">' + App.formatCurrency(totalSalary) + '</div><div class="stat-label">' + Lang.t('emp_salary_bill') + '</div></div>' +
            '</div>' +

            empCards +
        '</div>';
    }

    // ── Add / Edit Employee Modal ───────────────────────────────────────
    function showEmployeeModal(existingEmp) {
        var isEdit = !!existingEmp;
        var emp = existingEmp || {};

        var roleOptions = ROLES.map(function(r) {
            var sel = emp.role === r.key ? ' selected' : '';
            return '<option value="' + r.key + '"' + sel + '>' + Lang.t(r.labelKey) + '</option>';
        }).join('');

        var html = '<div class="modal-header"><h3 class="modal-title">' + (isEdit ? '✏️ ' + Lang.t('emp_edit') : '➕ ' + Lang.t('emp_add')) + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_name') + '</label>' +
                        '<input type="text" class="form-input" id="emp_form_name" value="' + (emp.name || '') + '"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_phone') + '</label>' +
                        '<input type="text" class="form-input" id="emp_form_phone" value="' + (emp.phone || '') + '"></div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_role') + '</label>' +
                        '<select class="form-select" id="emp_form_role">' + roleOptions + '</select></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_salary') + '</label>' +
                        '<input type="number" class="form-input" id="emp_form_salary" min="0" value="' + (emp.salary || '') + '"></div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_shift') + '</label>' +
                        '<select class="form-select" id="emp_form_shift">' +
                            '<option value="1"' + (emp.shift == 1 ? ' selected' : '') + '>1</option>' +
                            '<option value="2"' + (emp.shift == 2 ? ' selected' : '') + '>2</option>' +
                        '</select></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_join_date') + '</label>' +
                        '<input type="date" class="form-input" id="emp_form_join" value="' + (emp.joinDate || todayISO()) + '"></div>' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="emp_form_cancel">' + Lang.t('emp_cancel') + '</button>' +
                '<button class="btn btn-primary" id="emp_form_save">' + Lang.t('emp_save') + '</button>' +
            '</div>';
        App.showModal(html);

        setTimeout(function() {
            document.getElementById('emp_form_cancel').addEventListener('click', function() { App.closeModal(); });
            document.getElementById('emp_form_save').addEventListener('click', function() {
                var name = document.getElementById('emp_form_name').value.trim();
                var phone = document.getElementById('emp_form_phone').value.trim();
                var role = document.getElementById('emp_form_role').value;
                var salary = parseFloat(document.getElementById('emp_form_salary').value);
                var shift = parseInt(document.getElementById('emp_form_shift').value);
                var joinDate = document.getElementById('emp_form_join').value;

                if (!name) { App.showToast(Lang.t('emp_name') + '!', 'error'); return; }

                if (isEdit) {
                    Store.update('employees', emp.id, { name: name, phone: phone, role: role, salary: salary, shift: shift, joinDate: joinDate });
                    App.showToast(Lang.t('emp_updated_success'), 'success');
                } else {
                    Store.add('employees', { name: name, phone: phone, role: role, salary: salary, shift: shift, joinDate: joinDate, active: true });
                    App.showToast(Lang.t('emp_added_success'), 'success');
                }
                App.closeModal();
                App.rerender();
            });
        }, 50);
    }

    // ── Pay Salary Modal ────────────────────────────────────────────────
    function showPayModal(empId) {
        var emp = Store.getById('employees', empId);
        if (!emp) return;

        var now = new Date();
        var months = '';
        for (var m = 1; m <= 12; m++) {
            var sel = m === (now.getMonth() + 1) ? ' selected' : '';
            months += '<option value="' + m + '"' + sel + '>' + m + '</option>';
        }

        var html = '<div class="modal-header"><h3 class="modal-title">💵 ' + Lang.t('emp_pay_salary') + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="form-group"><label class="form-label">' + Lang.t('emp_name') + '</label>' +
                    '<input type="text" class="form-input" value="' + emp.name + '" disabled></div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_amount') + '</label>' +
                        '<input type="number" class="form-input" id="emp_pay_amount" min="0" value="' + (emp.salary || 0) + '"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_month') + '</label>' +
                        '<select class="form-select" id="emp_pay_month">' + months + '</select></div>' +
                '</div>' +
                '<div class="form-row">' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_year') + '</label>' +
                        '<input type="number" class="form-input" id="emp_pay_year" value="' + now.getFullYear() + '"></div>' +
                    '<div class="form-group"><label class="form-label">' + Lang.t('emp_paid_date') + '</label>' +
                        '<input type="date" class="form-input" id="emp_pay_date" value="' + todayISO() + '"></div>' +
                '</div>' +
                '<div class="form-group"><label class="form-label">' + Lang.t('emp_notes') + '</label>' +
                    '<textarea class="form-textarea" id="emp_pay_notes" rows="2"></textarea></div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button class="btn btn-secondary" id="emp_pay_cancel">' + Lang.t('emp_cancel') + '</button>' +
                '<button class="btn btn-success" id="emp_pay_save">💵 ' + Lang.t('emp_pay') + '</button>' +
            '</div>';
        App.showModal(html);

        setTimeout(function() {
            document.getElementById('emp_pay_cancel').addEventListener('click', function() { App.closeModal(); });
            document.getElementById('emp_pay_save').addEventListener('click', function() {
                var amount = parseFloat(document.getElementById('emp_pay_amount').value);
                var month = parseInt(document.getElementById('emp_pay_month').value);
                var year = parseInt(document.getElementById('emp_pay_year').value);
                var paidDate = document.getElementById('emp_pay_date').value;
                var notes = document.getElementById('emp_pay_notes').value.trim();

                if (!amount || amount <= 0) { App.showToast(Lang.t('emp_amount') + '!', 'error'); return; }

                Store.add('salary_records', {
                    employeeId: emp.id,
                    employeeName: emp.name,
                    amount: amount,
                    month: month,
                    year: year,
                    paidDate: paidDate || todayISO(),
                    notes: notes
                });
                App.closeModal();
                App.showToast(Lang.t('emp_salary_paid'), 'success');
                App.rerender();
            });
        }, 50);
    }

    // ── Salary History Modal ────────────────────────────────────────────
    function showHistoryModal(empId) {
        var emp = Store.getById('employees', empId);
        if (!emp) return;
        var records = Store.get('salary_records').filter(function(r) { return r.employeeId === empId; });
        records.sort(function(a, b) { return (b.year * 100 + b.month) - (a.year * 100 + a.month); });

        var tableRows = '';
        if (records.length === 0) {
            tableRows = '<tr><td colspan="4" class="text-center">' + Lang.t('emp_no_salary_records') + '</td></tr>';
        } else {
            records.forEach(function(r) {
                tableRows += '<tr>' +
                    '<td>' + r.month + ' / ' + r.year + '</td>' +
                    '<td class="text-right">' + App.formatCurrency(r.amount) + '</td>' +
                    '<td>' + (r.paidDate ? App.formatDate(r.paidDate) : '—') + '</td>' +
                    '<td>' + (r.notes || '—') + '</td>' +
                '</tr>';
            });
        }

        var html = '<div class="modal-header"><h3 class="modal-title">📜 ' + Lang.t('emp_salary_history') + ' — ' + emp.name + '</h3></div>' +
            '<div class="modal-body">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                    '<th>' + Lang.t('emp_month') + ' / ' + Lang.t('emp_year') + '</th>' +
                    '<th class="text-right">' + Lang.t('emp_amount') + '</th>' +
                    '<th>' + Lang.t('emp_paid_date') + '</th>' +
                    '<th>' + Lang.t('emp_notes') + '</th>' +
                '</tr></thead><tbody>' + tableRows + '</tbody></table></div>' +
            '</div>' +
            '<div class="modal-footer"><button class="btn btn-secondary" id="emp_history_close">' + Lang.t('emp_close') + '</button></div>';
        App.showModal(html);

        setTimeout(function() {
            document.getElementById('emp_history_close').addEventListener('click', function() { App.closeModal(); });
        }, 50);
    }

    // ── Init ────────────────────────────────────────────────────────────
    function init() {
        var addBtn = document.getElementById('emp_add_btn');
        if (addBtn) addBtn.addEventListener('click', function() { showEmployeeModal(null); });

        // Pay buttons
        document.querySelectorAll('.emp-pay-btn').forEach(function(btn) {
            btn.addEventListener('click', function() { showPayModal(btn.getAttribute('data-id')); });
        });

        // Edit buttons
        document.querySelectorAll('.emp-edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var emp = Store.getById('employees', btn.getAttribute('data-id'));
                if (emp) showEmployeeModal(emp);
            });
        });

        // Toggle active/inactive
        document.querySelectorAll('.emp-toggle-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = btn.getAttribute('data-id');
                var emp = Store.getById('employees', id);
                if (emp) {
                    Store.update('employees', id, { active: emp.active === false ? true : false });
                    App.showToast(Lang.t('emp_status_changed'), 'success');
                    App.rerender();
                }
            });
        });

        // Salary history buttons
        document.querySelectorAll('.emp-history-btn').forEach(function(btn) {
            btn.addEventListener('click', function() { showHistoryModal(btn.getAttribute('data-id')); });
        });
    }

    // ── Register ────────────────────────────────────────────────────────
    App.registerModule('employees', { render: render, init: init });
})();
