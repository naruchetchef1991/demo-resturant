import React, { useEffect } from 'react';
import { useBookingContext } from '../context/BookingContext';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import LoadingScreen from '../components/UI/LoadingScreen';
import TableMap from '../components/UI/TableMap';

const TableSelection = () => {
  const { 
    selectedBranch, 
    selectedDate, 
    selectedTime, 
    guestCount,
    availableTables,
    selectedTable,
    setTable,
    setStep,
    isLoading,
    error,
    loadAvailableTables
  } = useBookingContext();

  useEffect(() => {
    if (selectedBranch && selectedDate && selectedTime) {
      loadAvailableTables(selectedBranch.id, selectedDate, selectedTime);
    }
  }, [selectedBranch, selectedDate, selectedTime]);

  const handleTableSelect = (table) => {
    setTable(table);
  };

  const handleContinue = () => {
    setStep('details');
  };

  const handleSkipTableSelection = () => {
    setTable(null);
    setStep('details');
  };

  if (isLoading) {
    return <LoadingScreen message="กำลังโหลดข้อมูลโต๊ะ..." />;
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">เกิดข้อผิดพลาด</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={() => setStep('datetime')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              กลับไปเลือกวันและเวลาใหม่
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getTablesByZone = (zone) => {
    return availableTables.filter(table => table.zone === zone);
  };

  const getTableTypeLabel = (type) => {
    switch (type) {
      case 'window': return 'โต๊ะริมหน้าต่าง';
      case 'standard': return 'โต๊ะธรรมดา';
      case 'large': return 'โต๊ะใหญ่';
      case 'vip': return 'โต๊ะ VIP';
      default: return 'โต๊ะ';
    }
  };

  const getTableColor = (table) => {
    if (!table.is_available) return 'bg-gray-300 text-gray-500';
    if (selectedTable?.table_id === table.table_id) return 'bg-red-600 text-white';
    
    switch (table.type) {
      case 'window': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'vip': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'large': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">เลือกโต๊ะ</h1>
            <div className="text-gray-600 space-y-1">
              <p>สาขา: {selectedBranch?.name}</p>
              <p>วันที่: {selectedDate?.toLocaleDateString('th-TH')} เวลา: {selectedTime}</p>
              <p>จำนวนผู้ใช้บริการ: {guestCount} คน</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">คำอธิบาย</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 rounded"></div>
                <span className="text-sm">โต๊ะริมหน้าต่าง</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-sm">โต๊ะธรรมดา</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-sm">โต๊ะใหญ่</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-100 rounded"></div>
                <span className="text-sm">โต๊ะ VIP</span>
              </div>
            </div>
          </div>

          {/* Table Map */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">แผนผังโต๊ะ</h3>
            <TableMap 
              tables={availableTables}
              selectedTable={selectedTable}
              onTableSelect={handleTableSelect}
            />
          </div>

          {/* Table List by Zone */}
          <div className="space-y-8 mb-8">
            {['window', 'center', 'back', 'vip'].map(zone => {
              const zoneTables = getTablesByZone(zone);
              if (zoneTables.length === 0) return null;

              const zoneLabels = {
                'window': 'โซนริมหน้าต่าง',
                'center': 'โซนกลาง',
                'back': 'โซนด้านหลัง',
                'vip': 'โซน VIP'
              };

              return (
                <div key={zone} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">{zoneLabels[zone]}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {zoneTables.map((table) => (
                      <button
                        key={table.table_id}
                        onClick={() => table.is_available && handleTableSelect(table)}
                        disabled={!table.is_available}
                        className={`
                          p-4 rounded-lg border text-center transition-all duration-200
                          ${getTableColor(table)}
                          ${table.is_available ? 'cursor-pointer' : 'cursor-not-allowed'}
                          ${selectedTable?.table_id === table.table_id ? 'ring-2 ring-red-500' : ''}
                        `}
                      >
                        <div className="font-semibold">{table.table_number}</div>
                        <div className="text-sm">{table.seats} ที่นั่ง</div>
                        <div className="text-xs mt-1">{getTableTypeLabel(table.type)}</div>
                        {!table.is_available && (
                          <div className="text-xs text-red-500 mt-1">ไม่ว่าง</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* No tables available message */}
          {availableTables.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่มีโต๊ะว่าง</h3>
              <p className="text-gray-600 mb-6">
                ขออภัย ไม่มีโต๊ะว่างในวันและเวลาที่เลือก กรุณาเลือกวันหรือเวลาอื่น
              </p>
              <Button 
                onClick={() => setStep('datetime')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                เลือกวันและเวลาใหม่
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          {availableTables.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Skip table selection */}
              <Button
                onClick={handleSkipTableSelection}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
              >
                ไม่เลือกโต๊ะ (ให้ร้านจัดให้)
              </Button>

              {/* Continue with selected table */}
              {selectedTable && (
                <Button
                  onClick={handleContinue}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                >
                  ดำเนินการต่อ (โต๊ะ {selectedTable.table_number})
                </Button>
              )}
            </div>
          )}

          {/* Table selection info */}
          {selectedTable && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-900">
                <span className="font-semibold">โต๊ะที่เลือก:</span> {selectedTable.table_number} 
                ({selectedTable.seats} ที่นั่ง, {getTableTypeLabel(selectedTable.type)})
              </p>
            </div>
          )}

          {/* Back button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setStep('guests')}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← กลับไปแก้ไขจำนวนผู้ใช้บริการ
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TableSelection; 