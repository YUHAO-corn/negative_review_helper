import React from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

export default function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* iPhone 容器 */}
      <div className="relative">
        {/* iPhone 外壳 */}
        <div className="relative w-[375px] h-[700px] bg-black rounded-[3rem] p-2 shadow-2xl">
          {/* iPhone 屏幕边框 */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* 刘海区域 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-2xl z-10">
              {/* 听筒 */}
              <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-[50px] h-[4px] bg-gray-800 rounded-full"></div>
              {/* 前置摄像头 */}
              <div className="absolute top-[6px] right-[20px] w-[8px] h-[8px] bg-gray-900 rounded-full"></div>
            </div>
            
            {/* 屏幕内容区域 */}
            <div className="w-full h-full overflow-y-auto pt-[35px] pb-[20px] bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="px-4">
                {children}
              </div>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full"></div>
          </div>
        </div>
        
        {/* iPhone 侧边按钮 */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[30px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute left-[-3px] top-[160px] w-[3px] h-[50px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute left-[-3px] top-[220px] w-[3px] h-[50px] bg-gray-700 rounded-l-md"></div>
        <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] bg-gray-700 rounded-r-md"></div>
      </div>
    </div>
  );
} 