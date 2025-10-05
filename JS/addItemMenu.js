function getMenu() {
    try {
        const localStoragemenu = localStorage.getItem("menuItems");
        if (localStoragemenu) {
            console.log("Menu data loaded from localStorage.");
            return JSON.parse(localStoragemenu);
        } else {
            console.log("Không tìm thấy dữ liệu menu trong localStorage!");
            return [];
        }
    } catch (error) {
        console.error("Lỗi khi đọc dữ liệu menu từ localStorage:", error);
        return [];
    }
}

function saveMenuToLocalStorage(menuItems) {
    try {
        localStorage.setItem("menuItems", JSON.stringify(menuItems));
        console.log("Menu data saved to localStorage successfully.");
        return true;
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu menu vào localStorage:", error);
        return false;
    }
}

function addMenuItem(name, price, category, description, menuData) {
    const newItems = {
        name,
        price: Number(price),
        category,
        description
    }
    menuData.push(newItems);
    const isSaved = saveMenuToLocalStorage(menuData);
    if (!isSaved) {
        console.error("Không thể lưu mục mới vào localStorage.");
    } else {
        console.log("Mục mới đã được thêm và lưu thành công.");
    }
}

function renderAddItemForm() {
    const menuData = getMenu();
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;
    const category = document.getElementById("itemCategory").value;
    const description = document.getElementById("itemDescription").value;

    if (!name || !price || !category) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
        return;
    }

    addMenuItem(name, price, category, description, menuData);
    alert("Món ăn đã được thêm thành công!");
}

const btnAddItem = document.getElementById("addItemButton");
if (!btnAddItem) {
    console.error("Nút thêm món không tìm thấy!");
} else {
    btnAddItem.onclick = (event) => {
        event.preventDefault();
        renderAddItemForm();
    }
}
