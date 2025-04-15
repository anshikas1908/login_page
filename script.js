document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("stationeryForm");
    const tableBody = document.querySelector("#stationeryTable tbody");

    // Load stored data when the page loads
    loadStoredItems();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get input values
        let itemName = document.getElementById("itemName").value.trim();
        let itemQuantity = document.getElementById("itemQuantity").value;
        let itemPrice = document.getElementById("itemPrice").value;

        if (itemName === "" || itemQuantity <= 0 || itemPrice <= 0) {
            alert("Please enter valid item details.");
            return;
        }

        // Create an item object
        let item = { name: itemName, quantity: itemQuantity, price: itemPrice };

        // Save to local storage
        saveItemToStorage(item);

        // Add item to the table
        addItemToTable(item);

        // Clear input fields
        form.reset();
    });

    function addItemToTable(item) {
        let newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td><button class="delete">Delete</button></td>
        `;

        tableBody.appendChild(newRow);

        // Delete functionality
        newRow.querySelector(".delete").addEventListener("click", function () {
            newRow.remove();
            removeItemFromStorage(item.name);
        });
    }

    function saveItemToStorage(item) {
        let items = JSON.parse(localStorage.getItem("stationeryItems")) || [];
        items.push(item);
        localStorage.setItem("stationeryItems", JSON.stringify(items));
    }

    function loadStoredItems() {
        let items = JSON.parse(localStorage.getItem("stationeryItems")) || [];
        items.forEach(addItemToTable);
    }

    function removeItemFromStorage(itemName) {
        let items = JSON.parse(localStorage.getItem("stationeryItems")) || [];
        items = items.filter(item => item.name !== itemName);
        localStorage.setItem("stationeryItems", JSON.stringify(items));
    }
});
