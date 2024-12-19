document.querySelectorAll('.Cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item-id');
        const guestId = document.querySelector('#guest-id').value; // Guest ID dari hidden input
        const quantity = 1; // Default quantity
        console.log('Item ID:', itemId);

        if (!guestId) {
            alert("Please fill in your personal information first!");
            return;
        }

        // Buat array untuk menyimpan Promise
        let addItemPromises = [];

        // Tambahkan item ke keranjang dan simpan promise ke array
        addItemPromises.push(
            fetch('/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guest_id: guestId,
                    item_id: itemId,
                    quantity: quantity
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log(`Item ${itemId} added to cart.`);
                    alert(`Item ${itemId} has been added to your cart!`); // Tampilkan pesan
                } else {
                    console.error('Failed to add item');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
        );

        // Tunggu semua Promise selesai, tetapi jangan arahkan ke halaman cart
        Promise.all(addItemPromises)
            .then(() => {
                const viewCartButton = document.querySelector('#view-cart-button');
                viewCartButton.style.display = 'block'; // Tampilkan tombol
            })
            .catch(error => {
                alert('An error occurred while adding items to cart');
            });
    });
});

// Logika untuk tombol "View Cart"
document.querySelector('#view-cart-button').addEventListener('click', () => {
    const guestId = document.querySelector('#guest-id').value;
    window.location.href = `/cart?guest_id=${guestId}`; // Arahkan ke halaman cart
});