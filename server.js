const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require('./koneksi');
const PORT = 3000;

// Middleware untuk membaca template engine EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); // Untuk parsing JSON dari body request
app.use(bodyParser.urlencoded({ extended: true }));

// Rute untuk halaman
const pageRoutes = require('./routes/pages');
app.use('/', pageRoutes); // Semua rute halaman di-handle di `routes/pages.js`

// Menambah item ke cart
// Menggunakan parameter untuk query SQL
app.post('/cart', (req, res) => {
    const { guest_id, item_id, quantity } = req.body;

    // Query untuk menambahkan item atau memperbarui quantity
    const sql = `
        INSERT INTO cart (guest_id, item_id, quantity) 
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?;
    `;
    const values = [guest_id, item_id, quantity, quantity];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            return res.status(500).send({ success: false, message: 'Error adding item to cart' });
        }
        res.json({ success: true });
    });
});

// Mengupdate kuantitas item di cart
app.post('/cart/update', (req, res) => {
    const { cart_id, quantity } = req.body; // Mengambil cart_id dari request body
    console.log(`Updating cart_id: ${cart_id}, quantity: ${quantity}`);

    // Pastikan quantity adalah angka yang valid
    if (isNaN(quantity) || quantity < 1) {
        return res.status(400).send({ success: false, message: 'Invalid quantity' });
    }

    // Update quantity di tabel cart berdasarkan cart_id
    const updateQuantitySql = `
        UPDATE cart 
        SET quantity = ? 
        WHERE cart_id = ?;
    `;

    db.query(updateQuantitySql, [quantity, cart_id], (err, result) => {
        if (err) {
            console.error('Error updating quantity:', err);
            return res.status(500).send({ success: false, message: 'Error updating quantity' });
        }

        console.log('Update result:', result);
        res.json({ success: true }); // Mengirim respons JSON
    });
});

// Menghapus item dari cart berdasarkan cart_id
app.delete('/cart/remove/:cartId', (req, res) => {
    const { cartId } = req.params; // Mengambil cart_id dari parameter URL
    console.log(`Removing item with cart_id: ${cartId}`);

    // Query untuk menghapus item dari tabel cart
    const deleteItemSql = `
        DELETE FROM cart 
        WHERE cart_id = ?;
    `;

    db.query(deleteItemSql, [cartId], (err, result) => {
        if (err) {
            console.error('Error removing item from cart:', err);
            return res.status(500).send({ success: false, message: 'Error removing item from cart' });
        }

        console.log('Delete result:', result);
        res.json({ success: true }); // Mengirim respons JSON
    });
});

app.post("/submit", (req, res) => {
    const { name, address, email, phone } = req.body;
    const sql = `INSERT INTO guest (name, address, email, phone) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, address, email, phone], (err, result) => {
        if (err) {
            console.error("Error inserting guest data:", err);
            res.status(500).send("Error inserting guest data");
            return;
        }
        res.json({ success: true, guest_id: result.insertId });
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});