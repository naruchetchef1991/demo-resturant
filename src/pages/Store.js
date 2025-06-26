import React from 'react';
import Icon from '../components/UI/Icon';

const Store = () => {
  const storeImages = [
    {
      title: 'หน้าร้าน',
      icon: 'store',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      title: 'บรรยากาศภายใน',
      icon: 'dining',
      gradient: 'from-primary-400 to-primary-500'
    },
    {
      title: 'ห้องครัว',
      icon: 'bowl',
      gradient: 'from-primary-600 to-primary-700'
    },
    {
      title: 'พื้นที่รับประทานอาหาร',
      icon: 'dining',
      gradient: 'from-primary-300 to-primary-400'
    }
  ];

  const features = [
    {
      icon: 'clock',
      title: 'เปิดทุกวัน',
      description: '10:00 - 22:00 น.'
    },
    {
      icon: 'car',
      title: 'ที่จอดรถ',
      description: 'ฟรี 100 คัน'
    },
    {
      icon: 'snowflake',
      title: 'ปรับอากาศ',
      description: 'เย็นสบายตลอดวัน'
    },
    {
      icon: 'wifi',
      title: 'WiFi ฟรี',
      description: 'ความเร็วสูง'
    },
    {
      icon: 'user',
      title: 'เด็กเล็ก',
      description: 'เก้าอี้สูงสำหรับเด็ก'
    },
    {
      icon: 'accessibility',
      title: 'พิการสามารถเข้าถึงได้',
      description: 'ทางลาดและลิฟต์'
    }
  ];

  const menuCategories = [
    {
      name: 'อาหารไทย',
      count: '25+ เมนู',
      icon: 'bowl',
      color: 'bg-primary-100 text-primary-700'
    },
    {
      name: 'อาหารนานาชาติ',
      count: '20+ เมนู',
      icon: 'pasta',
      color: 'bg-primary-50 text-primary-600'
    },
    {
      name: 'เครื่องดื่ม',
      count: '15+ เมนู',
      icon: 'drink',
      color: 'bg-primary-200 text-primary-800'
    },
    {
      name: 'ของหวาน',
      count: '12+ เมนู',
      icon: 'cake',
      color: 'bg-primary-100 text-primary-700'
    }
  ];

  const awards = [
    { icon: 'trophy', text: 'รางวัลร้านอาหารยอดเยี่ยม 2024' },
    { icon: 'star', text: '4.8 ดาว จากผู้ใช้งาน 500+ คน' },
    { icon: 'medal', text: 'อันดับ 1 ร้านอาหารไทยในพื้นที่' },
    { icon: 'diamond', text: 'มาตรฐานความสะอาด A+' }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-4 py-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-primary-600">
            <Icon name="store" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold mb-2">ภิชาเรสเตอรองต์</h1>
          <p className="text-primary-100 mb-4">ร้านอาหารไทยและนานาชาติ</p>

        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* About */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="book" className="w-6 h-6 mr-2" />
            เกี่ยวกับเรา
          </h2>
          <p className="text-gray-700 leading-relaxed">
            ภิชาเรสเตอรองต์ เป็นร้านอาหารที่มีประสบการณ์มากกว่า 10 ปี 
            เสรฟอาหารไทยและนานาชาติที่หลากหลาย ด้วยวัตถุดิบคุณภาพดี 
            บรรยากาศอบอุ่น เหมาะสำหรับครอบครัวและเพื่อนฝูง
          </p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">เปิดให้บริการ</span>
              <p className="text-gray-900">2014 - ปัจจุบัน</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">จำนวนโต๊ะ</span>
              <p className="text-gray-900">25 โต๊ะ (100 ที่นั่ง)</p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="camera" className="w-6 h-6 mr-2" />
            แกลเลอรี่
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {storeImages.map((image, index) => (
              <div key={index} className="relative group">
                <div className={`w-full aspect-video bg-gradient-to-br ${image.gradient} rounded-lg flex flex-col items-center justify-center text-white shadow-lg overflow-hidden`}>
                  <Icon name={image.icon} className="w-12 h-12 mb-2" />
                  <h3 className="text-sm font-medium text-center px-2">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Categories */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="dining" className="w-6 h-6 mr-2" />
            หมวดหมู่อาหาร
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {menuCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${category.color} mb-2`}>
                  <Icon name={category.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="sparkles" className="w-6 h-6 mr-2" />
            สิ่งอำนวยความสะดวก
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name={feature.icon} className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="trophy" className="w-6 h-6 mr-2" />
            รางวัลและความสำเร็จ
          </h2>
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Icon name={award.icon} className="w-6 h-6 text-yellow-600" />
                <span className="text-yellow-800 font-medium">{award.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="phone" className="w-6 h-6 mr-2" />
            ติดต่อเรา
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="location" className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">ที่อยู่</h3>
                <p className="text-gray-600">123 ถนนสุขุมวิท แขวงวัฒนา เขตวัฒนา กรุงเทพมหานคร 10110</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="phone" className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">เบอร์โทรศัพท์</h3>
                <p className="text-gray-600">02-123-4567, 089-123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="email" className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">อีเมล</h3>
                <p className="text-gray-600">info@phicharestaurant.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="clock" className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">เวลาทำการ</h3>
                <p className="text-gray-600">จันทร์ - อาทิตย์: 10:00 - 22:00 น.</p>
                <p className="text-sm text-green-600">เปิดให้บริการทุกวัน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Icon name="mobile" className="w-6 h-6 mr-2" />
            ติดตามเรา
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-primary-50 text-primary-600 p-4 rounded-lg text-center hover:bg-primary-100 transition-colors">
              <Icon name="facebook" className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Facebook</div>
            </button>
            <button className="bg-primary-50 text-primary-600 p-4 rounded-lg text-center hover:bg-primary-100 transition-colors">
              <Icon name="instagram" className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Instagram</div>
            </button>
            <button className="bg-primary-50 text-primary-600 p-4 rounded-lg text-center hover:bg-primary-100 transition-colors">
              <Icon name="line" className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">LINE</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store; 