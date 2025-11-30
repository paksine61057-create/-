
import React, { useState, useEffect } from 'react';
import { Page, THEME_GRADIENT, Project, LogEntry, Expense } from './types';
import { MOCK_PROJECTS, MOCK_ACCESS_LOGS } from './constants';
import Home from './components/Home';
import RecordExpense from './components/RecordExpense';
import BudgetDashboard from './components/BudgetDashboard';
import ProjectManager from './components/ProjectManager';
import ReportExport from './components/ReportExport';
import AccessLogs from './components/AccessLogs';
import Login from './components/Login';
import ChangePasswordModal from './components/ChangePasswordModal';
import { LayoutDashboard, PlusCircle, PieChart, FolderOpen, FileText, LogOut, Clock, Bell, LockKeyhole } from 'lucide-react';
import { api } from './services/api';

const LOGO_URL = "https://img5.pic.in.th/file/secure-sv1/5bc66fd0-c76e-41c4-87ed-46d11f4a36fa.png";

// Define Junsri Colors (Teal Theme) based on specific request
const SIDEBAR_BG = "bg-teal-700"; 
const HEADER_BG = "bg-teal-600"; 
const ACTIVE_ITEM_BG = "bg-teal-800"; // Darker for active state
const HOVER_ITEM_BG = "hover:bg-teal-600";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [currentUser, setCurrentUser] = useState('');
  const [currentUsername, setCurrentUsername] = useState(''); 

  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [accessLogs, setAccessLogs] = useState<LogEntry[]>(MOCK_ACCESS_LOGS);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Fetch Data from Google Sheets when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [pData, lData, eData] = await Promise.all([
            api.getProjects(),
            api.getLogs(),
            api.getExpenses()
          ]);
          
          // --- INTELLIGENT MERGE LOGIC ---
          if (pData && pData.length > 0) {
            const mergedProjects = pData.map((apiProject) => {
                const mockProject = MOCK_PROJECTS.find(m => m.id === apiProject.id);
                
                if (mockProject) {
                    return {
                        ...apiProject,
                        name: apiProject.name || mockProject.name,
                        budget: apiProject.budget > 0 ? apiProject.budget : mockProject.budget,
                        group: apiProject.group || mockProject.group,
                        category: apiProject.category || mockProject.category,
                        spent: apiProject.spent
                    };
                }
                return apiProject;
            });
            setProjects(mergedProjects);
          } else {
             setProjects(MOCK_PROJECTS);
          }

          if (lData && lData.length > 0) setAccessLogs(lData);
          if (eData && eData.length > 0) setExpenses(eData);

        } catch (error) {
          console.error("Failed to fetch data from Google Sheets", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (role: 'admin' | 'user', name: string, username: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentUser(name);
    setCurrentUsername(username);
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
    setCurrentUsername('');
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

  const handleRecordExpense = async (projectId: number, amount: number, date: string, item: string): Promise<boolean> => {
    const result = await api.recordExpense(projectId, amount, date, item);
    
    if (result && result.status === 'success') {
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
        setExpenses(prev => [...prev, { date, amount, projectId, item }]);
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
            <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">กำลังเชื่อมต่อฐานข้อมูล...</p>
          </div>
        </div>
      );
    }

    const commonProps = { projects, expenses, username: currentUser, userRole };

    switch (currentPage) {
      case Page.HOME: 
        return <Home setPage={handleNavClick} {...commonProps} />;
      case Page.RECORD: 
        return userRole === 'admin' ? (
          <RecordExpense projects={projects} onRecord={handleRecordExpense} />
        ) : <Home setPage={handleNavClick} {...commonProps} />;
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
        ) : <Home setPage={handleNavClick} {...commonProps} />;
      case Page.REPORT: 
        return userRole === 'admin' ? <ReportExport projects={projects} /> : <Home setPage={handleNavClick} {...commonProps} />;
      case Page.ACCESS_LOGS:
        return userRole === 'admin' ? <AccessLogs logs={accessLogs} /> : <Home setPage={handleNavClick} {...commonProps} />;
      default: 
        return <Home setPage={handleNavClick} {...commonProps} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} onRecordLog={handleRecordLog} />;
  }

  return (
    <div className="flex h-screen bg-[#E2E4E8] font-sans overflow-hidden print:overflow-visible">
      
      {/* SIDEBAR (JUNSRI THEME - Teal-700) */}
      <aside className={`flex w-72 ${SIDEBAR_BG} text-white border-r border-teal-800 flex-col shadow-xl z-20 flex-shrink-0 print:hidden`}>
         <div className="h-24 flex items-center gap-3 px-6 border-b border-teal-600">
             {/* Logo with White Circle Background */}
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <img src={LOGO_URL} alt="Logo" className="w-10 h-10 object-contain" />
             </div>
             <div>
                 <h1 className="font-bold text-lg leading-tight text-white">Prajak Budget</h1>
                 <span className="text-xs text-teal-200 font-medium tracking-wider">ปีงบประมาณ 2569</span>
             </div>
         </div>

         <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
                <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        currentPage === item.page 
                        ? `${ACTIVE_ITEM_BG} text-white shadow-lg` 
                        : `text-teal-100 ${HOVER_ITEM_BG} hover:text-white`
                    }`}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
         </nav>

         <div className="p-4 border-t border-teal-600">
             <div className="bg-teal-900/40 rounded-xl p-4 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold border-2 border-teal-400">
                    {currentUser.charAt(0)}
                 </div>
                 <div className="overflow-hidden">
                     <p className="text-sm font-bold text-white truncate">{currentUser}</p>
                     <p className="text-xs text-teal-200">{userRole === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}</p>
                 </div>
             </div>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 print:overflow-visible print:h-auto">
          
          {/* HEADER (JUNSRI THEME - Teal-600) */}
          <header className={`h-20 ${HEADER_BG} text-white shadow-md flex items-center justify-between px-8 sticky top-0 z-10 print:hidden`}>
              <div>
                  <h2 className="text-2xl font-bold">{getPageTitle()}</h2>
                  <p className="text-sm text-teal-100 hidden sm:block">ระบบติดตามงบประมาณ โรงเรียนประจักษ์ศิลปาคม</p>
              </div>
              
              <div className="flex items-center gap-3">
                  <button className="p-2 text-teal-100 hover:text-white hover:bg-teal-500 rounded-full transition-colors relative">
                      <Bell size={20} />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-teal-600"></span>
                  </button>
                  
                  <div className="h-8 w-px bg-teal-500 mx-1"></div>

                  <button 
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="p-2 text-teal-100 hover:text-white hover:bg-teal-500 rounded-full transition-colors"
                    title="เปลี่ยนรหัสผ่าน"
                  >
                      <LockKeyhole size={20} />
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-teal-100 hover:text-white px-3 py-2 rounded-lg hover:bg-teal-800/50 transition-colors"
                  >
                      <LogOut size={18} />
                      <span className="hidden sm:inline">ออกจากระบบ</span>
                  </button>
              </div>
          </header>

          {/* SCROLLABLE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 print:overflow-visible print:p-0">
              {renderContent()}
              <div className="h-8 print:hidden"></div>
          </main>

      </div>

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen} 
        onClose={() => setIsChangePasswordOpen(false)} 
        username={currentUsername}
      />

    </div>
  );
};

export default App;
