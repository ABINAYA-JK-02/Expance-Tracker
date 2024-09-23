// Get references to the input fields and elements
const descriptionInput = document.getElementById("expense-description");
const amountInput = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense");
const totalAmountElement = document.getElementById("total-amount");
const expenseListElement = document.getElementById("expense-list");

let totalAmount = 0;
let expenses = [];

// Function to add a new expense
function addExpense() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Add the expense to the list
    expenses.push({ description, amount });
    totalAmount += amount;

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";

    // Update the UI
    updateExpenseList();
    updateTotalAmount();
}

// Function to update the expense list in the UI
function updateExpenseList() {
    expenseListElement.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.description}: $${expense.amount.toFixed(2)} <button onclick="removeExpense(${index})">Remove</button>`;
        expenseListElement.appendChild(li);
    });
}

// Function to update the total amount
function updateTotalAmount() {
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to remove an expense
function removeExpense(index) {
    totalAmount -= expenses[index].amount;
    expenses.splice(index, 1);
    updateExpenseList();
    updateTotalAmount();
}

// Add event listener to the button
addExpenseButton.addEventListener("click", addExpense);
