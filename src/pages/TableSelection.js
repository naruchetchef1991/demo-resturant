import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { useBooking } from '../context/BookingContext';
import LoadingScreen from '../components/UI/LoadingScreen';
import TableMap from '../components/UI/TableMap';
import Button from '../components/UI/Button';

const TableSelection = () => {
  const navigate = useNavigate();
  const { 
    selectedBranch,
    selectedDate,
    selectedTime,
    guestCount,
    availableTables,
    selectedTable,
    selectTable,
    loadAvailableTables,
    isLoading,
    error
  } = useBooking();

  console.log('TableSelection - selectedDate:', selectedDate, 'type:', typeof selectedDate);
  console.log('TableSelection - selectedTime:', selectedTime);
  console.log('TableSelection - selectedBranch:', selectedBranch);

  useEffect(() => {
    if (selectedBranch && selectedDate && selectedTime) {
      loadAvailableTables();
    }
  }, [selectedBranch, selectedDate, selectedTime, guestCount]);

  const handleTableSelect = (table) => {
    selectTable(table);
  };

  const handleContinue = () => {
    navigate('/details');
  };

  const handleSkipTableSelection = () => {
    selectTable(null);
    navigate('/details');
  };

  if (!selectedBranch || !selectedDate || !selectedTime) {
    navigate('/branch');
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => loadAvailableTables()}>
            ลองใหม่
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">เลือกโต๊ะ</h2>
        <p className="text-gray-600">
          {selectedBranch.name} • {format(selectedDate, 'd MMM yyyy', { locale: th })} • {selectedTime} • {guestCount} ท่าน
        </p>
      </div>

      {/* Table Map */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">แผนผังโต๊ะ</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <TableMap 
            tables={availableTables}
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            guestCount={guestCount}
          />
        </div>
      </div>

      {/* Table List */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">รายการโต๊ะที่ว่าง</h3>
        
        {availableTables.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>ไม่มีโต๊ะว่างในช่วงเวลาที่เลือก</p>
            <p className="text-sm mt-2">กรุณาเลือกเวลาอื่นหรือติดต่อร้านโดยตรง</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {availableTables.map((table) => (
              <div
                key={table.id}
                onClick={() => handleTableSelect(table)}
                className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                  selectedTable?.id === table.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">โต๊ะ {table.table_number}</h4>
                    <p className="text-sm text-gray-600">
                      {table.seats} ที่นั่ง • {table.type === 'window' ? 'ริมหน้าต่าง' : 
                        table.type === 'vip' ? 'VIP' : 
                        table.type === 'large' ? 'โต๊ะใหญ่' : 'โต๊ะธรรมดา'}
                    </p>
                    {table.position_x !== null && table.position_y !== null && (
                      <p className="text-xs text-gray-500">
                        ตำแหน่ง: ({table.position_x}, {table.position_y})
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {table.seats >= guestCount ? (
                      <span className="text-green-600 text-sm font-medium">เหมาะสม</span>
                    ) : (
                      <span className="text-orange-600 text-sm font-medium">เล็กไป</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Type Legend */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">คำอธิบายประเภทโต๊ะ</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span>ริมหน้าต่าง</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
            <span>VIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>โต๊ะใหญ่</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded mr-2"></div>
            <span>โต๊ะธรรมดา</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {selectedTable && (
          <Button 
            onClick={handleContinue}
            className="w-full"
          >
            ดำเนินการต่อกับโต๊ะ {selectedTable.table_number}
          </Button>
        )}
        
        <Button 
          onClick={handleSkipTableSelection}
          variant="outline"
          className="w-full"
        >
          ข้ามการเลือกโต๊ะ (ให้ร้านจัดให้)
        </Button>
      </div>

      {/* Note */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>หมายเหตุ: หากไม่เลือกโต๊ะ ทางร้านจะจัดโต๊ะที่เหมาะสมให้อัตโนมัติ</p>
      </div>
    </div>
  );
};

export default TableSelection; 