
import React from 'react';
import { Page, THEME_GRADIENT, Project, Expense } from '../types';
import { Card } from './ui/Card';
import { FilePlus2, PieChart, FolderCog, FileText, Wallet, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend } from 'recharts';

interface HomeProps {
  setPage: (page: Page) => void;
  projects: Project[];
  expenses: Expense[];
  username: string;
  userRole: 'admin' | 'user' | null;
}

const Home: React.FC<HomeProps> = ({ setPage, projects, expenses, username, userRole }) => {
  const totalBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
  const totalSpent = projects.reduce((acc, curr) => acc + curr.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const formatThaiCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
  };

  // --- CALCULATE PIE CHART ---
  const pieChartData = projects.reduce((acc, project) => {
    let category = 'งบอุดหนุนรายหัว (PJ1)'; 
    if (project.id >= 300) category = 'งบกลาง (PJ3)';
    else if (project.id >= 200) category = 'งบพัฒนาผู้เรียน (PJ2)';
    else category = 'งบอุดหนุนรายหัว (PJ1)';

    const existing = acc.find(item => item.name === category);
    if (existing) existing.value += project.budget;
    else acc.push({ name: category, value: project.budget });
    return acc;
  }, [] as { name: string; value: number }[]);

  const order = ['งบอุดหนุนรายหัว (PJ1)', 'งบพัฒนาผู้เรียน (PJ2)', 'งบกลาง (PJ3)'];
  pieChartData.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  const CATEGORY_COLORS = ['#6A4DE8', '#D76EF5', '#FDBA74'];

  // --- CALCULATE MONTHLY CHART (FROM EXPENSES) ---
  // Fiscal Year 2569: Oct 2025 - Sep 2026
  const monthlyData = [
    { name: 'ต.ค. 68', month: 10, year: 2025, spending: 0 },
    { name: 'พ.ย. 68', month: 11, year: 2025, spending: 0 },
    { name: 'ธ.ค. 68', month: 12, year: 2025, spending: 0 },
    { name: 'ม.ค. 69', month: 1, year: 2026, spending: 0 },
    { name: 'ก.พ. 69', month: 2, year: 2026, spending: 0 },
    { name: 'มี.ค. 69', month: 3, year: 2026, spending: 0 },
    { name: 'เม.ย. 69', month: 4, year: 2026, spending: 0 },
    { name: 'พ.ค. 69', month: 5, year: 2026, spending: 0 },
    { name: 'มิ.ย. 69', month: 6, year: 2026, spending: 0 },
    { name: 'ก.ค. 69', month: 7, year: 2026, spending: 0 },
    { name: 'ส.ค. 69', month: 8, year: 2026, spending: 0 },
    { name: 'ก.ย. 69', month: 9, year: 2026, spending: 0 },
  ];

  // Aggregate actual expenses
  expenses.forEach(exp => {
      const d = new Date(exp.date); // Expect ISO string 'YYYY-MM-DD'
      const m = d.getMonth() + 1; // 1-12
      const y = d.getFullYear();
      
      const target = monthlyData.find(item => item.month === m && item.year === y);
      if (target) {
          target.spending += Number(exp.amount);
      }
  });

  const MONTHLY_COLORS = [
    '#6A4DE8', '#8B5CF6', '#D76EF5', '#F472B6', '#FB923C', '#FBBF24',
    '#34D399', '#2DD4BF', '#38BDF8', '#60A5FA', '#818CF8', '#A78BFA'
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
           <h2 className="text-3xl font-bold text-gray-800">ยินดีต้อนรับ, {username}</h2>
           <p className="text-gray-500 mt-1">ภาพรวมงบประมาณ โรงเรียนประจักษ์ศิลปาคม ปี 2569</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
            <span className="px-4 py-2 bg-white rounded-full shadow text-sm text-gray-600 font-medium">
                📅 วันนี้: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-gray-50 border-l-8 border-[#6A4DE8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">งบประมาณได้รับจัดสรร</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">{formatThaiCurrency(totalBudget)}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-2xl">
              <Wallet className="w-8 h-8 text-[#6A4DE8]" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 border-l-8 border-[#D76EF5]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">เบิกจ่ายไปแล้ว</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#D76EF5] mt-2">{formatThaiCurrency(totalSpent)}</h3>
              <p className="text-xs text-gray-400 mt-1">คิดเป็น {percentage.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-[#D76EF5]" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 border-l-8 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">คงเหลือสุทธิ</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-green-600 mt-2">{formatThaiCurrency(remaining)}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">เมนูด่วน</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {userRole === 'admin' && (
              <button onClick={() => setPage(Page.RECORD)} className="group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 text-center flex flex-col items-center justify-center gap-3">
                  <div className={`p-4 rounded-full ${THEME_GRADIENT} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <FilePlus2 size={32} />
                  </div>
                  <span className="font-semibold text-gray-700">บันทึกค่าใช้จ่าย</span>
              </button>
            )}
            <button onClick={() => setPage(Page.DASHBOARD)} className="group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 text-center flex flex-col items-center justify-center gap-3">
                <div className={`p-4 rounded-full ${THEME_GRADIENT} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <PieChart size={32} />
                </div>
                <span className="font-semibold text-gray-700">สรุปงบประมาณ</span>
            </button>
            {userRole === 'admin' && (
              <button onClick={() => setPage(Page.PROJECTS)} className="group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 text-center flex flex-col items-center justify-center gap-3">
                  <div className={`p-4 rounded-full ${THEME_GRADIENT} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <FolderCog size={32} />
                  </div>
                  <span className="font-semibold text-gray-700">จัดการโครงการ</span>
              </button>
            )}
            {userRole === 'admin' && (
              <button onClick={() => setPage(Page.REPORT)} className="group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 text-center flex flex-col items-center justify-center gap-3">
                  <div className={`p-4 rounded-full ${THEME_GRADIENT} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <FileText size={32} />
                  </div>
                  <span className="font-semibold text-gray-700">ออกรายงาน</span>
              </button>
            )}
            {userRole === 'admin' && (
              <button onClick={() => setPage(Page.ACCESS_LOGS)} className="group bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 text-center flex flex-col items-center justify-center gap-3">
                  <div className={`p-4 rounded-full ${THEME_GRADIENT} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Clock size={32} />
                  </div>
                  <span className="font-semibold text-gray-700">ประวัติการเข้าใช้งาน</span>
              </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="การเบิกจ่ายรายเดือน">
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="spending" radius={[4, 4, 0, 0]}>
                            {monthlyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={MONTHLY_COLORS[index % MONTHLY_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card title="สัดส่วนงบประมาณตามกลุ่มโครงการ">
            <div className="h-64 w-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                        <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px' }} formatter={(value: number) => formatThaiCurrency(value)} />
                        <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                    </RePieChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
