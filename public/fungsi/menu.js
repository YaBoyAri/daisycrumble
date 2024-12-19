const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navMenu = document.querySelector('.nav-menu');

// Fungsi membuka menu
menuIcon.addEventListener('click', () => {
    navMenu.classList.add('active');
    menuIcon.style.display = 'none'; // Sembunyikan tombol menu
});

// Fungsi menutup menu
closeIcon.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuIcon.style.display = 'block'; // Tampilkan kembali tombol menu
});

