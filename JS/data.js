export const MENU_ITEMS = [
  {
    name: "Gỏi cuốn tôm thịt",
    price: 45000,
    category: "Khai vị",
    description: "Gỏi cuốn tươi với tôm và thịt ba chỉ",
  },
  {
    name: "Chả cá Lã Vọng",
    price: 180000,
    category: "Món chính",
    description: "Đặc sản Hà Nội với cá lăng tươi",
  },
  {
    name: "Phở bò tái",
    price: 65000,
    category: "Món chính",
    description: "Phở bò truyền thống với thịt tái",
  },
  {
    name: "Bánh flan",
    price: 25000,
    category: "Tráng miệng",
    description: "Bánh flan mềm mịn với caramel",
  },
  {
    name: "Trà đá",
    price: 5000,
    category: "Đồ uống",
    description: "Trà đá truyền thống",
  },
  {
    name: "Cà phê sữa đá",
    price: 20000,
    category: "Đồ uống",
    description: "Cà phê phin với sữa đặc",
  },
  {
    name: "Salad trái cây",
    price: 35000,
    category: "Salad",
    description: "Salad trái cây tươi với sốt mayonnaise",
  },
  {
    name: "Canh chua cá",
    price: 55000,
    category: "Soup",
    description: "Canh chua cá bông lau với dứa",
  },
  {
    name: "Tôm hùm nướng",
    price: 450000,
    category: "Hải sản",
    description: "Tôm hùm tươi nướng với bơ tỏi",
  },


];

// Function: Tạo customers mẫu
export const CUSTOMERS = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "an.nguyen@email.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "binh.tran@email.com",
  },
  { name: "Lê Văn Cường", phone: "0923456789", email: "cuong.le@email.com" },
  {
    name: "Phạm Thị Dung",
    phone: "0934567890",
    email: "dung.pham@email.com",
  },
  {
    name: "Hoàng Văn Em",
    phone: "0945678901",
    email: "em.hoang@email.com"
  },
  {
    name: "Nguyễn Văn Dũng",
    phone: "0956789012",
    email: "dung.nguyen@email.com",
  },

];

export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  SERVED: "served",
  PAID: "paid",
  CANCELLED: "cancelled",
};

export const CATEGORIES = [
  "Khai vị",
  "Món chính",
  "Tráng miệng",
  "Đồ uống",
  "Salad",
  "Soup",
  "Hải sản",
  "Thịt",
  "Chay",
];