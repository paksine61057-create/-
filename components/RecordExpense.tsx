
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { THEME_GRADIENT, Project } from '../types';
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface RecordExpenseProps {
    projects: Project[];
    onRecord: (projectId: number, amount: number) => Promise<boolean>;
}

const RecordExpense: React.FC<RecordExpenseProps> = ({ projects, onRecord }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    item: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseInt(formData.amount, 10);
    const projectIdNum = parseInt(formData.projectId, 10);

    if (!isNaN(amountNum) && !isNaN(projectIdNum) && projectIdNum > 0) {
        setIsSaving(true);
        // Update the global state and wait for API
        const success = await onRecord(projectIdNum, amountNum);
        setIsSaving(false);

        if (success) {
            // Show success message and reset form
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            
            setFormData({
                projectId: '',
                item: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
                note: ''
            });
        } else {
            alert("บันทึกไม่สำเร็จ กรุณาตรวจสอบชื่อคอลัมน์ใน Google Sheet (id, budget, spent, status) หรือการเชื่อมต่ออินเทอร์เน็ต");
        }
    } else {
        alert("กรุณาตรวจสอบข้อมูลโครงการและจำนวนเงิน");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center mb-6">
        <div className={`p-2 rounded-lg ${THEME_GRADIENT} text-white mr-3`}>
            <Save size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">บันทึกรายการใช้จ่าย</h2>
      </div>

      <Card>
        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            บันทึกข้อมูลและอัปเดตยอดงบประมาณสำเร็จ!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เลือกโครงการ</label>
            <div className="relative">
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                required
                disabled={isSaving}
                className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all disabled:bg-gray-100"
              >
                <option value="">-- กรุณาเลือกโครงการ --</option>
                {projects.filter(p => p.status !== 'Closed').map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expense Item */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">รายการใช้จ่าย</label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
              disabled={isSaving}
              placeholder="เช่น ค่าวัสดุสำนักงาน, ค่าวิทยากร"
              className="block w-full px-4 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">วันที่ใช้จ่าย</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                disabled={isSaving}
                className="block w-full px-4 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all disabled:bg-gray-100"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนเงิน (บาท)</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  disabled={isSaving}
                  placeholder="0"
                  min="0"
                  step="1" 
                  className="block w-full px-4 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all disabled:bg-gray-100"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">* กรอกเฉพาะตัวเลขจำนวนเต็ม (ไม่มีจุดทศนิยม)</p>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ (ถ้ามี)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              disabled={isSaving}
              className="block w-full px-4 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-2xl shadow-md text-lg font-medium text-white ${THEME_GRADIENT} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSaving ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    กำลังบันทึก...
                  </>
              ) : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
        <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-blue-700">
          <strong>ข้อแนะนำ:</strong> ระบบจะทำการคำนวณและหักลบงบประมาณคงเหลือของโครงการที่เลือกโดยอัตโนมัติทันทีที่บันทึก
        </p>
      </div>
    </div>
  );
};

export default RecordExpense;
