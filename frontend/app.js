// Force logout once for the new system transition
if (localStorage.getItem('kvartira_version') !== '2.0') {
    localStorage.clear();
    localStorage.setItem('kvartira_version', '2.0');
}

const API_URL = '/api';

// Check Auth Status
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    return { isLoggedIn: isLoggedIn === 'true', userRole };
}

// Redirect if not authorized
function protectPage(allowedRoles = ['owner', 'admin']) {
    const auth = checkAuth();
    if (!auth.isLoggedIn || !allowedRoles.includes(auth.userRole)) {
        // If we are on a protected page, redirect to login with current page as parameter
        alert('Ushbu sahifaga kirish uchun login qilishingiz shart!');
        const currentPage = window.location.pathname;
        window.location.href = `/admin/login.html?redirect=${encodeURIComponent(currentPage)}`;
        return false;
    }
    return true;
}

// Premium Modal Logic
function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) modal.style.display = 'flex';
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) modal.style.display = 'none';
}

// Navigation Handlers
function handleAdminClick() {
    const auth = checkAuth();
    if (auth.isLoggedIn) {
        window.location.href = '../admin/dashboard.html';
    } else {
        showPremiumModal();
    }
}

function handleUploadClick() {
    const auth = checkAuth();
    if (auth.isLoggedIn && (auth.userRole === 'owner' || auth.userRole === 'admin')) {
        window.location.href = 'yuklash.html';
    } else {
        showPremiumModal();
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/';
}

// Export functions to window for onclick handlers
window.handleAdminClick = handleAdminClick;
window.handleUploadClick = handleUploadClick;
window.showPremiumModal = showPremiumModal;
window.closePremiumModal = closePremiumModal;
window.checkAuth = checkAuth;
window.protectPage = protectPage;
window.logout = logout;
