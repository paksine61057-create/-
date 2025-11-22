
import React, { useState } from 'react';
import { THEME_GRADIENT } from '../types';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'admin' | 'user', name: string) => void;
  onRecordLog: (username: string, role: 'admin' | 'user' | 'unknown', status: 'Success' | 'Failed') => void;
}

const AUTHORIZED_USERS = [
  "ชัชตะวัน", "ภราดร", "ภาคภูมิ", "ทิวาวรรณ", "วัชรี", 
  "บุญญาภรณ์", "อัญชนีย์", "วลัยรัตน์", "บุญจันทร์", "ยุทธไกร", 
  "กันต์ฤทัย", "เสาวภา", "อภิชาติ", "สุภาภรณ์", "วิษณุ", 
  "จักรพงษ์", "บุญเสริม", "อุดมวิทย์", "พงษ์เพชร", "ชลฎา", 
  "ปภัสพ์มณ", "ตรีนัทธ์ธนา", "วชิรวิทย์", "ศิรินภา"
];

const LOGO_URL = "https://img2.pic.in.th/pic/23847230_1753798167972527_6171827179803949950_o.md.png";

const Login: React.FC<LoginProps> = ({ onLogin, onRecordLog }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // 1. Admin Check
    if (cleanUsername === 'admin' && cleanPassword === 'admin4444') {
      onRecordLog(cleanUsername, 'admin', 'Success');
      onLogin('admin', 'ผู้ดูแลระบบ (Admin)');
      return;
    }

    // 2. User Check
    if (AUTHORIZED_USERS.includes(cleanUsername) && cleanPassword === 'PJ123') {
      onRecordLog(cleanUsername, 'user', 'Success');
      onLogin('user', `คุณ${cleanUsername}`);
      return;
    }

    // Failed
    onRecordLog(cleanUsername, 'unknown', 'Failed');
    setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] p-4 font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-100 to-transparent -z-10"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
        {/* Header */}
        <div className={`${THEME_GRADIENT} p-8 text-center relative overflow-hidden`}>
          <div className="relative z-10">
            {/* Updated Logo Container: Removed bg-white circle styling */}
            <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4">
               <img src={LOGO_URL} alt="School Logo" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <h1 className="text-2xl font-bold text-white">Prajak Budget 2569</h1>
            <p className="text-purple-100 text-sm mt-1">ระบบติดตามการใช้งบประมาณโรงเรียน</p>
          </div>
          {/* Decorative circles in header */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
             <div className="absolute top-20 -right-10 w-20 h-20 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl flex items-center animate-shake">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">ชื่อผู้ใช้</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="ระบุชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">รหัสผ่าน</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="ระบุรหัสผ่าน"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white ${THEME_GRADIENT} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-[1.02]`}
            >
              <LogIn size={18} /> เข้าสู่ระบบ
            </button>
          </form>

          {/* User Instructions */}
          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-500" /> คำแนะนำสำหรับผู้ใช้
            </h4>
            <ul className="text-xs text-gray-500 space-y-1 ml-1">
              <li>• <strong>ชื่อผู้ใช้:</strong> ใช้ชื่อจริงภาษาไทย (เช่น ชัชตะวัน, ภราดร)</li>
              <li>• <strong>รหัสผ่าน:</strong> PJ123</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 py-3 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400">© 2025 โรงเรียนประจักษ์ศิลปาคม</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
