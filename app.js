// Get references to input fields and elements
const descriptionInput = document.getElementById("expense-description");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const dateInput = document.getElementById("expense-date");
const addExpenseButton = document.getElementById("add-expense");
const totalAmountElement = document.getElementById("total-amount");
const expenseListElement = document.getElementById("expense-list");

let totalAmount = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to add a new expense
function addExpense() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (description === "" || isNaN(amount) || amount <= 0 || date === "") {
        alert("Please enter valid details.");
        return;
    }

    // Add expense to the list
    const newExpense = { description, amount, category, date };
    expenses.push(newExpense);
    totalAmount += amount;

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";
    categoryInput.value = "food";
    dateInput.value = "";

    // Save expenses to localStorage
    saveExpenses();

    // Update the UI
    updateExpenseList();
    updateTotalAmount();
}

// Function to update the expense list in the UI
function updateExpenseList() {
    expenseListElement.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.date} | ${expense.category.toUpperCase()} | ${expense.description}: $${expense.amount.toFixed(2)} 
        <button onclick="removeExpense(${index})">Remove</button>
        <button onclick="editExpense(${index})">Edit</button>`;
        expenseListElement.appendChild(li);
    });
}

// Function to update the total amount
function updateTotalAmount() {
    totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to remove an expense
function removeExpense(index) {
    totalAmount -= expenses[index].amount;
    expenses.splice(index, 1);
    saveExpenses();
    updateExpenseList();
    updateTotalAmount();
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    dateInput.value = expense.date;

    removeExpense(index);  // Remove the old expense to edit
}

// Function to save expenses to localStorage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add event listener to the button
addExpenseButton.addEventListener("click", addExpense);

// On page load, update the expense list and total
updateExpenseList();
updateTotalAmount();
