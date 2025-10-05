let currentFilter = "all";
let filteredMenu = [];

function renderMenu(menu) {
    const container = document.getElementById("menu-list");
    if (!container) return;

    if (menu.length === 0) {
        container.innerHTML = `
            <div class="menu-empty">
                <h3>Không tìm thấy món ăn nào</h3>
                <p>Hãy thử chọn danh mục khác để xem thêm món ăn</p>
            </div>
        `;
        return;
    }

    container.innerHTML = menu
        .map((item) => `
            <div class="menu-card">
                <div class="menu-card-header">
                    <span class="menu-badge">${item.category || "Khác"}</span>
                    <span class="menu-price">${Number(item.price).toLocaleString()} đ</span>
                </div>
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-desc">${item.description || ""}</p>
            </div>
        `)
        .join("");
}

function filterMenu(category) {
    currentFilter = category;

    const menuData = getMenu();

    if (category === "all") {
        filteredMenu = menuData;
    } else {
        filteredMenu = menuData.filter(item => item.category === category);
    }

    renderMenu(filteredMenu);

    updateActiveFilter(category);
}

function updateActiveFilter(activeCategory) {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === activeCategory) {
            btn.classList.add('active');
        }
    });
}

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterMenu(category);
        });
    });
}

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


function initMenuPage() {
    const menuData = getMenu();
    console.log("Loaded menu data:", menuData);

    renderMenu(menuData);
    initFilterButtons();
}

function refreshMenu() {
    console.log("Refreshing menu...");
    const menuData = getMenu();
    console.log("Fresh menu data:", menuData);

    renderMenu(menuData);

    return menuData;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuPage);
} else {
    initMenuPage();
}