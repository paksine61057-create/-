import React, { useState, useRef } from 'react';
import { Card } from './ui/Card';
import { THEME_GRADIENT, Project } from '../types';
import { FileText, Printer, Calendar, Filter } from 'lucide-react';

interface ReportExportProps {
    projects: Project[];
}

const LOGO_URL = "https://img5.pic.in.th/file/secure-sv1/5bc66fd0-c76e-41c4-87ed-46d11f4a36fa.png";

const ReportExport: React.FC<ReportExportProps> = ({ projects }) => {
  const [reportType, setReportType] = useState('summary'); // summary | details
  const [selectedGroup, setSelectedGroup] = useState('all');
  
  // Filter Logic
  const getFilteredProjects = () => {
      let filtered = projects;
      
      // Filter by Group
      if (selectedGroup !== 'all') {
          filtered = filtered.filter(p => p.group === selectedGroup);
      }
      
      // For "Summary" report, we usually show active projects or those with budget
      // For "Details", maybe only those with spending
      return filtered;
  };

  const reportData = getFilteredProjects();

  // Overview Stats
  const totalBudget = reportData.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = reportData.reduce((sum, p) => sum + p.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  // Native Browser Print
  const handlePrint = () => {
      window.print();
  };

  const uniqueGroups = Array.from(new Set(projects.map(p => p.group)));

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <div className="flex items-center justify-between mb-6 print:hidden">
            <h2 className="text-2xl font-bold text-gray-800">ออกรายงานสรุปการใช้งบประมาณ</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* --- LEFT PANEL: CONTROLS (Hidden on Print) --- */}
            <div className="lg:col-span-4 space-y-6 print:hidden">
                <Card>
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar size={18} className="text-purple-500" /> ตั้งค่ารายงาน
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Report Type Selection */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">เลือกรูปแบบรายงาน</label>
                            <select 
                                className="w-full p-2 border rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                            >
                                <option value="summary">แบบที่ 1: สรุปการเบิกจ่าย (บันทึกข้อความ)</option>
                                <option value="table">แบบที่ 2: ตารางรายละเอียดโครงการ</option>
                            </select>
                        </div>
                        
                        {/* Date Range (Visual only for now) */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">ตั้งแต่วันที่</label>
                                <input type="date" className="w-full p-2 border rounded-lg text-sm outline-none" defaultValue="2025-10-01" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">ถึงวันที่</label>
                                <input type="date" className="w-full p-2 border rounded-lg text-sm outline-none" defaultValue="2026-09-30" />
                            </div>
                        </div>
                        
                        {/* Group Filter */}
                        <div className="pt-2 border-t">
                             <label className="block text-xs font-medium text-gray-500 mb-1">กรองตามกลุ่มงาน</label>
                             <select 
                                className="w-full p-2 border rounded-lg text-sm outline-none"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                             >
                                <option value="all">-- ทุกกลุ่มงาน --</option>
                                {uniqueGroups.map((g, i) => (
                                    <option key={i} value={g}>{g}</option>
                                ))}
                             </select>
                        </div>
                    </div>
                </Card>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center shadow-sm">
                    <Printer size={40} className="mx-auto text-purple-400 mb-2" />
                    <p className="text-sm text-purple-800 font-medium">พร้อมพิมพ์รายงาน</p>
                    <p className="text-xs text-purple-600 mb-3">กดปุ่มด้านล่างเพื่อพิมพ์หรือบันทึกเป็น PDF</p>
                    <button 
                        onClick={handlePrint}
                        className="flex items-center justify-center w-full py-3 bg-white border border-purple-200 text-purple-600 rounded-xl text-sm font-bold hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
                    >
                        <Printer size={16} className="mr-2" /> 
                        พิมพ์รายงาน / บันทึก PDF
                    </button>
                    <p className="text-[10px] text-gray-400 mt-2">Tip: ในหน้าต่างพิมพ์ เลือก "Save as PDF" ได้</p>
                </div>
            </div>

            {/* --- RIGHT PANEL: REPORT PREVIEW (Visible on Print via ID) --- */}
            <div className="lg:col-span-8">
                {/* Wrapper Card (Hidden visual styles when printing) */}
                <Card className="flex flex-col relative bg-gray-100 min-h-[800px] print:shadow-none print:border-none print:bg-white print:p-0 print:min-h-0">
                    
                    <div className="mb-2 text-center text-xs text-gray-500 print:hidden">
                        ตัวอย่างเอกสาร (A4) - สิ่งที่จะถูกพิมพ์
                    </div>

                    {/* 
                        PRINTABLE AREA 
                        This div corresponds to the A4 page.
                        The global CSS in index.html handles the #printable-area visibility.
                    */}
                    <div className="overflow-auto flex justify-center p-4 bg-gray-200 rounded-lg print:p-0 print:bg-white print:overflow-visible">
                        <div 
                            id="printable-area"
                            className="bg-white text-black shadow-2xl box-border print:shadow-none"
                            style={{ 
                                width: '210mm', 
                                minHeight: '297mm',
                                padding: '20mm', // Standard margin
                                fontSize: '14px', // Base font size for readability
                                lineHeight: '1.5',
                                fontFamily: "'Sarabun', sans-serif",
                                position: 'relative'
                            }} 
                        >
                            {/* --- HEADER: GARUDA & TITLE --- */}
                            <div className="mb-6 text-center relative">
                                <img src={LOGO_URL} alt="Garuda" className="w-16 h-auto mx-auto mb-4" />
                                
                                {reportType === 'summary' ? (
                                    <>
                                        <h1 className="font-bold text-xl">บันทึกข้อความ</h1>
                                        <div className="flex justify-between items-end w-full mt-4 border-b border-dotted border-black pb-1">
                                            <div className="text-left w-3/4">
                                                <div className="flex">
                                                    <span className="font-bold w-24">ส่วนราชการ</span>
                                                    <span>โรงเรียนประจักษ์ศิลปาคม อำเภอเมือง จังหวัดอุดรธานี</span>
                                                </div>
                                                <div className="flex mt-1">
                                                    <span className="font-bold w-24">ที่</span>
                                                    <span>.........................................................</span>
                                                </div>
                                            </div>
                                            <div className="text-right w-1/4">
                                                <span className="font-bold mr-2">วันที่</span>
                                                <span>{new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
                                            </div>
                                        </div>
                                        <div className="flex mt-2">
                                            <span className="font-bold w-24">เรื่อง</span>
                                            <span className="font-bold">รายงานสรุปผลการเบิกจ่ายงบประมาณ ประจำปี 2569</span>
                                        </div>
                                        <div className="border-b border-black mt-2 mb-6"></div>
                                    </>
                                ) : (
                                    /* Table Header Style */
                                    <div className="text-center mb-6">
                                        <h1 className="font-bold text-lg">รายงานรายละเอียดโครงการและงบประมาณ</h1>
                                        <h2 className="font-bold text-md">โรงเรียนประจักษ์ศิลปาคม ปีงบประมาณ 2569</h2>
                                        <p className="text-sm text-gray-600">ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                    </div>
                                )}
                            </div>

                            {/* --- CONTENT BODY --- */}
                            <div className="text-justify">
                                {reportType === 'summary' && (
                                    <>
                                        <p className="indent-8 mb-2">
                                            เรียน ผู้อำนวยการโรงเรียนประจักษ์ศิลปาคม
                                        </p>
                                        <p className="indent-8 mb-4">
                                            ตามที่ได้รับจัดสรรงบประมาณ ประจำปีการศึกษา 2569 เพื่อใช้ในการบริหารจัดการและดำเนินโครงการต่างๆ 
                                            ภายในโรงเรียนประจักษ์ศิลปาคม นั้น บัดนี้ งานนโยบายและแผน ขอรายงานสรุปผลการเบิกจ่ายงบประมาณ {selectedGroup !== 'all' ? `(เฉพาะ${selectedGroup})` : ''} ดังรายการต่อไปนี้
                                        </p>
                                    </>
                                )}

                                {/* SUMMARY BOX */}
                                <div className="border border-black mb-6">
                                    <div className="grid grid-cols-3 text-center bg-gray-100 border-b border-black font-bold">
                                        <div className="py-2 border-r border-black">งบประมาณได้รับ</div>
                                        <div className="py-2 border-r border-black">เบิกจ่ายแล้ว</div>
                                        <div className="py-2">คงเหลือสุทธิ</div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center">
                                        <div className="py-2 border-r border-black">{totalBudget.toLocaleString()} บาท</div>
                                        <div className="py-2 border-r border-black">{totalSpent.toLocaleString()} บาท</div>
                                        <div className="py-2 font-bold">{totalRemaining.toLocaleString()} บาท</div>
                                    </div>
                                </div>

                                <p className="mb-2 font-bold">รายละเอียดแยกตามโครงการ:</p>

                                {/* MAIN TABLE */}
                                <table className="w-full border-collapse border border-black text-[12px]">
                                    <thead>
                                        <tr className="bg-gray-200 text-center">
                                            <th className="border border-black py-2 px-1 w-10">ที่</th>
                                            <th className="border border-black py-2 px-2">ชื่อโครงการ</th>
                                            <th className="border border-black py-2 px-2 w-24">งบอนุมัติ</th>
                                            <th className="border border-black py-2 px-2 w-24">เบิกจ่าย</th>
                                            <th className="border border-black py-2 px-2 w-24">คงเหลือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.length > 0 ? (
                                            reportData.map((p, i) => (
                                                <tr key={p.id}>
                                                    <td className="border border-black py-1.5 px-1 text-center align-top">{i + 1}</td>
                                                    <td className="border border-black py-1.5 px-2 align-top">
                                                        {p.name}
                                                        {reportType === 'table' && <div className="text-[10px] text-gray-500">{p.group}</div>}
                                                    </td>
                                                    <td className="border border-black py-1.5 px-2 text-right align-top">{p.budget.toLocaleString()}</td>
                                                    <td className="border border-black py-1.5 px-2 text-right align-top">{p.spent.toLocaleString()}</td>
                                                    <td className="border border-black py-1.5 px-2 text-right align-top font-bold">{(p.budget - p.spent).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="border border-black py-4 text-center italic">ไม่มีข้อมูลโครงการ</td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-gray-100 font-bold">
                                            <td colSpan={2} className="border border-black py-2 px-2 text-center">รวมทั้งสิ้น</td>
                                            <td className="border border-black py-2 px-2 text-right">{totalBudget.toLocaleString()}</td>
                                            <td className="border border-black py-2 px-2 text-right">{totalSpent.toLocaleString()}</td>
                                            <td className="border border-black py-2 px-2 text-right">{totalRemaining.toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                {reportType === 'summary' && (
                                    <>
                                        <p className="indent-8 mt-6 mb-8">จึงเรียนมาเพื่อโปรดทราบและพิจารณา</p>

                                        {/* SIGNATURES */}
                                        <div className="flex justify-between mt-12 px-8 break-inside-avoid">
                                            <div className="text-center">
                                                <p className="mb-4">ลงชื่อ ....................................................... ผู้รายงาน</p>
                                                <p>(นางสาวปภัสพ์มณ ทองอาสา)</p>
                                                <p>หัวหน้างานนโยบายและแผน</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="mb-4">ลงชื่อ ....................................................... ผู้อนุมัติ</p>
                                                <p>(.......................................................)</p>
                                                <p>ผู้อำนวยการโรงเรียนประจักษ์ศิลปาคม</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default ReportExport;