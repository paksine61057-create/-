
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { THEME_GRADIENT, Project } from '../types';
import { Save, CheckCircle, AlertCircle, Loader2, Wallet } from 'lucide-react';

interface RecordExpenseProps {
    projects: Project[];
    onRecord: (projectId: number, amount: number, date: string, item: string) => Promise<boolean>;
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
        // Pass date and item to the parent handler -> API
        const success = await onRecord(projectIdNum, amountNum, formData.date, formData.item);
        setIsSaving(false);

        if (success) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            
            // Reset form but keep date today
            setFormData({
                projectId: '',
                item: '',
                date: new Date().toISOString().split('T')[0],
                amount: '',
                note: ''
            });
        } else {
            alert("บันทึกไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อ หรือรหัสโครงการใน Google Sheet");
        }
    } else {
        alert("กรุณาตรวจสอบข้อมูลโครงการและจำนวนเงิน");
    }
  };

  // Find selected project to display info
  const selectedProject = projects.find(p => p.id.toString() === formData.projectId);

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
            บันทึกข้อมูลเรียบร้อย!
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

            {/* Budget Info Box */}
            {selectedProject && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <Wallet className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">งบประมาณที่ได้รับ</p>
                            <p className="text-lg font-bold text-purple-700">{selectedProject.budget.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-purple-200"></div>
                    <div className="flex justify-between md:justify-start md:gap-8 w-full md:w-auto">
                        <div>
                            <p className="text-xs text-gray-500">ใช้ไปแล้ว</p>
                            <p className="font-medium text-gray-700">{selectedProject.spent.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">คงเหลือ</p>
                            <p className={`font-bold ${(selectedProject.budget - selectedProject.spent) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {(selectedProject.budget - selectedProject.spent).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
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
              <p className="text-xs text-gray-400 mt-1">* กรอกเฉพาะตัวเลขจำนวนเต็ม</p>
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
    </div>
  );
};

export default RecordExpense;
