(function() {
    // 1. Register translations
    Lang.register({
        en: {
            'dash_title': 'Dashboard',
            'dash_today_sales': "Today's Sales",
            'dash_total_udhar': 'Total Udhar (Credit)',
            'dash_stock_value': 'Fuel Stock Value',
            'dash_month_revenue': 'This Month Revenue',
            'dash_fuel_levels': 'Fuel Stock Levels',
            'dash_recent_sales': 'Recent Sales',
            'dash_top_udhar': 'Top Udhar Customers',
            'dash_quick_actions': 'Quick Actions',
            'dash_new_sale': 'New Sale',
            'dash_add_stock': 'Add Stock',
            'dash_record_udhar': 'Record Udhar',
            'dash_add_expense': 'Add Expense',
            'dash_no_sales': 'No sales recorded yet',
            'dash_no_udhar': 'No outstanding credit',
            'dash_view_all': 'View All',
            'dash_fuel': 'Fuel',
            'dash_quantity': 'Quantity',
            'dash_rate': 'Rate',
            'dash_amount': 'Amount',
            'dash_payment_method': 'Payment Method',
            'dash_date': 'Date',
            'dash_customer': 'Customer',
            'dash_phone': 'Phone',
            'dash_outstanding': 'Outstanding',
            'dash_stock': 'Stock',
            'dash_capacity': 'Capacity',
            'dash_liters': 'L',
            'dash_kg': 'kg'
        },
        ur: {
            'dash_title': 'ڈیش بورڈ',
            'dash_today_sales': 'آج کی فروخت',
            'dash_total_udhar': 'کل ادھار',
            'dash_stock_value': 'ایندھن ذخیرہ قیمت',
            'dash_month_revenue': 'اس ماہ کی آمدنی',
            'dash_fuel_levels': 'ایندھن ذخیرہ سطح',
            'dash_recent_sales': 'حالیہ فروخت',
            'dash_top_udhar': 'سب سے زیادہ ادھار والے گاہک',
            'dash_quick_actions': 'فوری اقدامات',
            'dash_new_sale': 'نئی فروخت',
            'dash_add_stock': 'ذخیرہ شامل کریں',
            'dash_record_udhar': 'ادھار درج کریں',
            'dash_add_expense': 'خرچہ شامل کریں',
            'dash_no_sales': 'ابھی تک کوئی فروخت درج نہیں ہوئی',
            'dash_no_udhar': 'کوئی بقایا ادھار نہیں',
            'dash_view_all': 'سب دیکھیں',
            'dash_fuel': 'ایندھن',
            'dash_quantity': 'مقدار',
            'dash_rate': 'ریٹ',
            'dash_amount': 'رقم',
            'dash_payment_method': 'ادائیگی کا طریقہ',
            'dash_date': 'تاریخ',
            'dash_customer': 'گاہک',
            'dash_phone': 'فون',
            'dash_outstanding': 'بقایا',
            'dash_stock': 'ذخیرہ',
            'dash_capacity': 'گنجائش',
            'dash_liters': 'لیٹر',
            'dash_kg': 'کلو'
        }
    });

    // 2. Helper functions
    var liveRates = null;

    function getTodayStr() {
        return new Date().toISOString().split('T')[0];
    }

    function getMonthStart() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    }

    function getTodaySales() {
        var today = getTodayStr();
        var sales = Store.get('sales') || [];
        return sales.filter(function(s) {
            return s.date && s.date.startsWith(today);
        });
    }

    function getMonthSales() {
        var monthStart = getMonthStart();
        var sales = Store.get('sales') || [];
        return sales.filter(function(s) {
            return s.date && s.date >= monthStart;
        });
    }

    function sumAmounts(items) {
        return items.reduce(function(sum, item) {
            return sum + (Number(item.amount) || 0);
        }, 0);
    }

    function getTotalOutstanding() {
        var records = Store.get('udhar_records') || [];
        var totalCredit = records.filter(function(r) { return r.type === 'credit'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        var totalPayment = records.filter(function(r) { return r.type === 'payment'; })
            .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        return totalCredit - totalPayment;
    }

    function getStockValue() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        return fuelTypes.reduce(function(sum, f) {
            return sum + ((Number(f.currentStock) || 0) * (Number(f.rate) || 0));
        }, 0);
    }

    function getTopUdharCustomers(limit) {
        var customers = Store.get('customers') || [];
        var records = Store.get('udhar_records') || [];
        var customerBalances = customers.map(function(c) {
            var custRecords = records.filter(function(r) { return r.customerId === c.id; });
            var totalCredit = custRecords.filter(function(r) { return r.type === 'credit'; })
                .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
            var totalPayment = custRecords.filter(function(r) { return r.type === 'payment'; })
                .reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
            return {
                id: c.id,
                name: c.name,
                phone: c.phone || '-',
                outstanding: totalCredit - totalPayment
            };
        });
        return customerBalances
            .filter(function(c) { return c.outstanding > 0; })
            .sort(function(a, b) { return b.outstanding - a.outstanding; })
            .slice(0, limit || 5);
    }

    function getFuelStockPercent(current, capacity) {
        if (!capacity || capacity <= 0) return 0;
        return Math.min(100, Math.max(0, (current / capacity) * 100));
    }

    function getStockColor(percent) {
        if (percent > 50) return '#27ae60';
        if (percent >= 25) return '#f39c12';
        return '#e74c3c';
    }

    function getFuelDisplayName(fuel) {
        if (Lang.isUrdu() && fuel.nameUr) return fuel.nameUr;
        return fuel.name || '';
    }

    function checkLiveRatesNotification() {
        if (!liveRates) return { available: false };
        var settings = Store.getSettings();
        var petrolType = settings.fuelTypes.find(function(f) { return f.id === 'petrol'; });
        var dieselType = settings.fuelTypes.find(function(f) { return f.id === 'diesel'; });
        var cngType = settings.fuelTypes.find(function(f) { return f.id === 'cng'; });

        var needsUpdate = false;
        if (petrolType && Math.abs(Number(petrolType.rate) - liveRates.petrol) > 0.01) needsUpdate = true;
        if (dieselType && Math.abs(Number(dieselType.rate) - liveRates.diesel) > 0.01) needsUpdate = true;
        if (cngType && Math.abs(Number(cngType.rate) - liveRates.cng) > 0.01) needsUpdate = true;

        if (needsUpdate) {
            return {
                available: true,
                petrol: liveRates.petrol,
                diesel: liveRates.diesel,
                cng: liveRates.cng
            };
        }
        return { available: false };
    }

    // 3. Render function
    function render() {
        var settings = Store.getSettings();
        var fuelTypes = (settings && settings.fuelTypes) || [];
        var todaySales = getTodaySales();
        var monthSales = getMonthSales();
        var todayTotal = sumAmounts(todaySales);
        var monthTotal = sumAmounts(monthSales);
        var totalUdhar = getTotalOutstanding();
        var stockValue = getStockValue();
        var allSales = Store.get('sales') || [];
        var recentSales = allSales.sort(function(a, b) {
            return (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || '');
        }).slice(0, 10);
        var topUdhar = getTopUdharCustomers(5);

        // Live Rates Sync Check
        var ratesAlertHtml = '';
        var rateCheck = checkLiveRatesNotification();
        if (rateCheck.available) {
            ratesAlertHtml = '<div class="rates-alert-banner" id="dashboardRatesSyncBanner">' +
                '<div>' +
                    '<strong>🔔 ' + Lang.t('new_rates_available') + '</strong> &nbsp;|&nbsp; ' +
                    'Petrol: ' + App.formatCurrency(rateCheck.petrol) + ' &nbsp;&bull;&nbsp; ' +
                    'Diesel: ' + App.formatCurrency(rateCheck.diesel) + ' &nbsp;&bull;&nbsp; ' +
                    'CNG: ' + App.formatCurrency(rateCheck.cng) + '' +
                '</div>' +
                '<button class="btn btn-sm btn-primary" id="dashboardApplyRatesBtn">' + Lang.t('apply_new_rates') + '</button>' +
            '</div>';
        }

        // Stats Cards
        var statsHtml = '<div class="stats-grid">' +
            '<div class="stat-card primary">' +
                '<div class="stat-icon">💰</div>' +
                '<div class="stat-value">' + App.formatCurrency(todayTotal) + '</div>' +
                '<div class="stat-label">' + Lang.t('dash_today_sales') + '</div>' +
            '</div>' +
            '<div class="stat-card danger">' +
                '<div class="stat-icon">📋</div>' +
                '<div class="stat-value">' + App.formatCurrency(totalUdhar) + '</div>' +
                '<div class="stat-label">' + Lang.t('dash_total_udhar') + '</div>' +
            '</div>' +
            '<div class="stat-card warning">' +
                '<div class="stat-icon">⛽</div>' +
                '<div class="stat-value">' + App.formatCurrency(stockValue) + '</div>' +
                '<div class="stat-label">' + Lang.t('dash_stock_value') + '</div>' +
            '</div>' +
            '<div class="stat-card success">' +
                '<div class="stat-icon">📈</div>' +
                '<div class="stat-value">' + App.formatCurrency(monthTotal) + '</div>' +
                '<div class="stat-label">' + Lang.t('dash_month_revenue') + '</div>' +
            '</div>' +
        '</div>';

        // Fuel Stock Levels
        var fuelStockHtml = '<div class="card"><div class="card-header"><div class="card-title">⛽ ' + Lang.t('dash_fuel_levels') + '</div></div><div class="card-body">';
        if (fuelTypes.length === 0) {
            fuelStockHtml += '<div class="empty-state"><div class="empty-state-text">' + Lang.t('dash_no_sales') + '</div></div>';
        } else {
            fuelTypes.forEach(function(fuel) {
                var current = Number(fuel.currentStock) || 0;
                var capacity = Number(fuel.tankCapacity) || 1;
                var percent = getFuelStockPercent(current, capacity);
                var color = getStockColor(percent);
                var unit = (fuel.id === 'cng') ? Lang.t('dash_kg') : Lang.t('dash_liters');
                fuelStockHtml += '<div class="mb-2">' +
                    '<div class="flex flex-between mb-1">' +
                        '<strong>' + getFuelDisplayName(fuel) + '</strong>' +
                        '<span class="text-muted">' + current.toLocaleString() + ' / ' + capacity.toLocaleString() + ' ' + unit + ' &nbsp;|&nbsp; ' + Lang.t('dash_rate') + ': ' + App.formatCurrency(fuel.rate) + '</span>' +
                    '</div>' +
                    '<div class="progress-bar">' +
                        '<div class="progress-fill" style="width:' + percent.toFixed(1) + '%;background:' + color + '"></div>' +
                    '</div>' +
                '</div>';
            });
        }
        fuelStockHtml += '</div></div>';

        // Recent Sales
        var recentSalesHtml = '<div class="card"><div class="card-header"><div class="card-title">🧾 ' + Lang.t('dash_recent_sales') + '</div>' +
            '<button class="btn btn-sm btn-secondary" id="dash-view-all-sales">' + Lang.t('dash_view_all') + '</button>' +
            '</div><div class="card-body">';
        if (recentSales.length === 0) {
            recentSalesHtml += '<div class="empty-state"><div class="empty-state-icon">🧾</div><div class="empty-state-text">' + Lang.t('dash_no_sales') + '</div></div>';
        } else {
            recentSalesHtml += '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('dash_date') + '</th>' +
                '<th>' + Lang.t('dash_fuel') + '</th>' +
                '<th>' + Lang.t('dash_quantity') + '</th>' +
                '<th>' + Lang.t('dash_amount') + '</th>' +
                '<th>' + Lang.t('dash_payment_method') + '</th>' +
                '</tr></thead><tbody>';
            recentSales.forEach(function(sale) {
                var fuelName = sale.fuelName || sale.fuelType || '-';
                recentSalesHtml += '<tr>' +
                    '<td>' + App.formatDate(sale.date) + '</td>' +
                    '<td>' + fuelName + '</td>' +
                    '<td>' + (Number(sale.quantity) || 0).toFixed(2) + ' ' + Lang.t('dash_liters') + '</td>' +
                    '<td>' + App.formatCurrency(sale.amount) + '</td>' +
                    '<td>' + (sale.paymentMethod || '-') + '</td>' +
                '</tr>';
            });
            recentSalesHtml += '</tbody></table></div>';
        }
        recentSalesHtml += '</div></div>';

        // Top Udhar Customers
        var udharHtml = '<div class="card"><div class="card-header"><div class="card-title">📋 ' + Lang.t('dash_top_udhar') + '</div>' +
            '<button class="btn btn-sm btn-secondary" id="dash-view-all-udhar">' + Lang.t('dash_view_all') + '</button>' +
            '</div><div class="card-body">';
        if (topUdhar.length === 0) {
            udharHtml += '<div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">' + Lang.t('dash_no_udhar') + '</div></div>';
        } else {
            udharHtml += '<div class="table-responsive"><table class="data-table"><thead><tr>' +
                '<th>' + Lang.t('dash_customer') + '</th>' +
                '<th>' + Lang.t('dash_phone') + '</th>' +
                '<th>' + Lang.t('dash_outstanding') + '</th>' +
                '</tr></thead><tbody>';
            topUdhar.forEach(function(c) {
                udharHtml += '<tr>' +
                    '<td>' + c.name + '</td>' +
                    '<td>' + c.phone + '</td>' +
                    '<td class="text-danger"><strong>' + App.formatCurrency(c.outstanding) + '</strong></td>' +
                '</tr>';
            });
            udharHtml += '</tbody></table></div>';
        }
        udharHtml += '</div></div>';

        // Quick Actions
        var quickHtml = '<div class="card"><div class="card-header"><div class="card-title">⚡ ' + Lang.t('dash_quick_actions') + '</div></div><div class="card-body">' +
            '<div class="stats-grid">' +
                '<button class="btn btn-primary btn-icon" id="dash-quick-sale">💰 ' + Lang.t('dash_new_sale') + '</button>' +
                '<button class="btn btn-success btn-icon" id="dash-quick-stock">📦 ' + Lang.t('dash_add_stock') + '</button>' +
                '<button class="btn btn-warning btn-icon" id="dash-quick-udhar">📋 ' + Lang.t('dash_record_udhar') + '</button>' +
                '<button class="btn btn-danger btn-icon" id="dash-quick-expense">💸 ' + Lang.t('dash_add_expense') + '</button>' +
            '</div>' +
        '</div></div>';

        return '<div class="page">' +
            '<div class="page-header"><h1 class="page-title">📊 ' + Lang.t('dash_title') + '</h1></div>' +
            ratesAlertHtml +
            statsHtml +
            fuelStockHtml +
            '<div class="flex gap-1" style="flex-wrap:wrap;">' +
                '<div style="flex:1;min-width:300px;">' + recentSalesHtml + '</div>' +
                '<div style="flex:1;min-width:300px;">' + udharHtml + '</div>' +
            '</div>' +
            quickHtml +
        '</div>';
    }

    // 4. Init function
    function init() {
        var viewAllSales = document.getElementById('dash-view-all-sales');
        if (viewAllSales) {
            viewAllSales.addEventListener('click', function() {
                App.navigate('sales');
            });
        }

        var viewAllUdhar = document.getElementById('dash-view-all-udhar');
        if (viewAllUdhar) {
            viewAllUdhar.addEventListener('click', function() {
                App.navigate('udhar');
            });
        }

        var quickSale = document.getElementById('dash-quick-sale');
        if (quickSale) {
            quickSale.addEventListener('click', function() {
                App.navigate('sales');
            });
        }

        var quickStock = document.getElementById('dash-quick-stock');
        if (quickStock) {
            quickStock.addEventListener('click', function() {
                App.navigate('inventory');
            });
        }

        var quickUdhar = document.getElementById('dash-quick-udhar');
        if (quickUdhar) {
            quickUdhar.addEventListener('click', function() {
                App.navigate('udhar');
            });
        }

        var quickExpense = document.getElementById('dash-quick-expense');
        if (quickExpense) {
            quickExpense.addEventListener('click', function() {
                App.navigate('expenses');
            });
        }

        var dashboardApplyRatesBtn = document.getElementById('dashboardApplyRatesBtn');
        if (dashboardApplyRatesBtn && liveRates) {
            dashboardApplyRatesBtn.addEventListener('click', function() {
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
        }

        // Fetch live rates once in background
        if (!liveRates) {
            App.fetchLiveRates(function(err, data) {
                if (!err && data) {
                    liveRates = data;
                    App.rerender();
                }
            });
        }
    }

    // 5. Register with App
    App.registerModule('dashboard', { render: render, init: init });
})();
