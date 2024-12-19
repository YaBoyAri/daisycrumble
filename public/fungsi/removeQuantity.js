function removeItem(cartId) {
    fetch(`/cart/remove/${cartId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Item removed successfully!');
            location.reload(); // Refresh halaman untuk memperbarui tampilan
        } else {
            alert('Failed to remove item.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while removing the item.');
    });
}