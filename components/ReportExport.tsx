
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { THEME_GRADIENT, Project } from '../types';
import { FileText, Download, Calendar, Printer, Filter } from 'lucide-react';

interface ReportExportProps {
    projects: Project[];
}

const ReportExport: React.FC<ReportExportProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  // 1. Filter Logic: Show only projects with spending > 0 OR the specifically selected project
  const reportData = selectedProject === 'all'
    ? projects.filter(p => p.spent > 0)
    : projects.filter(p => p.id === Number(selectedProject));

  // 2. Overview Stats (Global)
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const totalPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
       <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ออกรายงานสรุปการใช้งบประมาณ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Panel: Controls (4 cols) */}
            <div className="md:col-span-4 space-y-6">
                <Card>
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar size={18} className="text-purple-500" /> ตัวเลือกรายงาน
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">ประเภทรายงาน</label>
                            <select className="w-full p-2 border rounded-lg text-sm bg-gray-50">
                                <option>สรุปการเบิกจ่ายงบประมาณ (คงเหลือ)</option>
                                <option>รายงานรายละเอียดค่าใช้จ่าย (Statement)</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">เริ่มวันที่</label>
                                <input type="date" className="w-full p-2 border rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500" defaultValue="2025-10-01" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">ถึงวันที่</label>
                                <input type="date" className="w-full p-2 border rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500" defaultValue="2026-09-30" />
                            </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                             <label className="block text-xs font-medium text-gray-500 mb-1">กรองตามโครงการ</label>
                             <select 
                                className="w-full p-2 border rounded-lg text-sm"
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                             >
                                <option value="all">-- แสดงเฉพาะโครงการที่มีการเบิกจ่าย --</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                             </select>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-2 mt-2 rounded-xl text-white text-sm font-bold ${THEME_GRADIENT} shadow hover:opacity-90 transition-all`}
                        >
                            {isGenerating ? 'กำลังประมวลผล...' : 'อัปเดตตัวอย่างรายงาน'}
                        </button>
                    </div>
                </Card>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
                    <FileText size={40} className="mx-auto text-purple-400 mb-2" />
                    <p className="text-sm text-purple-800 font-medium">พร้อมดาวน์โหลด</p>
                    <p className="text-xs text-purple-600 mb-3">รายงานสถานะปัจจุบัน (PDF)</p>
                    <button className="flex items-center justify-center w-full py-2 bg-white border border-purple-200 text-purple-600 rounded-lg text-sm font-bold hover:bg-purple-100 transition-colors">
                        <Download size={16} className="mr-2" /> Download PDF
                    </button>
                </div>
            </div>

            {/* Right Panel: Preview (8 cols) */}
            <div className="md:col-span-8">
                <Card className="min-h-[600px] flex flex-col relative bg-gray-500/5">
                    <div className="absolute top-4 right-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 bg-white shadow-sm rounded-full">
                            <Printer size={18} />
                        </button>
                    </div>

                    {/* Paper Preview */}
                    <div className="flex-grow border border-gray-200 rounded-sm p-8 bg-white shadow-lg mx-auto w-full max-w-[210mm] text-black">
                        <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                            <h1 className="text-xl font-bold text-gray-900">รายงานสรุปการเบิกจ่ายงบประมาณ</h1>
                            <h2 className="text-lg font-medium text-gray-700">โรงเรียนประจักษ์ศิลปาคม</h2>
                            <p className="text-sm text-gray-500 mt-1">ประจำปีงบประมาณ 2569</p>
                        </div>

                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-3">
                                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                                <p className="text-sm text-gray-400">กำลังจัดเตรียมข้อมูล...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-end text-sm mb-2">
                                    <div>
                                        <p><strong>วันที่พิมพ์:</strong> {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
                                        <p><strong>ผู้พิมพ์:</strong> นางสาวปภัสพ์มณ ทองอาสา</p>
                                    </div>
                                    <div className="text-right">
                                         <span className="bg-gray-100 px-2 py-1 rounded text-xs">สถานะ: เป็นทางการ</span>
                                    </div>
                                </div>

                                {/* Summary Box */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                    <h3 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">ภาพรวมงบประมาณทั้งสิ้น</h3>
                                    <div className="grid grid-cols-3 gap-4 text-center divide-x divide-gray-200">
                                        <div>
                                            <p className="text-xs text-gray-500">งบประมาณได้รับ</p>
                                            <p className="text-base font-bold text-gray-800">{totalBudget.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">ใช้จ่ายรวม</p>
                                            <p className="text-base font-bold text-purple-600">{totalSpent.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">คงเหลือสุทธิ</p>
                                            <p className="text-base font-bold text-green-600">{totalRemaining.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Data Table */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 mb-2">
                                        รายการเบิกจ่ายแยกตามโครงการ 
                                        <span className="font-normal text-gray-500 text-xs ml-2">
                                            (แสดงเฉพาะรายการที่มีการเคลื่อนไหว)
                                        </span>
                                    </h3>
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 border-y border-gray-300">
                                                <th className="text-left py-2 px-2 font-semibold text-gray-700">ชื่อโครงการ</th>
                                                <th className="text-right py-2 px-2 font-semibold text-gray-700 w-24">งบอนุมัติ</th>
                                                <th className="text-right py-2 px-2 font-semibold text-gray-700 w-24">เบิกจ่าย</th>
                                                <th className="text-right py-2 px-2 font-semibold text-gray-700 w-24">คงเหลือ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.length > 0 ? (
                                                reportData.map((p, i) => (
                                                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                                                        <td className="py-2 px-2 align-top">{p.name}</td>
                                                        <td className="text-right py-2 px-2 align-top">{p.budget.toLocaleString()}</td>
                                                        <td className="text-right py-2 px-2 align-top font-medium text-purple-700">{p.spent.toLocaleString()}</td>
                                                        <td className="text-right py-2 px-2 align-top text-green-700">{(p.budget - p.spent).toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="py-8 text-center text-gray-400 italic bg-gray-50/50">
                                                        -- ยังไม่มีรายการที่มีการเบิกจ่าย --
                                                    </td>
                                                </tr>
                                            )}
                                            
                                            {/* Table Footer / Grand Total */}
                                            <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                                                <td className="py-2 px-2 text-right">รวมทั้งสิ้น</td>
                                                <td className="text-right py-2 px-2">{reportData.reduce((s, p) => s + p.budget, 0).toLocaleString()}</td>
                                                <td className="text-right py-2 px-2">{reportData.reduce((s, p) => s + p.spent, 0).toLocaleString()}</td>
                                                <td className="text-right py-2 px-2">{reportData.reduce((s, p) => s + (p.budget - p.spent), 0).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Signatures */}
                                <div className="mt-16 pt-4 flex justify-between text-center px-4">
                                    <div className="w-5/12">
                                        <div className="border-b border-dotted border-gray-400 mb-2 w-full mx-auto h-8"></div>
                                        <p className="text-sm font-medium">หัวหน้างานนโยบายและแผน</p>
                                        <p className="text-xs text-gray-500 mt-1">ผู้ตรวจสอบ</p>
                                    </div>
                                    <div className="w-5/12">
                                        <div className="border-b border-dotted border-gray-400 mb-2 w-full mx-auto h-8"></div>
                                        <p className="text-sm font-medium">ผู้อำนวยการโรงเรียน</p>
                                        <p className="text-xs text-gray-500 mt-1">ผู้อนุมัติ</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default ReportExport;
