# Phicha Booking - Restaurant Table Booking System

ระบบจองโต๊ะร้านอาหารผ่าน LINE LIFF สำหรับ mobile device

## 🌟 Features

- **LINE LIFF Integration** - เข้าสู่ระบบผ่าน LINE account
- **Mobile Responsive** - ออกแบบเฉพาะสำหรับมือถือ
- **Multi-branch Support** - รองรับร้านหลายสาขา
- **Real-time Availability** - เช็คความว่างของโต๊ะแบบ real-time
- **Booking Management** - จัดการการจอง ยกเลิก และดูประวัติ
- **Thai Language** - รองรับภาษาไทยเต็มรูปแบบ

## 🚀 Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **LINE Integration**: LINE LIFF SDK

## 📱 User Flow

1. **Branch Selection** - เลือกสาขาที่ต้องการจอง
2. **Date & Time** - เลือกวันที่และเวลา
3. **Guest Count** - ระบุจำนวนผู้ใช้บริการ
4. **Customer Details** - กรอกข้อมูลผู้จอง
5. **Confirmation** - ยืนยันการจอง
6. **Success** - แสดงผลการจองสำเร็จ
7. **History** - ดูประวัติการจอง

## 🛠️ Installation

### Prerequisites

- Node.js 16+ 
- npm หรือ yarn
- LINE Developer Account
- LIFF App

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd phicha-booking
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

แก้ไขไฟล์ `.env`:
```env
REACT_APP_LIFF_ID=your_liff_id_here
REACT_APP_API_URL=https://api.phichabooking.com
```

4. **Start development server**
```bash
npm start
```

## 🔧 LINE LIFF Setup

1. สร้าง LINE Official Account
2. สร้าง LIFF App ใน LINE Developers Console
3. ตั้งค่า Endpoint URL เป็น domain ของแอป
4. เพิ่ม LIFF ID ในไฟล์ `.env`

### LIFF Configuration

- **Size**: Full
- **Scope**: profile, openid
- **Bot Link Feature**: On (optional)

## 📱 Development

### Commands

```bash
# Development
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Layout components
│   └── UI/             # UI components
├── context/            # React Context providers
├── hooks/              # Custom hooks
├── pages/              # Page components
├── utils/              # Utility functions
└── App.js              # Main app component
```

## 🎨 Styling

ใช้ Tailwind CSS สำหรับ styling พร้อม custom design system:

- **Colors**: Primary (Orange), Line Green
- **Typography**: Kanit font สำหรับภาษาไทย
- **Responsive**: Mobile-first approach
- **Components**: Pre-built UI components

## 📋 API Integration

แอปนี้ออกแบบให้ทำงานกับ REST API ตาม endpoints:

```
GET    /api/branches           # รายการสาขา
GET    /api/availability       # เช็คความว่าง
POST   /api/bookings          # สร้างการจอง
GET    /api/bookings          # ดูประวัติการจอง
PUT    /api/bookings/:id      # แก้ไขการจอง
DELETE /api/bookings/:id      # ยกเลิกการจอง
```

## 🔒 Security

- ตรวจสอบ LIFF token
- Validate input data
- Rate limiting (ถ้ามี backend)
- HTTPS only

## 📱 Mobile Optimization

- Responsive design for mobile
- Touch-friendly interface
- Fast loading
- Offline fallback (future)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Manual Build

```bash
npm run build
# Upload build/ folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Create Pull Request

## 📄 License

[MIT License](LICENSE)

## 📞 Support

สำหรับการสนับสนุนและข้อสงสัย:
- Email: support@phichabooking.com
- LINE: @phichabooking

---

Made with ❤️ for better restaurant booking experience 