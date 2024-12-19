const express = require('express');
const router = express.Router();
const db = require('../koneksi');

// Rute halaman Home
router.get('/', (req, res) => {
    res.render('home'); // Render file `home.ejs`
});

// Rute halaman Menu
router.get('/menu', (req, res) => {
    res.render('menu'); // Render file `menu.ejs`
});

// Rute halaman Cart
// Rute halaman Cart
router.get('/cart', (req, res) => {
    const guestId = req.query.guest_id; // Mengambil guest_id dari query parameter

    const sql = `
        SELECT c.cart_id, i.name, i.price, c.quantity
        FROM cart c
        JOIN items i ON c.item_id = i.item_id
        WHERE c.guest_id = ?
    `;

    db.query(sql, [guestId], (err, results) => {
        if (err) {
            console.error("Error fetching cart data:", err);
            return res.status(500).send({ success: false, message: 'Error loading cart' });
        }
        
        // Render halaman keranjang dengan data, meskipun kosong
        res.render('cart', { cartItems: results, guestId: guestId });
    });
});

router.get('/checkout', (req, res) => {
    res.render('checkout'); // Render file `checkout.ejs`
});


module.exports = router;