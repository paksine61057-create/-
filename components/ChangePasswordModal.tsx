
import React, { useState } from 'react';
import { THEME_GRADIENT } from '../types';
import { X, Lock, Save, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, username }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'รหัสผ่านใหม่ไม่ตรงกัน' });
      return;
    }

    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร' });
      return;
    }

    setIsLoading(true);
    const res = await api.changePassword(username, oldPassword, newPassword);
    setIsLoading(false);

    if (res.status === 'success') {
      setMessage({ type: 'success', text: 'เปลี่ยนรหัสผ่านสำเร็จ!' });
      setTimeout(() => {
        onClose();
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage(null);
      }, 1500);
    } else {
      setMessage({ type: 'error', text: res.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่' });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative animate-scale-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Lock className="text-purple-600" /> เปลี่ยนรหัสผ่าน
        </h3>

        {message && (
          <div className={`mb-4 p-3 rounded-xl text-sm flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่านเดิม</label>
            <input 
              type="password" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่านใหม่</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ยืนยันรหัสผ่านใหม่</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-bold ${THEME_GRADIENT} shadow-md hover:opacity-90 flex items-center justify-center gap-2 mt-4`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            บันทึกรหัสผ่านใหม่
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
