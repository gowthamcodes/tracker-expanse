const balance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expanse = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -200 },
//   { id: 2, text: "Books", amount: -50 },
//   { id: 3, text: "Salary", amount: 600 },
//   { id: 4, text: "Rent", amount: -100 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(event) {
  if (text.value.trim() === 0 || amount.value.trim() === 0) {
    alert("Please Specify values");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }

  event.preventDefault();
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, value) => (acc += value), 0).toFixed(2);

  const inc = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, value) => (acc += value), 0)
    .toFixed(2);

  const exp = (
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, value) => (acc += value), 0) * -1
  ).toFixed(2);

  balance.innerHTML = `$${total}`;
  income.innerHTML = `$${inc}`;
  expanse.innerHTML = `$${exp}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
