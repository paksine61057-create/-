
import React, { useState, useEffect } from 'react';
import { THEME_GRADIENT, Project } from '../types';
import { Card } from './ui/Card';
import { Plus, Edit, Trash2, MoreVertical, X } from 'lucide-react';

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
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    group: 'วิชาการ',
    owner: '',
    budget: 0,
    category: 'งบดำเนินงาน',
    status: 'Active',
    spent: 0
  });

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    } else {
      setFormData({
         name: '',
         group: 'กลุ่มบริหารวิชาการ',
         owner: '',
         budget: 0,
         category: 'งบดำเนินงาน',
         status: 'Active',
         spent: 0
      });
    }
  }, [editingProject, showModal]);

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
        // Update existing
        onUpdate({ ...editingProject, ...formData } as Project);
    } else {
        // Add new
        const newId = Math.max(...projects.map(p => p.id)) + 1;
        onAdd({ ...formData, id: newId } as Project);
    }
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: name === 'budget' ? Number(value) : value
      }));
  };

  return (
    <div className="animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">จัดการโครงการ</h2>
        <button 
            onClick={handleAddClick}
            className={`${THEME_GRADIENT} text-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:opacity-90 transition-all`}
        >
            <Plus size={20} /> เพิ่มโครงการใหม่
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 relative group">
                <div className="absolute top-6 right-6">
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                    </button>
                </div>
                
                <div className="mb-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg 
                        ${project.category.includes('ลงทุน') ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                    `}>
                        {project.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 h-14">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{project.group} | {project.owner}</p>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">งบประมาณ:</span>
                        <span className="font-bold text-gray-800">{project.budget.toLocaleString()} บ.</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ใช้ไป:</span>
                        <span className="font-bold text-red-500">{project.spent.toLocaleString()} บ.</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${THEME_GRADIENT}`} 
                            style={{ width: `${project.budget > 0 ? (project.spent / project.budget) * 100 : 0}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-6 flex gap-2 border-t pt-4">
                     <button 
                        onClick={() => handleEditClick(project)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors"
                     >
                        <Edit size={16} /> แก้ไข
                     </button>
                     <button 
                        onClick={() => { if(window.confirm('ยืนยันการลบโครงการ?')) onDelete(project.id); }}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 border border-red-100 transition-colors"
                     >
                        <Trash2 size={16} /> ลบ
                     </button>
                </div>
            </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative animate-scale-up overflow-y-auto max-h-[90vh]">
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    {editingProject ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อโครงการ</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                            placeholder="ระบุชื่อโครงการ" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">กลุ่มงาน</label>
                            <select 
                                name="group"
                                value={formData.group}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                            >
                                <option value="กลุ่มบริหารวิชาการ">กลุ่มบริหารวิชาการ</option>
                                <option value="กลุ่มบริหารงบประมาณ">กลุ่มบริหารงบประมาณ</option>
                                <option value="กลุ่มบริหารงานบุคคล">กลุ่มบริหารงานบุคคล</option>
                                <option value="กลุ่มบริหารทั่วไป">กลุ่มบริหารทั่วไป</option>
                                <option value="กลุ่มกิจการนักเรียน">กลุ่มกิจการนักเรียน</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ปีงบประมาณ</label>
                            <input type="text" value="2569" disabled className="w-full border border-gray-300 bg-gray-100 rounded-xl px-4 py-2 text-gray-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ผู้รับผิดชอบ</label>
                        <input 
                            type="text" 
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                            placeholder="ชื่อ-สกุล ครูผู้รับผิดชอบ" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">งบประมาณ (บาท)</label>
                            <input 
                                type="number" 
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none" 
                                placeholder="0.00" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">หมวดเงิน</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                            >
                                <option value="งบดำเนินงาน">งบดำเนินงาน</option>
                                <option value="งบลงทุน">งบลงทุน</option>
                                <option value="งบอุดหนุน">งบอุดหนุน</option>
                                <option value="งบกิจกรรมพัฒนาผู้เรียน">งบกิจกรรมพัฒนาผู้เรียน</option>
                                <option value="งบกลาง">งบกลาง</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">สถานะโครงการ</label>
                        <select 
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none"
                        >
                            <option value="Active">Active (ดำเนินการ)</option>
                            <option value="Closed">Closed (ปิดโครงการ)</option>
                            <option value="Warning">Warning (เฝ้าระวัง)</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className={`w-full py-3 rounded-2xl text-white font-bold ${THEME_GRADIENT} shadow-lg hover:shadow-xl transition-all`}>
                            {editingProject ? 'บันทึกการแก้ไข' : 'บันทึกโครงการ'}
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
