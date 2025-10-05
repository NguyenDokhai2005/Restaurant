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

function removeMenuItem(index, menuData) {
    if (index < 0 || index >= menuData.length) {
        console.error("Chỉ số không hợp lệ:", index);
        return;
    }
    menuData.splice(index, 1);
    const isSaved = saveMenuToLocalStorage(menuData);
    if (!isSaved) {
        console.error("Không thể lưu thay đổi vào localStorage.");
    } else {
        console.log("Mục đã được xóa và lưu thành công.");
    }
}

function renderMenu() {
    const menuData = getMenu();
    const menuContainer = document.getElementById("menu-table-body");

    menuData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.description || ""}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td><button class="delete-btn" data-index="${index}">Xóa</button></td>
        `;
        menuContainer.appendChild(row);
    });

    const deletebtns = document.querySelectorAll(".delete-btn");
    deletebtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index, 10);
            removeMenuItem(index, menuData);
            menuContainer.innerHTML = "";
            renderMenu();
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
});