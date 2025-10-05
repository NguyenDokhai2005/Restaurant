class Order {
  constructor(id, customerId, tableNumber = null) {
    this.id = id;
    this.customerId = customerId;
    this.tableNumber = tableNumber;
    this.items = []; // Array chứa các món đã order
    this.status = "pending"; // pending, preparing, ready, served, paid,cancel
    this.createdAt = new Date();
    this.discount = 0; // Giảm giá (%)
    this.tax = 0.1; // Thuế VAT 10%
  }

  // Method: Thêm món vào đơn hàng
  addItem(menuItem, quantity = 1, note = "") {
    if (quantity <= 0) {
      return console.log("Số lượng phải lớn hơn 0");
    }
    const newItem = {
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: quantity,
      note: note,
    }
    this.items.push(newItem);
  }

  // Method: Xóa món khỏi đơn hàng
  removeItem(menuItemId) {
    return this.items = this.items.filter(item => item.menuItemId !== menuItemId);
  }

  // Method: Cập nhật số lượng món
  updateItemQuantity(menuItemId, newQuantity) {
    return this.items = this.items.map(item => {
      if (item.menuItemId === menuItemId) {
        item.quantity = newQuantity;
      }
    });
  }

  // Method: Tính tổng tiền trước thuế và giảm giá
  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Method: Tính tiền giảm giá
  getDiscountAmount() {
    return this.getSubtotal() * (this.discount);
  }

  // Method: Tính thuế
  getTaxAmount() {
    return (this.getSubtotal() * this.tax);
  }

  // Method: Tính tổng tiền cuối cùng
  getTotal() {
    return this.getSubtotal() - this.getDiscountAmount() + this.getTaxAmount();
  }

  // Method: Áp dụng giảm giá
  applyDiscount(percentage) {
    if (percentage < 0 || percentage > 100) {
      return console.log("Giảm giá không hợp lệ");
    }
    this.discount = percentage;
    return this.getTotal();
  }

  // Method: Cập nhật trạng thái đơn hàng
  updateStatus(newStatus) {
    return this.status = newStatus;
  }

  getAllItems() {
    return this.items;
  }

  // Method: Lấy các món theo danh mục (sử dụng Array methods)**
  getItemsByCategory(category) {
    return this.items.filter(item => item.category === category);
  }

  // Method: Lấy món đắt nhất trong đơn hàng
  getMostExpensiveItem() {
    if (this.items.length === 0) return null;
    return this.items.reduce((max, item) => (item.price > max.price ? item : max), this.items[0]);
  }

  // Method: Lấy thống kê đơn hàng == chưa hiểu nội dung
  getOrderSummary() { }

  // Method: Xuất hóa đơn
  generateReceipt() {
    return `
    ===== HÓA ĐƠN =====
    Mã đơn hàng: ${this.id}
    Khách hàng: ${this.customerId}
    Bàn số: ${this.tableNumber}
    Ngày: ${this.createdAt.toLocaleString()}
    --------------------
    ${this.items.map(item => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} VND`).join("\n")}
    --------------------
    Tạm tính: ${this.getSubtotal().toFixed(2)} VND
    Giảm giá: -${this.getDiscountAmount().toFixed(2)} VND
    Thuế (VAT 10%): +${this.getTaxAmount().toFixed(2)} VND
    --------------------
    Tổng cộng: ${this.getTotal().toFixed(2)} VND
    ====================
    Cảm ơn quý khách! Hẹn gặp lại!
    `;
  }
}

export default Order;
