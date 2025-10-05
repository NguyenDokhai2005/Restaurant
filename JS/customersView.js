import { CUSTOMERS } from "./data.js";

function getCharracterCount(str) {
  let pos = str.lastIndexOf(" ");
  return str[pos + 1];
}


function renderCustomers(customers) {
  const container = document.getElementById("customers-list");
  if (!container) return;

  container.innerHTML = customers
    .map((customer) =>
      `<div class="customer-card">
          <div class="customer-card-top">
            ${getCharracterCount(customer.name)}
          </div>
          <div class="customer-name">${customer.name}</div>
          <div class="customer-email">${customer.email}</div>
          <div class="customer-phone">${customer.phone}</div>
        </div>
      `
    ).join("");
}

renderCustomers(CUSTOMERS);