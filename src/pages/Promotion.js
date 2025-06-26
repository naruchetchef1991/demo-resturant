import React from 'react';

const Promotion = () => {
  const promotions = [
    {
      id: 1,
      title: 'Happy Hour 50% OFF',
      description: 'ลดราคา 50% สำหรับเครื่องดื่มทุกชนิด',
      detail: 'เวลา 15:00 - 18:00 น. ทุกวันจันทร์ - ศุกร์',
      validUntil: '31 ธันวาคม 2024',
      discount: '50%',
      type: 'drink',
      isNew: true
    },
    {
      id: 2,
      title: 'Set Lunch พิเศษ',
      description: 'เซ็ตอาหารกลางวันคุ้มค่า',
      detail: 'ข้าว + แกง 2 อย่าง + ผัด 1 อย่าง + น้ำหวาน',
      validUntil: '28 กุมภาพันธ์ 2025',
      discount: '199฿',
      type: 'food',
      isNew: false
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'drink':
        return 'bg-primary-100 text-primary-800';
      case 'food':
        return 'bg-primary-50 text-primary-700';
      case 'special':
        return 'bg-primary-200 text-primary-900';
      case 'buffet':
        return 'bg-primary-100 text-primary-800';
      case 'student':
        return 'bg-primary-50 text-primary-700';
      case 'group':
        return 'bg-primary-200 text-primary-900';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'drink':
        return 'เครื่องดื่ม';
      case 'food':
        return 'อาหาร';
      case 'special':
        return 'พิเศษ';
      case 'buffet':
        return 'บุฟเฟ่ต์';
      case 'student':
        return 'นักเรียน';
      case 'group':
        return 'กลุ่ม';
      default:
        return type;
    }
  };

  return (
    <div className="flex-1 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">โปรโมชั่น</h1>
        <p className="text-gray-600">ข้อเสนอพิเศษและส่วนลดสุดคุ้ม</p>
      </div>

      {/* Featured Promotion Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">🎉 Grand Opening Special!</h2>
            <p className="text-primary-100 mb-3">ลดทุกเมนู 30% สำหรับ 3 วันแรก</p>
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>เหลือเวลาอีก 2 วัน</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">30%</div>
            <div className="text-sm text-primary-100">ส่วนลด</div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">โปรโมชั่นทั้งหมด</h3>
        
        {promotions.map((promotion) => (
          <div key={promotion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Gradient Background */}
            <div className={`relative h-48 w-full ${
              promotion.type === 'drink' 
                ? 'bg-gradient-to-br from-primary-400 to-primary-500' 
                : 'bg-gradient-to-br from-primary-500 to-primary-600'
            } flex items-center justify-center`}>
              {/* Icon */}
              <div className="text-white text-6xl">
                {promotion.type === 'drink' ? '🍺' : '🍱'}
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {promotion.isNew && (
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    ใหม่
                  </span>
                )}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(promotion.type)}`}>
                  {getTypeText(promotion.type)}
                </span>
              </div>
              {/* Discount Badge */}
              <div className="absolute top-3 right-3">
                <div className="bg-yellow-400 text-yellow-900 text-lg font-bold px-3 py-2 rounded-lg shadow-lg">
                  {promotion.discount}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {promotion.title}
              </h4>
              
              <p className="text-gray-700 mb-2 font-medium">
                {promotion.description}
              </p>
              
              <p className="text-gray-600 text-sm mb-4">
                {promotion.detail}
              </p>

                             {/* Footer */}
               <div className="pt-3 border-t border-gray-200">
                 <div className="flex items-center text-sm text-gray-500">
                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <span>ใช้ได้ถึง {promotion.validUntil}</span>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">📋 เงื่อนไขการใช้โปรโมชั่น</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• โปรโมชั่นไม่สามารถใช้ร่วมกับส่วนลดอื่นได้</li>
          <li>• ร้านขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</li>
          <li>• สำหรับโปรโมชั่นพิเศษ กรุณาแจ้งล่วงหน้าก่อนสั่งอาหาร</li>
          <li>• โปรโมชั่นมีจำนวนจำกัด หมดแล้วหมดเลย</li>
        </ul>
      </div>
    </div>
  );
};

export default Promotion; 