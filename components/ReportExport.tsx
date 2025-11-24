
import React, { useState, useRef } from 'react';
import { Card } from './ui/Card';
import { THEME_GRADIENT, Project } from '../types';
import { FileText, Download, Calendar, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportExportProps {
    projects: Project[];
}

const LOGO_URL = "https://img5.pic.in.th/file/secure-sv1/5bc66fd0-c76e-41c4-87ed-46d11f4a36fa.png";

const ReportExport: React.FC<ReportExportProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null); // Reference for the report area

  // 1. Filter Logic
  const reportData = selectedProject === 'all'
    ? projects.filter(p => p.spent > 0)
    : projects.filter(p => p.id === Number(selectedProject));

  // 2. Overview Stats
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  // 3. Generate PDF Function (Multi-page support)
  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    try {
        setIsGenerating(true);
        
        // Capture the DOM with high scale for clarity
        const canvas = await html2canvas(reportRef.current, {
            scale: 4, // Higher scale for better quality with small fonts
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        
        // A4 Dimensions (mm)
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        // Calculate Image Dimensions in PDF
        const imgProps = { width: canvas.width, height: canvas.height };
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        const doc = new jsPDF('p', 'mm', 'a4');
        
        let heightLeft = imgHeight;
        let position = 0;

        // First Page
        doc.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add extra pages if content overflows
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        
        // Save file
        doc.save(`รายงานงบประมาณ_${new Date().toISOString().split('T')[0]}.pdf`);
        
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("เกิดข้อผิดพลาดในการสร้าง PDF");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleUpdatePreview = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ออกรายงานสรุปการใช้งบประมาณ</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
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
                            onClick={handleUpdatePreview}
                            disabled={isGenerating}
                            className={`w-full py-2 mt-2 rounded-xl text-white text-sm font-bold ${THEME_GRADIENT} shadow hover:opacity-90 transition-all`}
                        >
                            อัปเดตตัวอย่างรายงาน
                        </button>
                    </div>
                </Card>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
                    <FileText size={40} className="mx-auto text-purple-400 mb-2" />
                    <p className="text-sm text-purple-800 font-medium">พร้อมดาวน์โหลด</p>
                    <p className="text-xs text-purple-600 mb-3">รายงานสถานะปัจจุบัน (PDF)</p>
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isGenerating}
                        className="flex items-center justify-center w-full py-2 bg-white border border-purple-200 text-purple-600 rounded-lg text-sm font-bold hover:bg-purple-100 transition-colors"
                    >
                        <Download size={16} className="mr-2" /> 
                        {isGenerating ? 'กำลังสร้าง PDF...' : 'Download PDF'}
                    </button>
                </div>
            </div>

            {/* Right Panel: Preview (8 cols) */}
            <div className="lg:col-span-8">
                <Card className="flex flex-col relative bg-gray-500/10 min-h-[800px]">
                    <div className="absolute top-4 right-4 z-10">
                        <button 
                            onClick={handleDownloadPDF}
                            className="p-2 text-gray-400 hover:text-purple-600 bg-white shadow-sm rounded-full transition-all hover:shadow-md"
                            title="Print / Save as PDF"
                        >
                            <Printer size={18} />
                        </button>
                    </div>
                    
                    <div className="mb-2 text-center text-xs text-gray-500">
                        ตัวอย่างขนาด A4 (Font 8px)
                    </div>

                    {/* Paper Preview Area - This is what gets captured */}
                    <div className="overflow-auto flex justify-center p-4 bg-gray-200 rounded-lg">
                        <div 
                            ref={reportRef}
                            className="bg-white text-black shadow-2xl box-border"
                            style={{ 
                                width: '210mm', 
                                minHeight: '297mm',
                                padding: '20mm', // Standard print margin
                                fontSize: '8px', // Reduced font size to 8px (approx half of 16px)
                                lineHeight: '1.5',
                                fontFamily: "'Sarabun', sans-serif"
                            }} 
                        >
                            {/* Header */}
                            <div className="text-center mb-6 pb-2 border-b border-gray-800">
                                <img src={LOGO_URL} alt="School Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                                <h1 className="font-bold text-gray-900" style={{ fontSize: '14px' }}>รายงานสรุปการเบิกจ่ายงบประมาณ</h1>
                                <h2 className="font-medium text-gray-700" style={{ fontSize: '12px' }}>โรงเรียนประจักษ์ศิลปาคม</h2>
                                <p className="text-gray-500 mt-1">ประจำปีงบประมาณ 2569</p>
                            </div>

                            {isGenerating && !reportRef.current ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-3">
                                    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                                    <p className="text-sm text-gray-400">กำลังจัดเตรียมข้อมูล...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Report Info */}
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p><strong>วันที่พิมพ์:</strong> {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
                                            <p><strong>ผู้พิมพ์:</strong> นางสาวปภัสพ์มณ ทองอาสา</p>
                                        </div>
                                        <div className="text-right">
                                             <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-300" style={{ fontSize: '8px' }}>เอกสารราชการภายใน</span>
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                                        <h3 className="font-bold text-gray-800 mb-2 border-b pb-1" style={{ fontSize: '10px' }}>ภาพรวมงบประมาณทั้งสิ้น</h3>
                                        <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-200">
                                            <div>
                                                <p className="text-gray-500" style={{ fontSize: '8px' }}>งบประมาณได้รับ</p>
                                                <p className="font-bold text-gray-800" style={{ fontSize: '10px' }}>{totalBudget.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500" style={{ fontSize: '8px' }}>ใช้จ่ายรวม</p>
                                                <p className="font-bold text-purple-600" style={{ fontSize: '10px' }}>{totalSpent.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500" style={{ fontSize: '8px' }}>คงเหลือสุทธิ</p>
                                                <p className="font-bold text-green-600" style={{ fontSize: '10px' }}>{totalRemaining.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Data Table */}
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2" style={{ fontSize: '10px' }}>
                                            รายการเบิกจ่ายแยกตามโครงการ 
                                        </h3>
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 border-y border-gray-300" style={{ fontSize: '8px' }}>
                                                    <th className="text-left py-1.5 px-1 font-semibold text-gray-700" style={{ fontSize: '8px' }}>ชื่อโครงการ</th>
                                                    <th className="text-right py-1.5 px-1 font-semibold text-gray-700 w-20" style={{ fontSize: '8px' }}>งบอนุมัติ</th>
                                                    <th className="text-right py-1.5 px-1 font-semibold text-gray-700 w-20" style={{ fontSize: '8px' }}>เบิกจ่าย</th>
                                                    <th className="text-right py-1.5 px-1 font-semibold text-gray-700 w-20" style={{ fontSize: '8px' }}>คงเหลือ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.length > 0 ? (
                                                    reportData.map((p, i) => (
                                                        <tr key={i} className="border-b border-gray-200">
                                                            <td className="py-1.5 px-1 align-top">{p.name}</td>
                                                            <td className="text-right py-1.5 px-1 align-top">{p.budget.toLocaleString()}</td>
                                                            <td className="text-right py-1.5 px-1 align-top font-medium text-purple-700">{p.spent.toLocaleString()}</td>
                                                            <td className="text-right py-1.5 px-1 align-top text-green-700">{(p.budget - p.spent).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="py-6 text-center text-gray-400 italic bg-gray-50/50" style={{ fontSize: '8px' }}>
                                                            -- ยังไม่มีรายการที่มีการเบิกจ่าย --
                                                        </td>
                                                    </tr>
                                                )}
                                                
                                                {/* Table Footer / Grand Total */}
                                                <tr className="bg-gray-100 font-bold border-t-2 border-gray-300" style={{ fontSize: '8px' }}>
                                                    <td className="py-1.5 px-1 text-right">รวมทั้งสิ้น</td>
                                                    <td className="text-right py-1.5 px-1">{reportData.reduce((s, p) => s + p.budget, 0).toLocaleString()}</td>
                                                    <td className="text-right py-1.5 px-1">{reportData.reduce((s, p) => s + p.spent, 0).toLocaleString()}</td>
                                                    <td className="text-right py-1.5 px-1">{reportData.reduce((s, p) => s + (p.budget - p.spent), 0).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Signatures */}
                                    <div className="mt-10 pt-6 flex justify-between text-center px-4 break-inside-avoid">
                                        <div className="w-5/12">
                                            <div className="border-b border-dotted border-gray-400 mb-2 w-full mx-auto h-6"></div>
                                            <p className="font-medium">หัวหน้างานนโยบายและแผน</p>
                                            <p className="text-gray-500 mt-0.5" style={{ fontSize: '8px' }}>ผู้ตรวจสอบ</p>
                                        </div>
                                        <div className="w-5/12">
                                            <div className="border-b border-dotted border-gray-400 mb-2 w-full mx-auto h-6"></div>
                                            <p className="font-medium">ผู้อำนวยการโรงเรียน</p>
                                            <p className="text-gray-500 mt-0.5" style={{ fontSize: '8px' }}>ผู้อนุมัติ</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default ReportExport;
