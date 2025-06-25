import React from 'react';
import { useBookingContext } from '../context/BookingContext';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';

const BranchSelection = () => {
  const { branches, setBranch, isLoading, error } = useBookingContext();

  if (isLoading) {
    return <LoadingScreen message="กำลังโหลดข้อมูลสาขา..." />;
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">เกิดข้อผิดพลาด</h1>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              เลือกสาขาที่ต้องการจอง
            </h1>
            <p className="text-xl text-gray-600">
              เลือกสาขาที่คุณต้องการมารับประทานอาหาร
            </p>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div 
                key={branch.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Branch Image */}
                <div className="relative h-64">
                  <img
                    src={branch.image_url || `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&crop=center`}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Branch Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {branch.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {/* Address */}
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {branch.address}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-600">
                        {branch.phone}
                      </p>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">
                        เปิด {branch.open_time} - {branch.close_time} น.
                      </p>
                    </div>

                    {/* Description */}
                    {branch.description && (
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-600 text-sm">
                          {branch.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Select Button */}
                  <Button
                    onClick={() => setBranch(branch)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    เลือกสาขานี้
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* No branches message */}
          {branches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">ไม่พบข้อมูลสาขา</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BranchSelection; 