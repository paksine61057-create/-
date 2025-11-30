
import React, { useState } from 'react';
import { THEME_GRADIENT } from '../types';
import { Lock, User, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface LoginProps {
  onLogin: (role: 'admin' | 'user', name: string, username: string) => void;
  onRecordLog: (username: string, role: 'admin' | 'user' | 'unknown', status: 'Success' | 'Failed') => void;
}

const LOGO_URL = "https://img5.pic.in.th/file/secure-sv1/5bc66fd0-c76e-41c4-87ed-46d11f4a36fa.png";

const Login: React.FC<LoginProps> = ({ onLogin, onRecordLog }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // Call API to login
    const result = await api.login(cleanUsername, cleanPassword);
    setIsLoading(false);

    if (result && result.status === 'success') {
        onRecordLog(cleanUsername, result.role, 'Success');
        onLogin(result.role, result.name, cleanUsername); // Pass cleanUsername for password change ref
    } else {
        onRecordLog(cleanUsername, 'unknown', 'Failed');
        setError(result.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง หรือยังไม่ได้สร้าง Sheet "Users"');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2E4E8] p-4 font-sans relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-200 to-transparent -z-10 opacity-50"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
        {/* Header */}
        <div className={`${THEME_GRADIENT} p-8 text-center relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 p-3 border border-white/30">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img src={LOGO_URL} alt="School Logo" className="w-24 h-24 object-contain" />
                </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Prajak Budget 2569</h1>
            <p className="text-purple-100 text-sm mt-1">ระบบติดตามการใช้งบประมาณโรงเรียน</p>
          </div>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white ${THEME_GRADIENT} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-[1.02] disabled:opacity-70`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={20}/> : <LogIn size={20} />} 
              {isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-500" /> คำแนะนำ
            </h4>
            <p className="text-xs text-gray-500">
              ระบบจะตรวจสอบรายชื่อจากฐานข้อมูล (Sheet "Users") กรุณาติดต่อผู้ดูแลหากเข้าใช้งานไม่ได้
            </p>
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
