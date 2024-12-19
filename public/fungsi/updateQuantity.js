function updateQuantity(cartId) {
    const quantityInput = document.getElementById(`quantity-${cartId}`);
    const quantity = quantityInput.value;

    // Validasi kuantitas
    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Kirim permintaan ke server untuk memperbarui kuantitas
    fetch('/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cart_id: cartId, // Menggunakan cartId
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Quantity updated successfully!');
            location.reload(); // Refresh halaman untuk memperbarui tampilan
        } else {
            alert('Failed to update quantity.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('An error occurred while updating quantity.');
    });
}