import React from 'react';
import Icon from '../components/UI/Icon';

const Promotion = () => {
  const promotions = [
    {
      id: 1,
      title: 'Happy Hour',
      description: 'ลด 30% เครื่องดื่มทุกชนิด',
      discount: '30%',
      type: 'drink',
      icon: 'beer',
      terms: 'วันจันทร์ - ศุกร์ 16:00 - 19:00 น.',
      bg: 'from-orange-400 to-orange-500'
    },
    {
      id: 2,
      title: 'Set Lunch',
      description: 'เซ็ตอาหารกลางวันราคาพิเศษ',
      discount: '299฿',
      type: 'food',
      icon: 'lunch',
      terms: 'วันจันทร์ - ศุกร์ 11:00 - 15:00 น.',
      bg: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 flex items-center justify-center">
            <Icon name="gift" className="w-8 h-8 mr-2" />
            โปรโมชั่น
          </h1>
          <p className="text-primary-100">ข้อเสนอพิเศษสำหรับคุณ</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 flex items-center justify-center">
              <Icon name="gift" className="w-6 h-6 mr-2" />
              Grand Opening Special!
            </h2>
            <p className="text-yellow-100 mb-4">ลด 50% สำหรับการจองครั้งแรก</p>
            <div className="text-3xl font-bold mb-2">50% OFF</div>
            <p className="text-sm text-yellow-100">เฉพาะลูกค้าใหม่เท่านั้น</p>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">โปรโมชั่นปัจจุบัน</h2>
          {promotions.map((promotion) => (
            <div key={promotion.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Promotion Header with Gradient */}
              <div className={`bg-gradient-to-r ${promotion.bg} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon name={promotion.icon} className="w-8 h-8" />
                    </div>
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${promotion.type === 'drink' ? 'bg-orange-200 text-orange-800' : 'bg-orange-200 text-orange-800'}`}>
                        <Icon name={promotion.type === 'drink' ? 'beer' : 'lunch'} className="w-3 h-3 inline mr-1" />
                        {promotion.type === 'drink' ? 'เครื่องดื่ม' : 'อาหาร'}
                      </div>
                      <h3 className="text-xl font-bold">{promotion.title}</h3>
                      <p className="text-white/90">{promotion.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{promotion.discount}</div>
                    <div className="text-sm text-white/80">ส่วนลด</div>
                  </div>
                </div>
              </div>
              
              {/* Promotion Details */}
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Icon name="clock" className="w-4 h-4 mr-2" />
                  <span>{promotion.terms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="book" className="w-5 h-5 mr-2" />
            เงื่อนไขการใช้งาน
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <Icon name="star" className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
              โปรโมชั่นใช้ได้เฉพาะการจองผ่านแอปพลิเคชันเท่านั้น
            </li>
            <li className="flex items-start">
              <Icon name="star" className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
              ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้
            </li>
            <li className="flex items-start">
              <Icon name="star" className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
              ร้านอาหารขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่แจ้งให้ทราบล่วงหน้า
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Promotion; 