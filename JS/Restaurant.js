import { ORDER_STATUS } from "./data.js";
import MenuItem from "./MenuItem.js";
import Customer from "./Customer.js";
import Order from "./Order.js";


class Restaurant {
  constructor(name, address, phone, email = "") {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.menu = []; // Array chứa các MenuItem
    this.customers = []; // Array chứa các Customer
    this.orders = []; // Array chứa các Order
    this.tables = this.initializeTables(20); // 20 bàn
    this.nextOrderId = 1;
    this.nextCustomerId = 1;
    this.nextMenuItemId = 1;
  }

  //Thay đổi thông tin nhà hàng 
  changeInfo(name, address, phone, email) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  // Method: Khởi tạo bàn ăn
  initializeTables(numberOfTables) {
    return Array.from({ length: numberOfTables }, (_, index) => ({
      number: index + 1,
      seats: Math.floor(Math.random() * 6) + 2, // 2-8 ghế
      occupied: false,
      currentOrderId: null,
    }));
  }

  // =================== QUẢN LÝ MENU ===================

  // Method: Thêm món vào menu
  addMenuItem(name, price, category, description = "") {
    const menuItems = {
      id: this.menu.length + 1,
      name: name,
      price: price,
      category: category,
      description: description,
      available: true,
    }
    this.menu.push(menuItems)
  }



  // Method: Xóa món khỏi menu
  removeMenuItem(itemId) {
    this.menu = this.menu.filter(item => item.id !== itemId);
  }

  // Method: Tìm món trong menu (ES6 Array methods)
  findMenuItems(searchTerm) {
    return this.menu.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Method: Lấy menu theo danh mục
  getMenuByCategory(categoryItems) {
    if (categoryItems) {
      return this.menu.filter(item => item.category === categoryItems);
    } else {
      return null;
    }
  }

  // Method: Lấy các món có sẵn
  getAvailableItems() {
    return this.menu.filter(item => item.available);
  }

  // Method: Lấy top món đắt nhất
  getTopExpensiveItems(limit = 5) {
    const sortedItems = [...this.menu].sort((a, b) => b.price - a.price);
    return sortedItems.slice(0, limit);
  }

  // =================== QUẢN LÝ KHÁCH HÀNG ===================

  // Method: Thêm khách hàng mới
  addCustomer(name, phone, email = "") {
    const newCustomer = new Customer(this.customers.length + 1, name, phone, email);
    this.customers.push(newCustomer);
  }

  // Method: Tìm khách hàng
  findCustomer(searchTerm) {
    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString() === searchTerm
    );
  }

  // Method: Lấy khách hàng VIP 
  getVIPCustomers() {
    return this.customers.filter(customer => customer.getTotalSpent() > 1000);
  }

  // Method: Lấy top khách hàng chi tiêu nhiều nhất
  getTopCustomers(limit = 10) {
    const sortedCustomers = [...this.customers].sort((a, b) => b.getTotalSpent() - a.getTotalSpent());
    return sortedCustomers.slice(0, limit);
  }

  // =================== QUẢN LÝ ĐỚN HÀNG ===================

  // Method: Tạo đơn hàng mới
  createOrder(customerId, tableNumber = null) {
    if (!tableNumber) {
      return console.log("Vui lòng chọn bàn");
    } else {
      const table = this.tables.find(t => t.number === tableNumber);
      if (!table) {
        return console.log("Bàn không tồn tại");
      } else if (table.occupied) {
        return console.log("Bàn đã được sử dụng");
      }
    }
    const newOrder = new Order(this.orders.length + 1, customerId, tableNumber);
    this.orders.push(newOrder);
  }
  // Method: Hoàn thành đơn hàng
  completeOrder(orderId) {
    // Giải phóng bàn
    if (!this.orders[orderId - 1]) {
      return console.log("Không tìm thấy đơn hàng");
    }

    this.orders[orderId - 1].status = ORDER_STATUS.PAID;
    this.orders[orderId - 1].completedAt = new Date();
    const customerIdOlder = this.orders[orderId - 1].customerId;
    const customer = this.customers.find(c => c.id === customerIdOlder);
    if (customer) {
      customer.addOrderToHistory(this.orders[orderId - 1]);
    }
    console.log("Thanh toan thanh cong");
  }

  //Method : Thêm món vào đơn hàng
  addItemToOrder(menuItemId, quantity = 1, note = "") {
    this.orders.addItem(menuItemId, quantity, note);
  }

  // Method: Lấy đơn hàng theo trạng thái
  getOrdersByStatus(status) {
    return this.orders.filter(order => order.status === status);
  }

  // Method: Lấy đơn hàng đang chờ
  getPendingOrders() {
    return this.orders.filter(order => order.status === ORDER_STATUS.PENDING);
  }

  // Method: Lấy đơn hàng đang chuẩn bị
  getPreparingOrders() {
    return this.orders.filter(order => order.status === ORDER_STATUS.PREPARING);
  }

  // =================== QUẢN LÝ BÀN ===================

  // Method: Lấy bàn trống
  getAvailableTables() {
    return this.tables.filter(table => !table.occupied);
  }

  // Method: Lấy bàn đang sử dụng
  getOccupiedTables() {
    return this.tables.filter(table => table.occupied);
  }

  // =================== THỐNG KÊ VÀ BÁO CÁO ===================

  // Method: Tính doanh thu theo ngày
  getDailyRevenue(date = new Date()) {
    const targetDate = date.toDateString();
    return this.orders
      .filter(order => order.status === ORDER_STATUS.PAID && order.completedAt.toDateString() === targetDate)
      .reduce((total, order) => total + order.getTotal(), 0);
  }

  // Method: Lấy món bán chạy nhất
  getBestSellingItems(limit = 10) {
    const itemCount = {};
    this.orders.forEach(order => {
      order.items.forEach(item => {
        if (!itemCount[item.menuItemId]) {
          itemCount[item.menuItemId] = 0;
        }
        itemCount[item.menuItemId] += item.quantity;
      });
    })
    const sortedItems = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);
    return sortedItems.slice(0, limit);
  }
  // Method: Lấy báo cáo tổng quan
  getRestaurantSummary() {
    return {
      totalCustomers: this.customers.length,
      totalOrders: this.orders.length,
      totalRevenue: this.orders.reduce((total, order) => total + (order.status === ORDER_STATUS.PAID ? order.getTotal() : 0), 0),
      availableTables: this.getAvailableTables().length,
      occupiedTables: this.getOccupiedTables().length,
    };
  }
}

export default Restaurant;