const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaresBtn = document.getElementById("show-millionares");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();

    const user = data.results[0];

    const {
        name: { first, last },
    } = user;

    const newUser = {
        name: first + " " + last,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach((person) => {
        const { name, money } = person;
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${name}</strong> ${formatMoney(money)}`;
        main.appendChild(element);
    });
}

// double money
function doubleMoney() {
    data = data.map((person) => {
        return { ...person, money: person.money * 2 };
    });
    updateDOM();
}

// sort by richest
function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// show only millionares
function showMillionares() {
    data = data.filter((person) => person.money > 1000000);
    updateDOM();
}

// calculate total wealth
function showTotalWealth() {
    const totalWealth = data.reduce(
        (total, person) => (total += person.money),
        0
    );

    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        totalWealth
    )}</strong> </h3>`;

    main.appendChild(wealthEl);
}

// format number as money
function formatMoney(money) {
    return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionaresBtn.addEventListener("click", showMillionares);
calculateWealthBtn.addEventListener("click", showTotalWealth);
