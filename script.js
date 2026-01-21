// Load bills from localStorage or create empty array
let bills = JSON.parse(localStorage.getItem("bills")) || [];

// Function to add bill
function addBill() {
    let name = document.getElementById("billName").value;
    let date = document.getElementById("dueDate").value;
    let amount = document.getElementById("amount").value;

    // Validation
    if (name === "" || date === "" || amount === "") {
        document.getElementById("msg").innerText = "Please fill all fields";
        return;
    }

    // Create bill object
    let bill = {
        name: name,
        dueDate: date,
        amount: amount
    };

    // Store bill
    bills.push(bill);
    localStorage.setItem("bills", JSON.stringify(bills));

    document.getElementById("msg").innerText = "✅ Bill added successfully";

    // Clear inputs
    document.getElementById("billName").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("amount").value = "";

    displayBills();
}

// Function to display bills
function displayBills() {
    let list = document.getElementById("billList");
    list.innerHTML = "";

    bills.forEach((bill, index) => {
        let li = document.createElement("li");

        // Check overdue
        let today = new Date().toISOString().split("T")[0];
        let status = bill.dueDate < today ? "❗ Overdue" : "⏳ Pending";

        li.innerText = `${index + 1}. ${bill.name} | ₹${bill.amount} | Due: ${bill.dueDate} | ${status}`;
        list.appendChild(li);
    });
}

// Load bills on refresh
displayBills();
