const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");
const deleteBtn = document.getElementById("delete-btn");
const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const editBtn = document.getElementById("edit-btn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let selectedTransaction = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    const amount = Number(amountInput.value);
    if (text === null || amount === null) {
        alert("Please enter text and amount");
    } else {
        transactions.push({ id: generateId(), text, amount });
        updateLocalStorage();
        textInput.focus();
        clearForm();
        init();
    }
});

editBtn.addEventListener("click", () => {
    if (selectedTransaction === null) return;

    document.querySelector('input[type="submit"]').classList.remove("hide");
    editBtn.classList.add("hide");

    const selectedTransactionIndex = transactions.findIndex(
        (t) => t.id === selectedTransaction.id
    );
    selectedTransaction.text = textInput.value;
    selectedTransaction.amount = Number(amountInput.value);
    transactions[selectedTransactionIndex] = selectedTransaction;
    updateLocalStorage();
    init();

    clearForm();
});

function addTransactionToDOM(transaction) {
    const { id, text, amount } = transaction;
    const bgClass = amount > 0 ? "bg-success" : "bg-danger";
    const sign = amount > 0 ? "+" : "-";
    const html = `<li
    data-key="${id}"
    class="
        d-flex
        justify-content-between
        ${bgClass}
        text-light
        list-group-item
        mb-1
    "
>
    <div
        id="info"
        class="
            d-flex
            justify-content-between
            flex-grow-1
            pe-1
        "
    >
        <span>${text}</span>
        <span>${sign}${Math.abs(amount)}</span>
    </div>
    <div>
        <button
            id="edit-btn"
            class="btn btn-sm btn-primary"
            onclick="enableEdit(${id})"
        >
        <i class="fas fa-edit"></i>
        </button>
        <button
            id="delete-btn"
            class="btn btn-sm btn-danger"
            onclick="removeTransaction(${id})"
        >
        <i class="far fa-window-close"></i>
        </button>
    </div>
</li>`;

    history.innerHTML += html;
}

// Helper functions
function removeTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    updateLocalStorage();
    init();
}

function enableEdit(id) {
    document.querySelector('input[type="submit"]').classList.add("hide");
    editBtn.classList.remove("hide");
    selectedTransaction = transactions.find((item) => item.id === id);
    textInput.value = selectedTransaction.text;
    amountInput.value = selectedTransaction.amount;
}

function generateId() {
    return Math.floor(Math.random() * 100000000);
}

function updateValues() {
    const totalBalance = transactions
        .reduce((total, item) => (total += item.amount), 0)
        .toFixed(2);
    const totalIncome = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((total, item) => (total += item.amount), 0)
        .toFixed(2);

    const totalExpense = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((total, item) => (total += item.amount), 0)
        .toFixed(2);

    balance.innerText = `$${totalBalance}`;
    income.innerText = `$${totalIncome}`;
    expense.innerText = `$${totalExpense}`;
}

// clear form values
function clearForm() {
    textInput.value = "";
    amountInput.value = "";
}

// update localStorage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// initialize the app
function init() {
    history.innerHTML = "";
    transactions.forEach(addTransactionToDOM);
    updateValues();
}
init();
