
import React, { useState, useEffect } from 'react';
import { Page, THEME_GRADIENT, Project, LogEntry } from './types';
import { MOCK_PROJECTS, MOCK_ACCESS_LOGS } from './constants';
import Home from './components/Home';
import RecordExpense from './components/RecordExpense';
import BudgetDashboard from './components/BudgetDashboard';
import ProjectManager from './components/ProjectManager';
import ReportExport from './components/ReportExport';
import AccessLogs from './components/AccessLogs';
import Login from './components/Login';
import { LayoutDashboard, PlusCircle, PieChart, FolderOpen, FileText, LogOut, Clock, Bell } from 'lucide-react';
import { api } from './services/api';

const LOGO_URL = "https://img5.pic.in.th/file/secure-sv1/5bc66fd0-c76e-41c4-87ed-46d11f4a36fa.png";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [currentUser, setCurrentUser] = useState('');

  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [accessLogs, setAccessLogs] = useState<LogEntry[]>(MOCK_ACCESS_LOGS);
  const [loading, setLoading] = useState(false);

  // Fetch Data from Google Sheets when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [pData, lData] = await Promise.all([
            api.getProjects(),
            api.getLogs()
          ]);
          
          // --- INTELLIGENT MERGE LOGIC ---
          // ถ้าข้อมูลจาก Sheet (pData) มีอยู่ ให้เอามาใช้
          // แต่ถ้าฟิลด์ไหนเป็น 0 หรือว่าง (เช่น budget หาย) ให้ดึงจาก MOCK_PROJECTS มาสำรองไว้
          if (pData && pData.length > 0) {
            const mergedProjects = pData.map((apiProject) => {
                // หาคู่ของมันใน Mock Data
                const mockProject = MOCK_PROJECTS.find(m => m.id === apiProject.id);
                
                if (mockProject) {
                    return {
                        ...apiProject,
                        // ถ้าชื่อใน Sheet ว่าง ให้ใช้ชื่อเดิม
                        name: apiProject.name || mockProject.name,
                        // ถ้างบประมาณใน Sheet เป็น 0 (ลืมใส่) ให้ใช้งบเดิมจาก Mock
                        budget: apiProject.budget > 0 ? apiProject.budget : mockProject.budget,
                        // ฟิลด์อื่นๆ ก็เช่นกัน
                        group: apiProject.group || mockProject.group,
                        category: apiProject.category || mockProject.category,
                        // ค่าใช้จ่าย (spent) ต้องยึดจาก Sheet เป็นหลักเสมอ (เพราะมีการอัปเดต)
                        spent: apiProject.spent
                    };
                }
                // ถ้าเป็นโครงการใหม่ที่ไม่มีใน Mock ก็ใช้ค่าจาก Sheet เลย
                return apiProject;
            });
            
            // ถ้าใน Sheet มีโครงการน้อยกว่า Mock (เช่น เพิ่งสร้าง Sheet ใหม่มีแค่ 1 แถว)
            // เราอาจจะอยากเติมโครงการที่เหลือจาก Mock เข้าไปแสดงด้วย (Optional)
            // ในที่นี้เราจะใช้ mergedProjects เป็นหลัก
            setProjects(mergedProjects);
          } else {
             // ถ้า Sheet ว่างเปล่าเลย ให้ใช้ Mock ทั้งหมด
             setProjects(MOCK_PROJECTS);
          }

          if (lData && lData.length > 0) {
            setAccessLogs(lData);
          }
        } catch (error) {
          console.error("Failed to fetch data from Google Sheets", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (role: 'admin' | 'user', name: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentUser(name);
  };

  const handleRecordLog = (username: string, role: 'admin' | 'user' | 'unknown', status: 'Success' | 'Failed') => {
      const newLog: LogEntry = {
          id: Date.now(), 
          timestamp: new Date().toISOString(),
          username,
          role,
          status
      };
      setAccessLogs(prev => [newLog, ...prev]);
      api.recordLog(newLog);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser('');
    setCurrentPage(Page.HOME);
  };

  // Define all navigation items
  const allNavItems = [
    { page: Page.HOME, label: 'หน้าแรก', icon: <LayoutDashboard size={20} /> },
    { page: Page.RECORD, label: 'บันทึกค่าใช้จ่าย', icon: <PlusCircle size={20} /> },
    { page: Page.DASHBOARD, label: 'สรุปงบประมาณ', icon: <PieChart size={20} /> },
    { page: Page.PROJECTS, label: 'จัดการโครงการ', icon: <FolderOpen size={20} /> },
    { page: Page.REPORT, label: 'ออกรายงาน', icon: <FileText size={20} /> },
    { page: Page.ACCESS_LOGS, label: 'ประวัติการใช้งาน', icon: <Clock size={20} /> },
  ];

  const navItems = userRole === 'user' 
    ? allNavItems.filter(item => [Page.HOME, Page.DASHBOARD].includes(item.page))
    : allNavItems;

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    await api.updateProject(updatedProject);
  };
  
  const handleAddProject = async (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    await api.addProject(newProject);
  };

  const handleDeleteProject = async (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    await api.deleteProject(id);
  };

  // Handle recording expenses with verification
  const handleRecordExpense = async (projectId: number, amount: number): Promise<boolean> => {
    // Call API First to verify
    const result = await api.recordExpense(projectId, amount);
    
    if (result && result.status === 'success') {
        // If success, update UI
        setProjects(prev => prev.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              spent: p.spent + amount,
              status: (p.spent + amount) > p.budget ? 'Warning' : p.status
            };
          }
          return p;
        }));
        return true;
    } else {
        console.error("Record expense failed:", result);
        return false;
    }
  };

  const getPageTitle = () => {
      const item = allNavItems.find(i => i.page === currentPage);
      return item ? item.label : 'หน้าแรก';
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">กำลังเชื่อมต่อฐานข้อมูล...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case Page.HOME: 
        return <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
      case Page.RECORD: 
        return userRole === 'admin' ? (
          <RecordExpense 
            projects={projects} 
            onRecord={handleRecordExpense}
          />
        ) : <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
      case Page.DASHBOARD: 
        return <BudgetDashboard projects={projects} />;
      case Page.PROJECTS: 
        return userRole === 'admin' ? (
          <ProjectManager 
            projects={projects} 
            onUpdate={handleUpdateProject} 
            onAdd={handleAddProject}
            onDelete={handleDeleteProject}
          />
        ) : <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
      case Page.REPORT: 
        return userRole === 'admin' ? <ReportExport projects={projects} /> : <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
      case Page.ACCESS_LOGS:
        return userRole === 'admin' ? <AccessLogs logs={accessLogs} /> : <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
      default: 
        return <Home setPage={handleNavClick} projects={projects} username={currentUser} userRole={userRole} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onRecordLog={handleRecordLog} />;
  }

  return (
    <div className="flex h-screen bg-[#F7F9FC] font-sans overflow-hidden">
      
      {/* SIDEBAR (Permanent Left Bar) */}
      <aside className="flex w-72 bg-white border-r border-gray-200 flex-col shadow-xl z-20 flex-shrink-0">
         {/* Sidebar Header / Logo */}
         <div className="h-24 flex items-center gap-3 px-6 border-b border-gray-100">
             <img src={LOGO_URL} alt="Logo" className="w-12 h-12 object-contain" />
             <div>
                 <h1 className="font-bold text-lg text-gray-800 leading-tight">Prajak Budget</h1>
                 <span className="text-xs text-purple-600 font-bold tracking-wider">ปีงบประมาณ 2569</span>
             </div>
         </div>

         {/* Navigation */}
         <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
                <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        currentPage === item.page 
                        ? `${THEME_GRADIENT} text-white shadow-lg shadow-purple-200` 
                        : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
         </nav>

         {/* Sidebar Footer */}
         <div className="p-4 border-t border-gray-100">
             <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    {currentUser.charAt(0)}
                 </div>
                 <div className="overflow-hidden">
                     <p className="text-sm font-bold text-gray-700 truncate">{currentUser}</p>
                     <p className="text-xs text-gray-500">{userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}</p>
                 </div>
             </div>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0">
          
          {/* TOP HEADER (Sticky) */}
          <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
              <div>
                  <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
                  <p className="text-sm text-gray-500 hidden sm:block">ระบบติดตามงบประมาณ โรงเรียนประจักษ์ศิลปาคม</p>
              </div>
              
              <div className="flex items-center gap-4">
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors relative">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <div className="h-8 w-px bg-gray-200 mx-2"></div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                      <LogOut size={18} />
                      <span className="hidden sm:inline">ออกจากระบบ</span>
                  </button>
              </div>
          </header>

          {/* SCROLLABLE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
              {renderContent()}
              
              <div className="h-8"></div> {/* Spacer */}
          </main>

      </div>

    </div>
  );
};

export default App;
