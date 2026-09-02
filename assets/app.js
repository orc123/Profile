/**
 * Interactive CV Application
 * Handles Theme Toggle, Language Switcher, Tech Filter, and Print actions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Setup
    const langViBtn = document.getElementById('lang-vi-btn');
    const langEnBtn = document.getElementById('lang-en-btn');
    const htmlDoc = document.documentElement;

    // Restore saved language or default to 'vi'
    const savedLang = localStorage.getItem('cv_lang') || 'vi';
    setLanguage(savedLang);

    if (langViBtn && langEnBtn) {
        langViBtn.addEventListener('click', () => setLanguage('vi'));
        langEnBtn.addEventListener('click', () => setLanguage('en'));
    }

    function setLanguage(lang) {
        htmlDoc.setAttribute('data-lang', lang);
        localStorage.setItem('cv_lang', lang);

        if (lang === 'vi') {
            langViBtn?.classList.add('active');
            langEnBtn?.classList.remove('active');
            document.title = "CV - Phạm Ngọc Đông | Middle .NET Developer";
        } else {
            langEnBtn?.classList.add('active');
            langViBtn?.classList.remove('active');
            document.title = "Resume - Pham Ngoc Dong | Middle .NET Developer";
        }
        updateDownloadLinks(lang);
    }

    // 2. Theme Toggle Setup
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('cv_theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlDoc.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlDoc.setAttribute('data-theme', theme);
        localStorage.setItem('cv_theme', theme);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // 3. Print Functionality
    const printBtn = document.getElementById('print-cv-btn');
    if (printBtn) {
        printBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.print();
        });
    }

    // 4. Update Download Links based on language
    function updateDownloadLinks(lang) {
        const pdfFileName = lang === 'vi' ? 'CV_PhamNgocDong_TiengViet.pdf' : 'CV_PhamNgocDong_English.pdf';
        const mdFileName = lang === 'vi' ? 'CV_PhamNgocDong_TiengViet.md' : 'CV_PhamNgocDong_English.md';

        const pdfBtns = document.querySelectorAll('#download-pdf-btn, #download-docx-btn, #download-pdf-sidebar-btn');
        pdfBtns.forEach(btn => {
            btn.href = pdfFileName;
            btn.setAttribute('download', pdfFileName);
        });

        const mdBtns = document.querySelectorAll('#download-md-btn');
        mdBtns.forEach(btn => {
            btn.href = mdFileName;
            btn.setAttribute('download', mdFileName);
        });
    }

    // 5. Tech Filter Setup
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter') || 'all';

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    const tags = card.getAttribute('data-tags') || '';
                    if (tags.toLowerCase().includes(filter.toLowerCase())) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});
