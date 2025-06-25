import React, { useState } from 'react';
import { UsersIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TableMap = ({ 
  selectedDate, 
  selectedTime, 
  onTableSelect, 
  selectedTable = null,
  unavailableTables = [] 
}) => {
  // Mock table data - ในอนาคตจะดึงจาก API
  const tables = [
    // โต๊ะใกล้หน้าต่าง
    { id: 'T01', x: 50, y: 50, seats: 2, type: 'window', zone: 'window' },
    { id: 'T02', x: 150, y: 50, seats: 2, type: 'window', zone: 'window' },
    { id: 'T03', x: 250, y: 50, seats: 4, type: 'window', zone: 'window' },
    
    // โต๊ะกลางร้าน
    { id: 'T04', x: 50, y: 150, seats: 4, type: 'standard', zone: 'center' },
    { id: 'T05', x: 150, y: 150, seats: 4, type: 'standard', zone: 'center' },
    { id: 'T06', x: 250, y: 150, seats: 6, type: 'standard', zone: 'center' },
    { id: 'T07', x: 350, y: 150, seats: 4, type: 'standard', zone: 'center' },
    
    // โต๊ะด้านหลัง
    { id: 'T08', x: 50, y: 250, seats: 8, type: 'large', zone: 'back' },
    { id: 'T09', x: 200, y: 250, seats: 8, type: 'large', zone: 'back' },
    { id: 'T10', x: 350, y: 250, seats: 6, type: 'standard', zone: 'back' },
    
    // โต๊ะ VIP
    { id: 'V01', x: 450, y: 50, seats: 4, type: 'vip', zone: 'vip' },
    { id: 'V02', x: 450, y: 150, seats: 6, type: 'vip', zone: 'vip' },
    { id: 'V03', x: 450, y: 250, seats: 8, type: 'vip', zone: 'vip' },
  ];

  const getTableStatus = (table) => {
    if (unavailableTables.includes(table.id)) return 'unavailable';
    if (selectedTable === table.id) return 'selected';
    return 'available';
  };

  const getTableColor = (status, type) => {
    const colors = {
      available: {
        standard: 'bg-green-100 border-green-300 hover:bg-green-200',
        window: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
        large: 'bg-purple-100 border-purple-300 hover:bg-purple-200',
        vip: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200'
      },
      selected: {
        standard: 'bg-green-500 border-green-600 text-white',
        window: 'bg-blue-500 border-blue-600 text-white',
        large: 'bg-purple-500 border-purple-600 text-white',
        vip: 'bg-yellow-500 border-yellow-600 text-white'
      },
      unavailable: {
        standard: 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed',
        window: 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed',
        large: 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed',
        vip: 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
      }
    };
    return colors[status][type] || colors[status].standard;
  };

  const getTableSize = (seats) => {
    if (seats <= 2) return 'w-12 h-12';
    if (seats <= 4) return 'w-16 h-16';
    if (seats <= 6) return 'w-20 h-16';
    return 'w-24 h-20';
  };

  const handleTableClick = (table) => {
    const status = getTableStatus(table);
    if (status !== 'unavailable') {
      onTableSelect?.(table);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">แผนผังโต๊ะ</h3>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>ว่าง</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span>ใกล้หน้าต่าง</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>VIP</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
          <span>ไม่ว่าง</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
          <span>เลือกแล้ว</span>
        </div>
      </div>

      {/* Restaurant Layout */}
      <div className="relative bg-gray-50 rounded-lg p-4 overflow-x-auto">
        <div className="relative" style={{ width: '600px', height: '350px' }}>
          
          {/* Restaurant Elements */}
          
          {/* หน้าต่าง */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-blue-200 rounded-t-lg flex items-center justify-center text-xs font-medium text-blue-800">
            หน้าต่าง (วิวสวย)
          </div>
          
          {/* ครัว */}
          <div className="absolute bottom-0 right-0 w-32 h-16 bg-red-200 rounded-lg flex items-center justify-center text-xs font-medium text-red-800">
            ครัว
          </div>
          
          {/* ห้องน้ำ */}
          <div className="absolute bottom-0 left-0 w-24 h-12 bg-gray-300 rounded-lg flex items-center justify-center text-xs font-medium text-gray-700">
            ห้องน้ำ
          </div>
          
          {/* VIP Zone */}
          <div className="absolute top-40 right-0 w-2 h-32 bg-yellow-400 rounded-l-lg"></div>
          <div className="absolute top-32 right-8 text-xs font-medium text-yellow-800 transform rotate-90 origin-center">
            VIP ZONE
          </div>

          {/* Tables */}
          {tables.map((table) => {
            const status = getTableStatus(table);
            const isUnavailable = status === 'unavailable';
            const isSelected = status === 'selected';
            
            return (
              <button
                key={table.id}
                className={`
                  absolute border-2 rounded-lg transition-all duration-200 
                  flex flex-col items-center justify-center text-xs font-medium
                  ${getTableSize(table.seats)}
                  ${getTableColor(status, table.type)}
                  ${isUnavailable ? '' : 'hover:scale-105 active:scale-95'}
                `}
                style={{
                  left: `${table.x}px`,
                  top: `${table.y}px`,
                }}
                onClick={() => handleTableClick(table)}
                disabled={isUnavailable}
                title={`โต๊ะ ${table.id} - ${table.seats} ที่นั่ง ${table.type === 'vip' ? '(VIP)' : table.type === 'window' ? '(ใกล้หน้าต่าง)' : ''}`}
              >
                <div className="flex items-center space-x-1">
                  {isSelected && <CheckCircleIcon className="w-3 h-3" />}
                  {isUnavailable && <XMarkIcon className="w-3 h-3" />}
                  {!isSelected && !isUnavailable && <UsersIcon className="w-3 h-3" />}
                </div>
                <div className="font-semibold">{table.id}</div>
                <div className="text-xs">{table.seats} ที่</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Table Info */}
      {selectedTable && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">โต๊ะที่เลือก</h4>
          {(() => {
            const table = tables.find(t => t.id === selectedTable);
            return table ? (
              <div className="text-sm text-green-800">
                <p><span className="font-medium">โต๊ะ:</span> {table.id}</p>
                <p><span className="font-medium">จำนวนที่นั่ง:</span> {table.seats} คน</p>
                <p><span className="font-medium">ประเภท:</span> {
                  table.type === 'vip' ? 'VIP' :
                  table.type === 'window' ? 'ใกล้หน้าต่าง' :
                  table.type === 'large' ? 'โต๊ะใหญ่' : 'โต๊ะธรรมดา'
                }</p>
                <p><span className="font-medium">โซน:</span> {
                  table.zone === 'vip' ? 'VIP' :
                  table.zone === 'window' ? 'ใกล้หน้าต่าง' :
                  table.zone === 'center' ? 'กลางร้าน' : 'ด้านหลัง'
                }</p>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 text-xs text-gray-600">
        <p>💡 <strong>คำแนะนำ:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>โต๊ะใกล้หน้าต่างจะมีวิวสวย</li>
          <li>โซน VIP เงียบและเป็นส่วนตัวมากกว่า</li>
          <li>โต๊ะกลางร้านสะดวกสำหรับการสั่งอาหาร</li>
        </ul>
      </div>
    </div>
  );
};

export default TableMap; 