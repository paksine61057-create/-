
import React, { useState } from 'react';
import { Project } from '../types';
import { Card } from './ui/Card';
import { Filter, Wallet, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface BudgetDashboardProps {
    projects: Project[];
}

const BudgetDashboard: React.FC<BudgetDashboardProps> = ({ projects }) => {
  const [filterGroup, setFilterGroup] = useState('all');
  
  // 1. Stats Logic
  const getStats = (projs: Project[]) => {
      const budget = projs.reduce((sum, p) => sum + p.budget, 0);
      const spent = projs.reduce((sum, p) => sum + p.spent, 0);
      const remaining = budget - spent;
      const percent = budget > 0 ? (spent / budget) * 100 : 0;
      return { budget, spent, remaining, percent };
  };

  const totalStats = getStats(projects);
  const pj1Stats = getStats(projects.filter(p => p.id >= 100 && p.id < 200));
  const pj2Stats = getStats(projects.filter(p => p.id >= 200 && p.id < 300));
  const pj3Stats = getStats(projects.filter(p => p.id >= 300));

  const overallChartData = [
      { name: 'Used', value: totalStats.spent },
      { name: 'Remaining', value: totalStats.remaining }
  ];

  // 2. Filter Logic for Table
  const filteredProjects = filterGroup === 'all' 
    ? projects 
    : projects.filter(p => p.group === filterGroup);

  const CategoryCard = ({ title, stats, color, icon }: { title: string, stats: any, color: string, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-3 rounded-2xl bg-opacity-10 text-white`} style={{ backgroundColor: `${color}20` }}>
                {icon}
            </div>
            <span className="text-3xl font-bold" style={{ color: color }}>{stats.percent.toFixed(1)}%</span>
        </div>
        <div>
            <h4 className="text-gray-600 font-bold text-sm mb-2">{title}</h4>
            <div className="flex items-end justify-between mb-2">
                 <div className="flex flex-col">
                     <span className="text-xs text-gray-400">คงเหลือ</span>
                     <span className="text-lg font-bold text-gray-800">{stats.remaining.toLocaleString()}</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-gray-400 block">งบประมาณ</span>
                    <span className="text-xs font-medium text-gray-600">{stats.budget.toLocaleString()}</span>
                 </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stats.percent}%`, backgroundColor: color }}
                ></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Section: Visual Dashboard */}
      <div className="space-y-6">
          {/* Main Overall Gauge */}
          <div className="bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              
              <div className="flex-1 text-center md:text-left z-10">
                   <h2 className="text-3xl font-bold text-gray-800 mb-2">ภาพรวมการเบิกจ่ายงบประมาณ</h2>
                   <p className="text-gray-500 mb-6">สรุปสถานะงบประมาณรวมทุกหมวด (PJ1, PJ2, PJ3) ปี 2569</p>
                   
                   <div className="flex gap-4 justify-center md:justify-start">
                       <div className="bg-purple-50 px-6 py-3 rounded-2xl border border-purple-100">
                           <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">งบประมาณรวม</p>
                           <p className="text-2xl font-bold text-gray-800">{totalStats.budget.toLocaleString()}</p>
                       </div>
                       <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
                           <p className="text-xs text-green-600 font-bold uppercase tracking-wider">คงเหลือสุทธิ</p>
                           <p className="text-2xl font-bold text-green-600">{totalStats.remaining.toLocaleString()}</p>
                       </div>
                   </div>
              </div>

              <div className="relative w-64 h-64 flex-shrink-0">
                 <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                         <Pie
                            data={overallChartData}
                            innerRadius={80}
                            outerRadius={100}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                         >
                            <Cell fill="#6A4DE8" />
                            <Cell fill="#F3F4F6" />
                         </Pie>
                     </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-5xl font-bold text-[#6A4DE8]">{totalStats.percent.toFixed(1)}%</span>
                     <span className="text-sm text-gray-400 uppercase font-medium mt-1">ใช้ไปแล้ว</span>
                 </div>
              </div>
          </div>

          {/* 3 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard 
                title="PJ1: งบอุดหนุนรายหัว" 
                stats={pj1Stats} 
                color="#8B5CF6" // Purple
                icon={<Wallet className="text-purple-600" size={24} />}
              />
              <CategoryCard 
                title="PJ2: งบพัฒนาผู้เรียน" 
                stats={pj2Stats} 
                color="#EC4899" // Pink
                icon={<TrendingUp className="text-pink-600" size={24} />}
              />
              <CategoryCard 
                title="PJ3: งบกลาง" 
                stats={pj3Stats} 
                color="#F59E0B" // Orange
                icon={<PieChartIcon className="text-orange-600" size={24} />}
              />
          </div>
      </div>

      {/* Detailed Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-200">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">รายละเอียดรายโครงการ</h2>
            <p className="text-sm text-gray-500 mt-1">
                แสดงข้อมูล {filteredProjects.length} โครงการ
            </p>
        </div>
        
        {/* Filters */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <Filter size={18} className="text-purple-500 ml-2" />
            <select 
                className="bg-transparent border-none text-sm focus:ring-0 text-gray-700 font-medium cursor-pointer outline-none pr-8"
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
            >
                <option value="all">ทุกกลุ่มงาน</option>
                <option value="กลุ่มบริหารวิชาการ">กลุ่มบริหารวิชาการ</option>
                <option value="กลุ่มบริหารงบประมาณ">กลุ่มบริหารงบประมาณ</option>
                <option value="กลุ่มกิจการนักเรียน">กลุ่มกิจการนักเรียน</option>
                <option value="กลุ่มบริหารทั่วไป">กลุ่มบริหารทั่วไป</option>
                <option value="กลุ่มบริหารงานบุคคล">กลุ่มบริหารงานบุคคล</option>
            </select>
        </div>
      </div>

      {/* Detailed Table */}
      <Card className="overflow-hidden mt-4">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อโครงการ</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">งบได้รับ</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ใช้ไป</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">คงเหลือ</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProjects.map((project) => {
                        return (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{project.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                                    {project.budget.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                    {project.spent.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-bold">
                                    {(project.budget - project.spent).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {project.status === 'Active' ? 
                                        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto" title="กำลังดำเนินการ"></div> : 
                                     project.status === 'Closed' ?
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto" title="ดำเนินการเสร็จสิ้น"></div> :
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto" title="เฝ้าระวัง"></div>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

export default BudgetDashboard;
