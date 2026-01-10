# FuelUp — Streak Partners Edition

Ứng dụng theo dõi dinh dưỡng với tính năng **Shared Streak** - khuyến khích bạn và đối tác duy trì thói quen ăn uống lành mạnh cùng nhau.

## 🚀 Cài đặt & Chạy

### Yêu cầu
- Node.js 16+ (khuyến nghị v18 hoặc v20)
- npm hoặc yarn

### Các bước

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

Ứng dụng sẽ tự động mở tại `http://localhost:3000`

3. **Build cho production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📱 Tính năng chính

- **Shared Streak System**: Theo dõi chuỗi ngày cả hai người đều ghi nhận bữa ăn
- **Dual Profile View**: Chuyển đổi giữa 2 profile (Duy & Anh)
- **Manual Food Logging**: Thư viện món ăn Việt Nam với calories đã tính sẵn
- **AI Scanner UI**: Giao diện demo quét món ăn bằng AI
- **Nudge System**: Nhắc nhở đối tác khi chưa log food
- **LocalStorage**: Dữ liệu được lưu cục bộ trên trình duyệt

## 🎨 Tech Stack

- **Vite** - Build tool siêu nhanh
- **Vanilla JavaScript** - Không framework, nhẹ và nhanh
- **Tailwind CSS** - Utility-first CSS framework
- **Google Material Symbols** - Icon system

## 📂 Cấu trúc thư mục

```
fuelup-app/
├── index.html          # HTML chính
├── src/
│   ├── main.js        # Logic JavaScript
│   └── style.css      # Tailwind + Custom CSS
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Tùy chỉnh

### Thêm món ăn mới

Chỉnh sửa mảng `FOOD_DB` trong `src/main.js`:

```javascript
const FOOD_DB = [
    {
        id: 'mon-an-moi',
        name_vi: 'Tên món',
        name_en: 'English name',
        category: 'Noodles', // hoặc Rice, Bread, Drinks
        icon: '🍜',
        portions: {
            S: { kcal: 300, p: 15, c: 40, f: 10 },
            M: { kcal: 450, p: 20, c: 60, f: 15 },
            L: { kcal: 600, p: 30, c: 80, f: 20 }
        }
    }
];
```

### Đổi màu theme

Chỉnh sửa `tailwind.config.js`:

```javascript
colors: {
    'green-primary': '#789D8A',
    'orange-secondary': '#E29578',
    // ... thêm màu tùy chỉnh
}
```

## 📝 Ghi chú

- Dữ liệu được lưu trong LocalStorage của trình duyệt
- Demo đã có sẵn 1 log cho Anh để simulate streak partner đã log
- AI Scanner chỉ là UI demo, chưa kết nối API thật

## 🤝 Credits

Prototype được tạo từ Gemini và chuyển đổi thành Vite project.
