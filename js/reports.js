(function() {
    // ── Register Translations ──────────────────────────────────────────
    Lang.register({
        en: {
            'rep_title': 'Reports',
            'rep_daily': 'Daily Report',
            'rep_monthly': 'Monthly Report',
            'rep_udhar': 'Udhar Report',
            'rep_fuel': 'Fuel Report',
            'rep_date': 'Date',
            'rep_month': 'Month',
            'rep_year': 'Year',
            'rep_total_sales': 'Total Sales',
            'rep_total_expenses': 'Total Expenses',
            'rep_net_profit': 'Net Profit',
            'rep_udhar_given': 'Udhar Given',
            'rep_revenue': 'Revenue',
            'rep_outstanding': 'Outstanding',
            'rep_by_fuel': 'Sales by Fuel Type',
            'rep_by_payment': 'Sales by Payment Method',
            'rep_print': 'Print Report',
            'rep_daily_chart': 'Daily Sales Chart',
            'rep_top_days': 'Top 5 Selling Days',
            'rep_expense_breakdown': 'Expense Breakdown',
            'rep_customer_name': 'Customer Name',
            'rep_total_credit': 'Total Credit',
            'rep_total_paid': 'Total Paid',
            'rep_stock_received': 'Stock Received',
            'rep_stock_sold': 'Stock Sold',
            'rep_stock_current': 'Current Stock',
            'rep_no_data': 'No data available for this period',
            'rep_fuel_movement': 'Fuel Stock Movement',
            'rep_fuel_type': 'Fuel Type',
            'rep_liters': 'Liters',
            'rep_amount': 'Amount',
            'rep_cash': 'Cash',
            'rep_udhar_label': 'Udhar (Credit)',
            'rep_online': 'Online',
            'rep_total_customers': 'Customers with Balance',
            'rep_highest_debtor': 'Highest Debtor',
            'rep_phone': 'Phone',
            'rep_day': 'Day',
            'rep_sales': 'Sales',
            'rep_stock_entries': 'Stock Entries This Month',
            'rep_entry_date': 'Date',
            'rep_quantity': 'Quantity',
            'rep_category': 'Category'
        },
        ur: {
            'rep_title': 'رپورٹس',
            'rep_daily': 'روزانہ رپورٹ',
            'rep_monthly': 'ماہانہ رپورٹ',
            'rep_udhar': 'ادھار رپورٹ',
            'rep_fuel': 'ایندھن رپورٹ',
            'rep_date': 'تاریخ',
            'rep_month': 'مہینہ',
            'rep_year': 'سال',
            'rep_total_sales': 'کل فروخت',
            'rep_total_expenses': 'کل اخراجات',
            'rep_net_profit': 'خالص منافع',
            'rep_udhar_given': 'ادھار دیا گیا',
            'rep_revenue': 'آمدنی',
            'rep_outstanding': 'بقایا',
            'rep_by_fuel': 'ایندھن کی قسم سے فروخت',
            'rep_by_payment': 'ادائیگی کے طریقے سے فروخت',
            'rep_print': 'رپورٹ پرنٹ کریں',
            'rep_daily_chart': 'روزانہ فروخت چارٹ',
            'rep_top_days': 'سب سے زیادہ فروخت کے 5 دن',
            'rep_expense_breakdown': 'خرچے کی تفصیل',
            'rep_customer_name': 'گاہک کا نام',
            'rep_total_credit': 'کل ادھار',
            'rep_total_paid': 'کل ادائیگی',
            'rep_stock_received': 'اسٹاک موصول',
            'rep_stock_sold': 'اسٹاک فروخت',
            'rep_stock_current': 'موجودہ اسٹاک',
            'rep_no_data': 'اس مدت کے لیے کوئی ڈیٹا نہیں',
            'rep_fuel_movement': 'ایندھن اسٹاک کی نقل و حرکت',
            'rep_fuel_type': 'ایندھن کی قسم',
            'rep_liters': 'لیٹر',
            'rep_amount': 'رقم',
            'rep_cash': 'نقد',
            'rep_udhar_label': 'ادھار',
            'rep_online': 'آن لائن',
            'rep_total_customers': 'بقایا والے گاہک',
            'rep_highest_debtor': 'سب سے زیادہ مقروض',
            'rep_phone': 'فون',
            'rep_day': 'دن',
            'rep_sales': 'فروخت',
            'rep_stock_entries': 'اس ماہ کے اسٹاک اندراجات',
            'rep_entry_date': 'تاریخ',
            'rep_quantity': 'مقدار',
            'rep_category': 'قسم'
        }
    });

    // ── State ───────────────────────────────────────────────────────────
    var activeTab = 'daily';
    var selectedDate = new Date().toISOString().slice(0, 10);
    var selectedMonth = new Date().getMonth() + 1;
    var selectedYear = new Date().getFullYear();

    // ── Helpers ─────────────────────────────────────────────────────────
    function todayISO() { return new Date().toISOString().slice(0, 10); }

    function matchesDate(dateStr, target) {
        return dateStr && dateStr.slice(0, 10) === target;
    }

    function matchesMonth(dateStr, month, year) {
        if (!dateStr) return false;
        var d = new Date(dateStr);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
    }

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    // ── Daily Report ────────────────────────────────────────────────────
    function renderDailyReport() {
        var sales = Store.get('sales').filter(function(s) { return matchesDate(s.date, selectedDate); });
        var expenses = Store.get('expenses').filter(function(e) { return matchesDate(e.date, selectedDate); });
        var udharRecords = Store.get('udhar_records').filter(function(u) { return matchesDate(u.date, selectedDate) && u.type === 'credit'; });

        var totalSales = sales.reduce(function(s, r) { return s + (parseFloat(r.totalAmount) || parseFloat(r.amount) || 0); }, 0);
        var totalExpenses = expenses.reduce(function(s, e) { return s + (parseFloat(e.amount) || 0); }, 0);
        var netProfit = totalSales - totalExpenses;
        var totalUdhar = udharRecords.reduce(function(s, u) { return s + (parseFloat(u.amount) || 0); }, 0);

        // By fuel type
        var fuelTotals = {};
        sales.forEach(function(s) {
            var key = s.fuelType || s.fuelName || 'Unknown';
            if (!fuelTotals[key]) fuelTotals[key] = { liters: 0, amount: 0 };
            fuelTotals[key].liters += parseFloat(s.liters || s.quantity || 0);
            fuelTotals[key].amount += parseFloat(s.totalAmount || s.amount || 0);
        });

        var fuelRows = '';
        Object.keys(fuelTotals).forEach(function(k) {
            fuelRows += '<tr><td>' + k + '</td><td class="text-right">' + fuelTotals[k].liters.toFixed(2) + '</td><td class="text-right">' + App.formatCurrency(fuelTotals[k].amount) + '</td></tr>';
        });
        if (!fuelRows) fuelRows = '<tr><td colspan="3" class="text-center text-muted">' + Lang.t('rep_no_data') + '</td></tr>';

        // By payment method
        var paymentTotals = { cash: 0, udhar: 0, online: 0 };
        sales.forEach(function(s) {
            var method = (s.paymentMethod || 'cash').toLowerCase();
            if (method === 'credit' || method === 'udhar') paymentTotals.udhar += parseFloat(s.totalAmount || s.amount || 0);
            else if (method === 'online') paymentTotals.online += parseFloat(s.totalAmount || s.amount || 0);
            else paymentTotals.cash += parseFloat(s.totalAmount || s.amount || 0);
        });

        return '<div class="form-group mb-2"><label class="form-label">' + Lang.t('rep_date') + '</label>' +
            '<input type="date" class="form-input" id="rep_daily_date" value="' + selectedDate + '" style="max-width:220px;"></div>' +

            '<div class="stats-grid">' +
                '<div class="stat-card success"><div class="stat-icon">💵</div><div class="stat-value">' + App.formatCurrency(totalSales) + '</div><div class="stat-label">' + Lang.t('rep_total_sales') + '</div></div>' +
                '<div class="stat-card danger"><div class="stat-icon">📉</div><div class="stat-value">' + App.formatCurrency(totalExpenses) + '</div><div class="stat-label">' + Lang.t('rep_total_expenses') + '</div></div>' +
                '<div class="stat-card ' + (netProfit >= 0 ? 'primary' : 'danger') + '"><div class="stat-icon">' + (netProfit >= 0 ? '📈' : '📉') + '</div><div class="stat-value">' + App.formatCurrency(netProfit) + '</div><div class="stat-label">' + Lang.t('rep_net_profit') + '</div></div>' +
                '<div class="stat-card warning"><div class="stat-icon">📋</div><div class="stat-value">' + App.formatCurrency(totalUdhar) + '</div><div class="stat-label">' + Lang.t('rep_udhar_given') + '</div></div>' +
            '</div>' +

            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">⛽ ' + Lang.t('rep_by_fuel') + '</h3></div><div class="card-body">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr><th>' + Lang.t('rep_fuel_type') + '</th><th class="text-right">' + Lang.t('rep_liters') + '</th><th class="text-right">' + Lang.t('rep_amount') + '</th></tr></thead><tbody>' + fuelRows + '</tbody></table></div>' +
            '</div></div>' +

            '<div class="card mt-2"><div class="card-header"><h3 class="card-title">💳 ' + Lang.t('rep_by_payment') + '</h3></div><div class="card-body">' +
                '<div class="table-responsive"><table class="data-table"><thead><tr><th>' + Lang.t('rep_category') + '</th><th class="text-right">' + Lang.t('rep_amount') + '</th></tr></thead><tbody>' +
                '<tr><td>💵 ' + Lang.t('rep_cash') + '</td><td class="text-right">' + App.formatCurrency(paymentTotals.cash) + '</td></tr>' +
                '<tr><td>📋 ' + Lang.t('rep_udhar_label') + '</td><td class="text-right">' + App.formatCurrency(paymentTotals.udhar) + '</td></tr>' +
                '<tr><td>📱 ' + Lang.t('rep_online') + '</td><td class="text-right">' + App.formatCurrency(paymentTotals.online) + '</td></tr>' +
                '</tbody></table></div>' +
            '</div></div>' +

            '<div class="mt-2"><button class="btn btn-primary" id="rep_print_daily">🖨️ ' + Lang.t('rep_print') + '</button></div>';
    }

    // ── Monthly Report ──────────────────────────────────────────────────
    function renderMonthlyReport() {
        var sales = Store.get('sales').filter(function(s) { return matchesMonth(s.date, selectedMonth, selectedYear); });
        var expenses = Store.get('expenses').filter(function(e) { return matchesMonth(e.date, selectedMonth, selectedYear); });

        var totalRevenue = sales.reduce(function(s, r) { return s + (parseFloat(r.totalAmount) || parseFloat(r.amount) || 0); }, 0);
        var totalExpenses = expenses.reduce(function(s, e) { return s + (parseFloat(e.amount) || 0); }, 0);
        var netProfit = totalRevenue - totalExpenses;

        // Udhar outstanding total
        var allUdhar = Store.get('udhar_records');
        var totalOutstanding = 0;
        var customers = Store.get('customers');
        customers.forEach(function(c) {
            totalOutstanding += parseFloat(c.balance || c.outstanding || 0);
        });

        // Daily sales for chart
        var numDays = daysInMonth(selectedMonth, selectedYear);
        var dailySales = {};
        for (var d = 1; d <= numDays; d++) dailySales[d] = 0;
        sales.forEach(function(s) {
            var day = new Date(s.date).getDate();
            dailySales[day] += parseFloat(s.totalAmount || s.amount || 0);
        });
        var maxDaySale = 0;
        Object.keys(dailySales).forEach(function(k) { if (dailySales[k] > maxDaySale) maxDaySale = dailySales[k]; });

        var barsHtml = '';
        for (var i = 1; i <= numDays; i++) {
            var pct = maxDaySale > 0 ? Math.round((dailySales[i] / maxDaySale) * 100) : 0;
            barsHtml += '<div style="display:inline-flex;flex-direction:column;align-items:center;width:' + Math.max(100 / numDays, 2.5) + '%;min-width:14px;">' +
                '<div style="width:70%;height:100px;display:flex;align-items:flex-end;">' +
                    '<div style="width:100%;height:' + pct + '%;background:linear-gradient(180deg,#4f8cff,#2563eb);border-radius:3px 3px 0 0;min-height:' + (dailySales[i] > 0 ? '4px' : '0') + ';transition:height .4s ease;"></div>' +
                '</div>' +
                '<span style="font-size:9px;color:var(--text-muted);margin-top:2px;">' + i + '</span>' +
            '</div>';
        }

        // Top 5 days
        var sortedDays = Object.keys(dailySales).map(function(k) { return { day: k, amount: dailySales[k] }; })
            .filter(function(d) { return d.amount > 0; })
            .sort(function(a, b) { return b.amount - a.amount; }).slice(0, 5);
        var topDaysRows = '';
        if (sortedDays.length === 0) {
            topDaysRows = '<tr><td colspan="2" class="text-center text-muted">' + Lang.t('rep_no_data') + '</td></tr>';
        } else {
            sortedDays.forEach(function(d, idx) {
                topDaysRows += '<tr><td>' + (idx + 1 === 1 ? '🥇' : idx + 1 === 2 ? '🥈' : idx + 1 === 3 ? '🥉' : '  ') + ' ' + Lang.t('rep_day') + ' ' + d.day + '</td><td class="text-right">' + App.formatCurrency(d.amount) + '</td></tr>';
            });
        }

        // Expense breakdown
        var expByCat = {};
        expenses.forEach(function(e) {
            expByCat[e.category] = (expByCat[e.category] || 0) + (parseFloat(e.amount) || 0);
        });
        var maxExpCat = 0;
        Object.keys(expByCat).forEach(function(k) { if (expByCat[k] > maxExpCat) maxExpCat = expByCat[k]; });
        var expBarHtml = '';
        Object.keys(expByCat).forEach(function(k) {
            var pct = maxExpCat > 0 ? Math.round((expByCat[k] / maxExpCat) * 100) : 0;
            expBarHtml += '<div style="margin-bottom:8px;"><div class="flex-between mb-1"><span>' + k + '</span><span>' + App.formatCurrency(expByCat[k]) + '</span></div>' +
                '<div style="background:rgba(255,255,255,0.08);border-radius:6px;height:18px;overflow:hidden;">' +
                '<div style="width:' + pct + '%;height:100%;background:#e74c3c;border-radius:6px;transition:width .5s ease;"></div></div></div>';
        });
        if (!expBarHtml) expBarHtml = '<div class="text-muted text-center">' + Lang.t('rep_no_data') + '</div>';

        // Month/year selector
        var monthOptions = '';
        for (var m = 1; m <= 12; m++) {
            monthOptions += '<option value="' + m + '"' + (m === selectedMonth ? ' selected' : '') + '>' + m + '</option>';
        }

        return '<div class="flex" style="gap:12px;flex-wrap:wrap;margin-bottom:16px;">' +
            '<div class="form-group" style="margin-bottom:0;"><label class="form-label">' + Lang.t('rep_month') + '</label>' +
                '<select class="form-select" id="rep_month_sel">' + monthOptions + '</select></div>' +
            '<div class="form-group" style="margin-bottom:0;"><label class="form-label">' + Lang.t('rep_year') + '</label>' +
                '<input type="number" class="form-input" id="rep_year_sel" value="' + selectedYear + '" style="width:100px;"></div>' +
        '</div>' +

        '<div class="stats-grid">' +
            '<div class="stat-card success"><div class="stat-icon">💰</div><div class="stat-value">' + App.formatCurrency(totalRevenue) + '</div><div class="stat-label">' + Lang.t('rep_revenue') + '</div></div>' +
            '<div class="stat-card danger"><div class="stat-icon">📉</div><div class="stat-value">' + App.formatCurrency(totalExpenses) + '</div><div class="stat-label">' + Lang.t('rep_total_expenses') + '</div></div>' +
            '<div class="stat-card ' + (netProfit >= 0 ? 'primary' : 'danger') + '"><div class="stat-icon">' + (netProfit >= 0 ? '📈' : '📉') + '</div><div class="stat-value">' + App.formatCurrency(netProfit) + '</div><div class="stat-label">' + Lang.t('rep_net_profit') + '</div></div>' +
            '<div class="stat-card warning"><div class="stat-icon">📋</div><div class="stat-value">' + App.formatCurrency(totalOutstanding) + '</div><div class="stat-label">' + Lang.t('rep_outstanding') + '</div></div>' +
        '</div>' +

        '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📊 ' + Lang.t('rep_daily_chart') + '</h3></div><div class="card-body">' +
            '<div style="display:flex;align-items:flex-end;gap:1px;padding:8px 0;">' + barsHtml + '</div>' +
        '</div></div>' +

        '<div class="card mt-2"><div class="card-header"><h3 class="card-title">🏆 ' + Lang.t('rep_top_days') + '</h3></div><div class="card-body">' +
            '<div class="table-responsive"><table class="data-table"><thead><tr><th>' + Lang.t('rep_day') + '</th><th class="text-right">' + Lang.t('rep_amount') + '</th></tr></thead><tbody>' + topDaysRows + '</tbody></table></div>' +
        '</div></div>' +

        '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📉 ' + Lang.t('rep_expense_breakdown') + '</h3></div><div class="card-body">' + expBarHtml + '</div></div>' +

        '<div class="mt-2"><button class="btn btn-primary" id="rep_print_monthly">🖨️ ' + Lang.t('rep_print') + '</button></div>';
    }

    // ── Udhar Report ────────────────────────────────────────────────────
    function renderUdharReport() {
        var customers = Store.get('customers');
        var udharRecords = Store.get('udhar_records');

        // Calculate balances
        var custBalances = customers.map(function(c) {
            var records = udharRecords.filter(function(u) { return u.customerId === c.id; });
            var totalCredit = records.filter(function(u) { return u.type === 'credit'; })
                .reduce(function(s, u) { return s + (parseFloat(u.amount) || 0); }, 0);
            var totalPaid = records.filter(function(u) { return u.type === 'payment'; })
                .reduce(function(s, u) { return s + (parseFloat(u.amount) || 0); }, 0);
            var outstanding = parseFloat(c.balance || c.outstanding || 0) || (totalCredit - totalPaid);
            return { name: c.name, phone: c.phone || '—', totalCredit: totalCredit, totalPaid: totalPaid, outstanding: outstanding };
        }).filter(function(c) { return c.outstanding > 0 || c.totalCredit > 0; })
          .sort(function(a, b) { return b.outstanding - a.outstanding; });

        var totalOutstanding = custBalances.reduce(function(s, c) { return s + c.outstanding; }, 0);
        var customersWithBal = custBalances.filter(function(c) { return c.outstanding > 0; }).length;
        var highestDebtor = custBalances.length > 0 ? custBalances[0] : null;

        var tableRows = '';
        if (custBalances.length === 0) {
            tableRows = '<tr><td colspan="5" class="text-center text-muted">' + Lang.t('rep_no_data') + '</td></tr>';
        } else {
            custBalances.forEach(function(c) {
                tableRows += '<tr>' +
                    '<td>' + c.name + '</td>' +
                    '<td>' + c.phone + '</td>' +
                    '<td class="text-right">' + App.formatCurrency(c.totalCredit) + '</td>' +
                    '<td class="text-right">' + App.formatCurrency(c.totalPaid) + '</td>' +
                    '<td class="text-right text-danger"><strong>' + App.formatCurrency(c.outstanding) + '</strong></td>' +
                '</tr>';
            });
        }

        return '<div class="stats-grid">' +
            '<div class="stat-card danger"><div class="stat-icon">💸</div><div class="stat-value">' + App.formatCurrency(totalOutstanding) + '</div><div class="stat-label">' + Lang.t('rep_outstanding') + '</div></div>' +
            '<div class="stat-card warning"><div class="stat-icon">👥</div><div class="stat-value">' + customersWithBal + '</div><div class="stat-label">' + Lang.t('rep_total_customers') + '</div></div>' +
            '<div class="stat-card primary"><div class="stat-icon">🏷️</div><div class="stat-value">' + (highestDebtor ? highestDebtor.name : '—') + '</div><div class="stat-label">' + Lang.t('rep_highest_debtor') + (highestDebtor ? ' — ' + App.formatCurrency(highestDebtor.outstanding) : '') + '</div></div>' +
        '</div>' +

        '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📋 ' + Lang.t('rep_outstanding') + '</h3></div><div class="card-body">' +
            '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('rep_customer_name') + '</th>' +
                '<th>' + Lang.t('rep_phone') + '</th>' +
                '<th class="text-right">' + Lang.t('rep_total_credit') + '</th>' +
                '<th class="text-right">' + Lang.t('rep_total_paid') + '</th>' +
                '<th class="text-right">' + Lang.t('rep_outstanding') + '</th>' +
            '</tr></thead><tbody>' + tableRows + '</tbody></table></div>' +
        '</div></div>';
    }

    // ── Fuel Report ─────────────────────────────────────────────────────
    function renderFuelReport() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var sales = Store.get('sales').filter(function(s) { return matchesMonth(s.date, selectedMonth, selectedYear); });
        var stockEntries = Store.get('stock_entries').filter(function(e) { return matchesMonth(e.date, selectedMonth, selectedYear); });

        var fuelCards = '';
        if (fuelTypes.length === 0) {
            fuelCards = '<div class="text-muted text-center">' + Lang.t('rep_no_data') + '</div>';
        } else {
            fuelTypes.forEach(function(ft) {
                var sold = sales.filter(function(s) { return s.fuelType === ft.name || s.fuelTypeId === ft.id; })
                    .reduce(function(s, r) { return s + (parseFloat(r.liters || r.quantity || 0)); }, 0);
                var received = stockEntries.filter(function(e) { return e.fuelType === ft.name || e.fuelTypeId === ft.id; })
                    .reduce(function(s, e) { return s + (parseFloat(e.quantity || e.liters || 0)); }, 0);

                fuelCards += '<div class="card mt-1"><div class="card-header"><h3 class="card-title">⛽ ' + ft.name + (ft.nameUr ? ' / ' + ft.nameUr : '') + '</h3></div>' +
                    '<div class="card-body"><div class="stats-grid">' +
                        '<div class="stat-card primary"><div class="stat-value">' + (ft.currentStock || 0).toFixed(1) + ' L</div><div class="stat-label">' + Lang.t('rep_stock_current') + '</div></div>' +
                        '<div class="stat-card success"><div class="stat-value">' + received.toFixed(1) + ' L</div><div class="stat-label">' + Lang.t('rep_stock_received') + '</div></div>' +
                        '<div class="stat-card danger"><div class="stat-value">' + sold.toFixed(1) + ' L</div><div class="stat-label">' + Lang.t('rep_stock_sold') + '</div></div>' +
                    '</div></div></div>';
            });
        }

        // Stock entries table
        var entryRows = '';
        if (stockEntries.length === 0) {
            entryRows = '<tr><td colspan="4" class="text-center text-muted">' + Lang.t('rep_no_data') + '</td></tr>';
        } else {
            stockEntries.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
            stockEntries.forEach(function(e) {
                entryRows += '<tr><td>' + App.formatDate(e.date) + '</td><td>' + (e.fuelType || e.fuelName || '—') + '</td><td class="text-right">' + (parseFloat(e.quantity || e.liters || 0)).toFixed(1) + ' L</td><td class="text-right">' + App.formatCurrency(e.amount || e.totalCost || 0) + '</td></tr>';
            });
        }

        // Month/year selector
        var monthOptions = '';
        for (var m = 1; m <= 12; m++) {
            monthOptions += '<option value="' + m + '"' + (m === selectedMonth ? ' selected' : '') + '>' + m + '</option>';
        }

        return '<div class="flex" style="gap:12px;flex-wrap:wrap;margin-bottom:16px;">' +
            '<div class="form-group" style="margin-bottom:0;"><label class="form-label">' + Lang.t('rep_month') + '</label>' +
                '<select class="form-select" id="rep_fuel_month_sel">' + monthOptions + '</select></div>' +
            '<div class="form-group" style="margin-bottom:0;"><label class="form-label">' + Lang.t('rep_year') + '</label>' +
                '<input type="number" class="form-input" id="rep_fuel_year_sel" value="' + selectedYear + '" style="width:100px;"></div>' +
        '</div>' +

        fuelCards +

        '<div class="card mt-2"><div class="card-header"><h3 class="card-title">📦 ' + Lang.t('rep_stock_entries') + '</h3></div><div class="card-body">' +
            '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('rep_entry_date') + '</th>' +
                '<th>' + Lang.t('rep_fuel_type') + '</th>' +
                '<th class="text-right">' + Lang.t('rep_quantity') + '</th>' +
                '<th class="text-right">' + Lang.t('rep_amount') + '</th>' +
            '</tr></thead><tbody>' + entryRows + '</tbody></table></div>' +
        '</div></div>';
    }

    // ── Main Render ─────────────────────────────────────────────────────
    function render() {
        var tabs = [
            { key: 'daily',   label: Lang.t('rep_daily'),   icon: '📅' },
            { key: 'monthly', label: Lang.t('rep_monthly'), icon: '📆' },
            { key: 'udhar',   label: Lang.t('rep_udhar'),   icon: '📋' },
            { key: 'fuel',    label: Lang.t('rep_fuel'),    icon: '⛽' }
        ];

        var tabBtns = tabs.map(function(t) {
            return '<button class="tab-btn' + (activeTab === t.key ? ' active' : '') + ' rep-tab-btn" data-tab="' + t.key + '">' + t.icon + ' ' + t.label + '</button>';
        }).join('');

        var content = '';
        if (activeTab === 'daily') content = renderDailyReport();
        else if (activeTab === 'monthly') content = renderMonthlyReport();
        else if (activeTab === 'udhar') content = renderUdharReport();
        else if (activeTab === 'fuel') content = renderFuelReport();

        return '<div class="page">' +
            '<div class="page-header"><h1 class="page-title">📊 ' + Lang.t('rep_title') + '</h1></div>' +
            '<div class="tabs mb-2">' + tabBtns + '</div>' +
            '<div id="rep_content">' + content + '</div>' +
        '</div>';
    }

    // ── Init ────────────────────────────────────────────────────────────
    function init() {
        // Tab switching
        document.querySelectorAll('.rep-tab-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                activeTab = btn.getAttribute('data-tab');
                App.rerender();
            });
        });

        // Daily date picker
        var dailyDate = document.getElementById('rep_daily_date');
        if (dailyDate) {
            dailyDate.addEventListener('change', function() {
                selectedDate = dailyDate.value;
                App.rerender();
            });
        }

        // Monthly selectors
        var monthSel = document.getElementById('rep_month_sel');
        var yearSel = document.getElementById('rep_year_sel');
        if (monthSel) monthSel.addEventListener('change', function() { selectedMonth = parseInt(monthSel.value); App.rerender(); });
        if (yearSel) yearSel.addEventListener('change', function() { selectedYear = parseInt(yearSel.value); App.rerender(); });

        // Fuel report selectors
        var fuelMonthSel = document.getElementById('rep_fuel_month_sel');
        var fuelYearSel = document.getElementById('rep_fuel_year_sel');
        if (fuelMonthSel) fuelMonthSel.addEventListener('change', function() { selectedMonth = parseInt(fuelMonthSel.value); App.rerender(); });
        if (fuelYearSel) fuelYearSel.addEventListener('change', function() { selectedYear = parseInt(fuelYearSel.value); App.rerender(); });

        // Print buttons
        var printDaily = document.getElementById('rep_print_daily');
        var printMonthly = document.getElementById('rep_print_monthly');
        if (printDaily) printDaily.addEventListener('click', function() { window.print(); });
        if (printMonthly) printMonthly.addEventListener('click', function() { window.print(); });
    }

    // ── Register ────────────────────────────────────────────────────────
    App.registerModule('reports', { render: render, init: init });
})();
