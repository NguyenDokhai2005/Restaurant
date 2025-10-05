class Customer {
  constructor(id, name, phone, email = "") {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.orderHistory = [];
    this.createdAt = new Date();
  }

  // Method: Thêm đơn hàng vào lịch sử
  addOrderToHistory(order) {
    this.orderHistory.push(order);
  }

  // Method: Lấy tổng số tiền đã chi tiêu
  getTotalSpent() {
    return this.orderHistory.reduce((total, order) => total + order.getTotal(), 0);
  }

  // Method: Lấy số đơn hàng
  getOrderCount() {
    return this.orderHistory.length;
  }

  // Method: Lấy thông tin khách hàng
  getProfile() {
    return `Tên: ${this.name} | SĐT: ${this.phone} | Email: ${this.email} | Tổng chi tiêu: ${this.getTotalSpent()} | Số đơn hàng: ${this.getOrderCount()}`;
  }
}


export default Customer;