
import React from 'react';
import { Card } from './ui/Card';
import { LogEntry, THEME_GRADIENT } from '../types';
import { Clock, Shield, CheckCircle, XCircle, Search } from 'lucide-react';

interface AccessLogsProps {
  logs: LogEntry[];
}

const AccessLogs: React.FC<AccessLogsProps> = ({ logs }) => {
  // Sort logs by latest first (descending timestamp)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="text-purple-600" /> ประวัติการเข้าใช้งานระบบ
            </h2>
            <p className="text-gray-500 text-sm mt-1">บันทึกการเข้าสู่ระบบของผู้ดูแลและผู้ใช้งานทั้งหมด</p>
        </div>
        <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="ค้นหาชื่อผู้ใช้..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
            />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ใช้งาน</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สิทธิ์</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(log.timestamp).toLocaleString('th-TH')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{log.username}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    log.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {log.role.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {log.status === 'Success' ? (
                                    <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckCircle size={16} /> สำเร็จ
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
                                        <XCircle size={16} /> ล้มเหลว
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    
                    {sortedLogs.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                ไม่พบข้อมูลประวัติการเข้าใช้งาน
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default AccessLogs;
