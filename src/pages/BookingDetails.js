import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useBooking } from '../context/BookingContext';

import Button from '../components/UI/Button';

const BookingDetails = () => {
  const navigate = useNavigate();
  const { customerDetails, setCustomerDetails } = useBooking();

  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: customerDetails,
    mode: 'onChange'
  });

  // Pre-fill form with existing data
  useEffect(() => {
    if (customerDetails.name) {
      setValue('name', customerDetails.name);
    }
    if (customerDetails.phone) {
      setValue('phone', customerDetails.phone);
    }
    if (customerDetails.email) {
      setValue('email', customerDetails.email);
    }
    if (customerDetails.notes) {
      setValue('notes', customerDetails.notes);
    }
  }, [customerDetails, setValue]);

  const onSubmit = (data) => {
    setCustomerDetails(data);
    navigate('/confirmation');
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ข้อมูลการจอง</h2>
        <p className="text-gray-600">กรอกข้อมูลสำหรับการจองโต๊ะ</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อผู้จอง *
          </label>
          <input
            type="text"
            {...register('name', { 
              required: 'กรุณากรอกชื่อผู้จอง',
              minLength: { value: 2, message: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร' }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="ชื่อ-นามสกุล"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เบอร์โทรศัพท์ *
          </label>
          <input
            type="tel"
            {...register('phone', { 
              required: 'กรุณากรอกเบอร์โทรศัพท์',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก'
              }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0812345678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            อีเมล (ไม่บังคับ)
          </label>
          <input
            type="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'รูปแบบอีเมลไม่ถูกต้อง'
              }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเหตุเพิ่มเติม (ไม่บังคับ)
          </label>
          <textarea
            {...register('notes')}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            placeholder="เช่น ต้องการโต๊ะใกล้หน้าต่าง, เก้าอี้เด็ก, วีลแชร์ หรือความต้องการพิเศษอื่นๆ"
          />
        </div>

        {/* Special Requirements Checkbox */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            ความต้องการพิเศษ
          </label>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('requirements.highchair')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">เก้าอี้เด็ก</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('requirements.wheelchair')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">โต๊ะสำหรับวีลแชร์</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('requirements.windowSeat')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">โต๊ะใกล้หน้าต่าง</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('requirements.quietArea')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">พื้นที่เงียบ</span>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              {...register('acceptTerms', { 
                required: 'กรุณายอมรับเงื่อนไขการจอง' 
              })}
              className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              ฉันได้อ่านและยอมรับ
              <button type="button" className="text-primary-600 hover:text-primary-700 underline mx-1">
                เงื่อนไขการจอง
              </button>
              และ
              <button type="button" className="text-primary-600 hover:text-primary-700 underline mx-1">
                นโยบายความเป็นส่วนตัว
              </button>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
          >
            ดำเนินการต่อ
          </Button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">ข้อมูลส่วนบุคคล</h4>
        <p className="text-sm text-blue-800">
          ข้อมูลของคุณจะถูกใช้เพื่อการจองโต๊ะและติดต่อกลับเท่านั้น 
          เราจะไม่เปิดเผยข้อมูลให้บุคคลที่สามโดยไม่ได้รับอนุญาต
        </p>
      </div>
    </div>
  );
};

export default BookingDetails; 