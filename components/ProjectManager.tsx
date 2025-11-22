
import React, { useState } from 'react';
import { THEME_GRADIENT, Project } from '../types';
import { Plus, Edit, Trash2, X, Save, Wallet } from 'lucide-react';

interface ProjectManagerProps {
  projects: Project[];
  onUpdate: (project: Project) => void;
  onAdd: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ projects, onUpdate, onAdd, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    group: 'กลุ่มบริหารวิชาการ',
    owner: '',
    budget: '', 
    category: 'งบดำเนินงาน',
    status: 'Active',
    spent: ''
  });

  // Default form state helper
  const defaultFormState = {
     name: '',
     group: 'กลุ่มบริหารวิชาการ',
     owner: '',
     budget: '',
     category: 'งบดำเนินงาน',
     status: 'Active',
     spent: ''
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setFormData(defaultFormState); // Set empty form directly
    setShowModal(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    // Set form data directly from project, using safety checks
    setFormData({
        name: project.name || '',
        group: project.group || 'กลุ่มบริหารวิชาการ',
        owner: project.owner || '',
        budget: (project.budget || 0).toString(),
        category: project.category || 'งบดำเนินงาน',
        status: project.status || 'Active',
        spent: (project.spent || 0).toString()
    });
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse numbers safely
    const budgetNum = parseFloat(formData.budget) || 0;
    const spentNum = parseFloat(formData.spent) || 0;

    const finalData = {
        name: formData.name,
        group: formData.group,
        owner: formData.owner,
        budget: budgetNum,
        category: formData.category,
        status: formData.status as 'Active' | 'Closed' | 'Warning',
        spent: spentNum
    };

    if (editingProject) {
        // UPDATE existing project
        onUpdate({ 
            ...finalData, 
            id: editingProject.id 
        });
    } else {
        // ADD new project
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 101;
        onAdd({ 
            ...finalData, 
            id: newId 
        });
    }
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">จัดการโครงการ</h2>
            <p className="text-sm text-gray-500 mt-1">เพิ่ม ลบ หรือแก้ไขรายละเอียดโครงการและงบประมาณ</p>
        </div>
        <button 
            onClick={handleAddClick}
            className={`${THEME_GRADIENT} text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:opacity-90 transition-all transform hover:scale-105`}
        >
            <Plus size={20} /> เพิ่มโครงการใหม่
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 relative group flex flex-col h-full">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg 
                        ${project.category.includes('ลงทุน') ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                    `}>
                        {project.category}
                    </span>
                    <div className="flex gap-1">
                         <button 
                            onClick={() => handleEditClick(project)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                            title="แก้ไข"
                         >
                            <Edit size={18} />
                         </button>
                         <button 
                            onClick={() => { if(window.confirm(`ยืนยันการลบโครงการ "${project.name}"?`)) onDelete(project.id); }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="ลบ"
                         >
                            <Trash2 size={18} />
                         </button>
                    </div>
                </div>

                {/* Project Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">{project.name}</h3>
                
                <div className="flex-grow">
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                        {project.group}
                    </p>
                    
                    {/* Financial Stats */}
                    <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">งบประมาณ:</span>
                            <span className="font-bold text-gray-800">{project.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">ใช้ไป:</span>
                            <span className={`font-bold ${project.spent > project.budget ? 'text-red-500' : 'text-gray-600'}`}>
                                {project.spent.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                            <span className="text-gray-500">คงเหลือ:</span>
                            <span className={`font-bold ${(project.budget - project.spent) < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                {(project.budget - project.spent).toLocaleString()}
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div 
                                className={`h-1.5 rounded-full ${THEME_GRADIENT}`} 
                                style={{ width: `${project.budget > 0 ? Math.min((project.spent / project.budget) * 100, 100) : 0}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                {/* Footer Status */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full border flex items-center gap-1 ${
                        project.status === 'Active' ? 'border-green-200 text-green-700 bg-green-50' : 
                        project.status === 'Closed' ? 'border-gray-200 text-gray-600 bg-gray-50' :
                        'border-orange-200 text-orange-700 bg-orange-50'
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'Active' ? 'bg-green-500' : 
                            project.status === 'Closed' ? 'bg-gray-500' : 'bg-orange-500'
                        }`}></span>
                        {project.status === 'Active' ? 'ดำเนินงาน' : project.status === 'Closed' ? 'ปิดโครงการ' : 'เฝ้าระวัง'}
                    </span>
                    <span className="text-xs text-gray-400">ID: {project.id}</span>
                </div>
            </div>
        ))}
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative animate-scale-up overflow-y-auto max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {editingProject ? <Edit className="text-purple-500" /> : <Plus className="text-purple-500" />}
                        {editingProject ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}
                    </h3>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อโครงการ</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm" 
                            placeholder="ระบุชื่อโครงการ" 
                        />
                    </div>
                    
                    {/* Groups & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">กลุ่มงาน</label>
                            <select 
                                name="group"
                                value={formData.group}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
                            >
                                <option value="กลุ่มบริหารวิชาการ">กลุ่มบริหารวิชาการ</option>
                                <option value="กลุ่มบริหารงบประมาณ">กลุ่มบริหารงบประมาณ</option>
                                <option value="กลุ่มบริหารงานบุคคล">กลุ่มบริหารงานบุคคล</option>
                                <option value="กลุ่มบริหารทั่วไป">กลุ่มบริหารทั่วไป</option>
                                <option value="กลุ่มกิจการนักเรียน">กลุ่มกิจการนักเรียน</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">หมวดเงิน</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
                            >
                                <option value="งบดำเนินงาน">งบดำเนินงาน</option>
                                <option value="งบลงทุน">งบลงทุน</option>
                                <option value="งบอุดหนุน">งบอุดหนุน</option>
                                <option value="งบกิจกรรมพัฒนาผู้เรียน">งบกิจกรรมพัฒนาผู้เรียน</option>
                                <option value="งบกลาง">งบกลาง</option>
                            </select>
                        </div>
                    </div>

                    {/* Owner */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ผู้รับผิดชอบ</label>
                        <input 
                            type="text" 
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm" 
                            placeholder="ระบุชื่อ-สกุล ครูผู้รับผิดชอบ" 
                        />
                    </div>

                    {/* Financials */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Wallet size={64} className="text-purple-600" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-600 mb-4 flex items-center gap-2 relative z-10">
                            <span className="w-1 h-4 bg-purple-500 rounded-full"></span> ข้อมูลทางการเงิน
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">งบประมาณที่ได้รับ (บาท)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm font-mono text-gray-800" 
                                        placeholder="0.00" 
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400 text-sm">THB</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ใช้จ่ายไปแล้ว (บาท)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        name="spent"
                                        value={formData.spent}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none shadow-sm font-mono text-red-600" 
                                        placeholder="0.00" 
                                    />
                                    <span className="absolute right-4 top-3 text-gray-400 text-sm">THB</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">* ระบุยอดใช้จ่ายสะสมเพื่อปรับปรุงข้อมูล</p>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">สถานะโครงการ</label>
                        <div className="flex gap-4">
                            {['Active', 'Closed', 'Warning'].map((statusOption) => (
                                <label key={statusOption} className={`flex-1 cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${
                                    formData.status === statusOption 
                                    ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="status" 
                                        value={statusOption}
                                        checked={formData.status === statusOption}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className={`w-2 h-2 rounded-full ${
                                        statusOption === 'Active' ? 'bg-green-500' : 
                                        statusOption === 'Closed' ? 'bg-gray-500' : 'bg-orange-500'
                                    }`}></span>
                                    {statusOption === 'Active' ? 'ดำเนินงาน' : 
                                     statusOption === 'Closed' ? 'ปิดโครงการ' : 'เฝ้าระวัง'}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-4">
                         <button 
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 py-3 rounded-2xl text-gray-700 font-bold border border-gray-300 hover:bg-gray-50 transition-all"
                        >
                            ยกเลิก
                        </button>
                        <button 
                            type="submit" 
                            className={`flex-1 py-3 rounded-2xl text-white font-bold ${THEME_GRADIENT} shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2`}
                        >
                            <Save size={20} />
                            {editingProject ? 'บันทึกการแก้ไข' : 'สร้างโครงการ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
    