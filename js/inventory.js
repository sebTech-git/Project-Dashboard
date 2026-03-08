const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

if (toggleBtn && sidebar) { 
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");

        const content = document.querySelector(".inventory-content") || document.querySelector("div[style]");
        if (sidebar.classList.contains("collapsed")) {
            content.style.marginLeft = "80px"; 
        } else {
            content.style.marginLeft = "220px"; 
        }
    });
}

const addBtn = document.getElementById("addProduct");
const tableBody = document.querySelector("#inventoryTable tbody");

addBtn.addEventListener("click", () => {

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const qty = document.getElementById("productQty").value;

    if(name === "" || price === "" || qty === ""){
        alert("Please fill all fields");
        return;
    }

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>$${price}</td>
        <td>${qty}</td>
    `;

    tableBody.appendChild(row);

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQty").value = "";
});