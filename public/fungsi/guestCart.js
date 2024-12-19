document.querySelector("#guest-form").addEventListener("submit", (event) => {
    event.preventDefault(); //  Mencegah user untuk masuk ke halman baru sesaat setelah mengisi form
    const formData = new FormData(event.target);

    fetch("/submit", {
        method: "POST",
        body: new URLSearchParams(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to submit guest information.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.success && data.guest_id) {
                document.querySelector("#guest-id").value = data.guest_id;
                alert("Guest information saved successfully!");
            } else {
                alert("Failed to save guest information.");
            }
        })
        .catch((error) => {
            console.error("Error submitting guest information:", error);
        });
});