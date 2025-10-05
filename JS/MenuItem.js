class MenuItem {
  constructor(id, name, price, category, description = "", available = true) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.available = available;
    this.createdAt = new Date();
  }

  // Method: Cập nhật giá món ăn
  updatePrice(newPrice) {
    if (newPrice < 0) {
      return console.log("Giá không thể âm");
    }
    this.price = newPrice;
  }

  // Method: Thay đổi trạng thái có sẵn
  toggleAvailability() {
    this.available = !this.available;
  }

  // Method: Lấy thông tin chi tiết
  getDetails() {
    return `Ten: ${this.name} | gia : ${this.price} | danh muc: ${this.category} | mo ta: ${this.description} | ${this.available ? "Còn hàng" : "Hết hàng"}`;
  }

  // Method: Format giá tiền
  getFormattedPrice() {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.price);
  }
}

export default MenuItem;
