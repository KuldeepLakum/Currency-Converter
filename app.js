// updated base URL

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#cbtn");
const fromCurr = document.querySelector("#formCurr");
const toCurr = document.querySelector("#toCurr");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlage(evt.target);
  });
}
const updateFlage = (element) => {
  let currCode = element.value;
  let cntryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${cntryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amountVal");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.innerText = "1";
  }

  // update url structure
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

// btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();
//   let amount = document.querySelector("#amountVal");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }
//   //   console.log(fromCurr.value, toCurr.value);
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   console.log(response);
// });
