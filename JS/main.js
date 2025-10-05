// ================================
import Restaurant from "./Restaurant.js";
import MenuItem from "./MenuItem.js";
import Customer from "./Customer.js";
import Order from "./Order.js";
import { MENU_ITEMS, CUSTOMERS, ORDER_STATUS } from "./data.js";

console.log("Main JS loaded");

function saveRestaurantInfo(restaurant) {
    const restaurantInfo = {
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email
    };
    localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo));
}

function getRestaurantInfo() {
    const savedInfo = localStorage.getItem('restaurantInfo');
    if (savedInfo) {
        return JSON.parse(savedInfo);
    }

    return {
        name: "Tự Do Restaurant",
        address: "Phường Bến Nghé, Quận 1, TP HCM",
        phone: "0987291815",
        email: "TuDo@gmail.com"
    };
}


const restaurantInfo = getRestaurantInfo();
const myRestaurant = new Restaurant(restaurantInfo.name, restaurantInfo.address, restaurantInfo.phone, restaurantInfo.email);

MENU_ITEMS.forEach(item => {
    myRestaurant.addMenuItem(item.name, item.price, item.category, item.description);
});
console.log(myRestaurant);


function updateRestaurantDisplay() {

    document.title = myRestaurant.name;


    const nameElement = document.getElementById("name-retaurant");
    if (nameElement) {
        nameElement.innerText = myRestaurant.name;
    }

    const addressElement = document.getElementById("adress");
    if (addressElement) {
        addressElement.innerText = myRestaurant.address;
    } else {
        console.error("Address element not found!");
    }

    const phoneElement = document.getElementById("phone");
    if (phoneElement) {
        phoneElement.innerText = myRestaurant.phone;
    } else {
        console.error("Phone element not found!");
    }

    const emailElement = document.getElementById("email");
    if (emailElement) {
        emailElement.innerText = myRestaurant.email;
    } else {
        console.error("Email element not found!");
    }
}

updateRestaurantDisplay();

const btnChangeInfo = document.getElementById("btn-change-info");

if (btnChangeInfo) {
    btnChangeInfo.onclick = (event) => {
        event.preventDefault();
        const name = document.getElementById("restaurant-name").value;
        const address = document.getElementById("restaurant-address").value;
        const phone = document.getElementById("restaurant-phone").value;
        const email = document.getElementById("restaurant-email").value;

        myRestaurant.changeInfo(name, address, phone, email);

        saveRestaurantInfo(myRestaurant);

        alert("Thay đổi thông tin thành công!");
        console.log(myRestaurant);

        window.location.assign("index.html");
    };
}