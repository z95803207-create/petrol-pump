/* ============================================
   Lang.js - Bilingual Translation System
   Supports English & Urdu (RTL)
   ============================================ */

const Lang = {
    _translations: { en: {}, ur: {} },
    current: localStorage.getItem('app_lang') || 'en',

    register(translations) {
        if (translations.en) Object.assign(this._translations.en, translations.en);
        if (translations.ur) Object.assign(this._translations.ur, translations.ur);
    },

    t(key) {
        return this._translations[this.current][key] || this._translations['en'][key] || key;
    },

    toggle() {
        this.current = this.current === 'en' ? 'ur' : 'en';
        localStorage.setItem('app_lang', this.current);
        document.documentElement.dir = this.current === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.current;
        if (typeof App !== 'undefined') App.rerender();
    },

    isUrdu() { return this.current === 'ur'; },

    init() {
        document.documentElement.dir = this.current === 'ur' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.current;
    }
};

/* ============================================
   Common Translations
   ============================================ */

Lang.register({
    en: {
        // App
        app_name: 'Petrol Pump Manager',

        // Navigation
        nav_dashboard: 'Dashboard',
        nav_sales: 'Sales',
        nav_inventory: 'Fuel Stock',
        nav_udhar: 'Udhar (Credit)',
        nav_expenses: 'Expenses',
        nav_employees: 'Employees',
        nav_reports: 'Reports',
        nav_settings: 'Settings',

        // Common Buttons
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        add_new: 'Add New',
        search: 'Search',
        view: 'View',
        close: 'Close',
        print: 'Print',
        export: 'Export',
        import: 'Import',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        reset: 'Reset',
        update: 'Update',
        loading: 'Loading...',
        filter: 'Filter',

        // Common Labels
        no_data: 'No data available',
        confirm_delete: 'Are you sure you want to delete this item? This action cannot be undone.',
        actions: 'Actions',
        date: 'Date',
        amount: 'Amount',
        total: 'Total',
        status: 'Status',
        name: 'Name',
        phone: 'Phone',
        address: 'Address',
        description: 'Description',
        category: 'Category',
        type: 'Type',
        quantity: 'Quantity',
        rate: 'Rate',
        price: 'Price',
        notes: 'Notes',
        from_date: 'From Date',
        to_date: 'To Date',
        shift: 'Shift',
        serial_no: 'Sr. No.',

        // Currency & Time
        pkr: 'PKR',
        today: 'Today',
        yesterday: 'Yesterday',
        this_week: 'This Week',
        this_month: 'This Month',
        last_month: 'Last Month',
        all: 'All',

        // Status Messages
        success_saved: 'Saved successfully!',
        success_updated: 'Updated successfully!',
        success_deleted: 'Deleted successfully!',
        success_added: 'Added successfully!',
        success_exported: 'Data exported successfully!',
        success_imported: 'Data imported successfully!',
        error_occurred: 'An error occurred. Please try again.',
        error_required: 'Please fill in all required fields.',
        error_invalid: 'Invalid input. Please check your entries.',
        error_import: 'Failed to import data. Please check the file format.',
        warning_unsaved: 'You have unsaved changes.',

        // Fuel Related
        fuel_type: 'Fuel Type',
        petrol: 'Petrol',
        diesel: 'Diesel',
        cng: 'CNG',
        liters: 'Liters',
        kg: 'KG',
        per_liter: 'Per Liter',
        per_kg: 'Per KG',
        tank_capacity: 'Tank Capacity',
        current_stock: 'Current Stock',
        stock_level: 'Stock Level',

        // Financial
        paid: 'Paid',
        unpaid: 'Unpaid',
        partial: 'Partial',
        payment: 'Payment',
        balance: 'Balance',
        credit: 'Credit',
        debit: 'Debit',
        cash: 'Cash',
        income: 'Income',
        expense: 'Expense',
        profit: 'Profit',
        loss: 'Loss',
        salary: 'Salary',
        advance: 'Advance',
        bonus: 'Bonus',
        deduction: 'Deduction',

        // Language Toggle
        lang_toggle: 'اردو',
        lang_name: 'English',

        // Login & Portals
        login_select_portal: 'Select Portal',
        login_select_portal_desc: 'Select your workspace portal to log in',
        admin_portal: 'Admin / Owner Portal',
        admin_portal_desc: 'Full configuration, settings, rates & overall reports.',
        manager_portal: 'Manager Portal',
        manager_portal_desc: 'Sales logging, separate udhar ledger, and shift management.',
        enter_password: 'Enter Password',
        password_placeholder: 'Enter secure password',
        login_btn: 'Sign In',
        back_to_portals: 'Back to Portals',
        invalid_password: 'Invalid password! Please try again.',
        logged_in_as: 'Logged in as',
        logout: 'Logout',
        role_admin: 'Admin',
        role_manager: 'Manager',

        // Pakistan Fuel Rates Sync
        rates_sync_title: 'Pakistan Fuel Rates Sync',
        rates_sync_desc: 'Sync and update fuel prices directly with the official Pakistan rates.',
        check_live_rates: 'Check Live Rates',
        rates_checking: 'Checking Pakistan fuel rates...',
        rates_up_to_date: 'Rates are up to date with Pakistan market!',
        new_rates_available: 'New fuel rates detected in Pakistan!',
        apply_new_rates: 'Apply Sync Rates',
        rate_applied_success: 'Rates applied successfully!',
        pakistan_market: 'Pakistan Market Price',
        current_pump_price: 'Current Pump Price'
    },

    ur: {
        // App
        app_name: 'پیٹرول پمپ مینیجر',

        // Navigation
        nav_dashboard: 'ڈیش بورڈ',
        nav_sales: 'فروخت',
        nav_inventory: 'ایندھن اسٹاک',
        nav_udhar: 'ادھار',
        nav_expenses: 'اخراجات',
        nav_employees: 'ملازمین',
        nav_reports: 'رپورٹس',
        nav_settings: 'ترتیبات',

        // Common Buttons
        save: 'محفوظ کریں',
        cancel: 'منسوخ',
        delete: 'حذف کریں',
        edit: 'ترمیم',
        add: 'شامل کریں',
        add_new: 'نیا شامل کریں',
        search: 'تلاش',
        view: 'دیکھیں',
        close: 'بند کریں',
        print: 'پرنٹ',
        export: 'ایکسپورٹ',
        import: 'امپورٹ',
        confirm: 'تصدیق',
        back: 'واپس',
        next: 'اگلا',
        submit: 'جمع کرائیں',
        reset: 'ری سیٹ',
        update: 'اپ ڈیٹ',
        loading: 'لوڈ ہو رہا ہے...',
        filter: 'فلٹر',

        // Common Labels
        no_data: 'کوئی ڈیٹا دستیاب نہیں ہے',
        confirm_delete: 'کیا آپ واقعی اس آئٹم کو حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔',
        actions: 'کارروائیاں',
        date: 'تاریخ',
        amount: 'رقم',
        total: 'کل',
        status: 'حالت',
        name: 'نام',
        phone: 'فون',
        address: 'پتہ',
        description: 'تفصیل',
        category: 'زمرہ',
        type: 'قسم',
        quantity: 'مقدار',
        rate: 'ریٹ',
        price: 'قیمت',
        notes: 'نوٹس',
        from_date: 'تاریخ سے',
        to_date: 'تاریخ تک',
        shift: 'شفٹ',
        serial_no: 'نمبر شمار',

        // Currency & Time
        pkr: 'روپے',
        today: 'آج',
        yesterday: 'کل',
        this_week: 'اس ہفتے',
        this_month: 'اس مہینے',
        last_month: 'پچھلا مہینہ',
        all: 'سب',

        // Status Messages
        success_saved: 'کامیابی سے محفوظ ہو گیا!',
        success_updated: 'کامیابی سے اپ ڈیٹ ہو گیا!',
        success_deleted: 'کامیابی سے حذف ہو گیا!',
        success_added: 'کامیابی سے شامل ہو گیا!',
        success_exported: 'ڈیٹا کامیابی سے ایکسپورٹ ہو گیا!',
        success_imported: 'ڈیٹا کامیابی سے امپورٹ ہو گیا!',
        error_occurred: 'ایک خرابی پیش آ گئی۔ دوبارہ کوشش کریں۔',
        error_required: 'براہ کرم تمام ضروری خانے پُر کریں۔',
        error_invalid: 'غلط ان پٹ۔ براہ کرم اپنی اندراجات چیک کریں۔',
        error_import: 'ڈیٹا امپورٹ ناکام۔ براہ کرم فائل فارمیٹ چیک کریں۔',
        warning_unsaved: 'آپ کی غیر محفوظ تبدیلیاں ہیں۔',

        // Fuel Related
        fuel_type: 'ایندھن کی قسم',
        petrol: 'پیٹرول',
        diesel: 'ڈیزل',
        cng: 'سی این جی',
        liters: 'لیٹر',
        kg: 'کلوگرام',
        per_liter: 'فی لیٹر',
        per_kg: 'فی کلوگرام',
        tank_capacity: 'ٹینک کی گنجائش',
        current_stock: 'موجودہ اسٹاک',
        stock_level: 'اسٹاک کی سطح',

        // Financial
        paid: 'اندا شدہ',
        unpaid: 'غیر ادا شدہ',
        partial: 'جزوی',
        payment: 'ادائیگی',
        balance: 'بیلنس',
        credit: 'کریڈٹ',
        debit: 'ڈیبٹ',
        cash: 'نقد',
        income: 'آمدنی',
        expense: 'خرچ',
        profit: 'منافع',
        loss: 'نقصان',
        salary: 'تنخواہ',
        advance: 'ایڈوانس',
        bonus: 'بونس',
        deduction: 'کٹوتی',

        // Language Toggle
        lang_toggle: 'EN',
        lang_name: 'اردو',

        // Login & Portals
        login_select_portal: 'پورٹل منتخب کریں',
        login_select_portal_desc: 'لاگ ان کرنے کے لیے اپنا ورک اسپیس پورٹل منتخب کریں',
        admin_portal: 'ایڈمن / مالکانہ پورٹل',
        admin_portal_desc: 'مکمل کنٹرول، ترتیبات، فیول ریٹس اور مجموعی رپورٹس۔',
        manager_portal: 'مینیجر پورٹل',
        manager_portal_desc: 'سیلز کا اندراج، اپنا علیحدہ ادھار کھاتہ، اور شفٹ کا انتظام۔',
        enter_password: 'پاس ورڈ درج کریں',
        password_placeholder: 'اپنا خفیہ پاس ورڈ درج کریں',
        login_btn: 'سائن ان کریں',
        back_to_portals: 'پورٹلز پر واپس جائیں',
        invalid_password: 'غلط پاس ورڈ! دوبارہ کوشش کریں۔',
        logged_in_as: 'لاگ ان بحیثیت',
        logout: 'لاگ آؤٹ',
        role_admin: 'ایڈمن',
        role_manager: 'مینیجر',

        // Pakistan Fuel Rates Sync
        rates_sync_title: 'پاکستانی فیول ریٹس سنک',
        rates_sync_desc: 'سرکاری پاکستانی مارکیٹ کے ریٹس کے مطابق ایندھن کی قیمتیں براہِ راست اپ ڈیٹ کریں۔',
        check_live_rates: 'لائیو ریٹس چیک کریں',
        rates_checking: 'پاکستانی مارکیٹ ریٹس چیک کیے جا رہے ہیں...',
        rates_up_to_date: 'ریٹس پاکستانی مارکیٹ کے مطابق اپ ٹو ڈیٹ ہیں!',
        new_rates_available: 'پاکستان میں نئے فیول ریٹس موصول ہوئے ہیں!',
        apply_new_rates: 'سنک شدہ ریٹس لاگو کریں',
        rate_applied_success: 'نئے ریٹس کامیابی سے لاگو ہو گئے ہیں!',
        pakistan_market: 'پاکستانی مارکیٹ پرائس',
        current_pump_price: 'پمپ کا موجودہ ریٹ'
    }
});
