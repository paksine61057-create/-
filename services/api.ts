
import { Project, LogEntry } from '../types';

// URL ของ Google Web App ที่คุณให้มา
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWK7KbOYEDRfDCxepelHSeF4NzJwlDS1V2DVst4xclE7ekDcNcDNiufk4dwXjKIBl4JQ/exec";

export const api = {
  // ดึงข้อมูลโครงการทั้งหมด
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getProjects`);
      const data = await response.json();
      // ตรวจสอบว่า data เป็น array หรือไม่
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },
  
  // ดึงข้อมูลประวัติการใช้งาน
  getLogs: async (): Promise<LogEntry[]> => {
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getLogs`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching logs:", error);
      return [];
    }
  },

  // เพิ่มโครงการใหม่
  addProject: async (project: Project) => {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" }, // ใช้ text/plain เพื่อเลี่ยง CORS Preflight
      body: JSON.stringify({ action: 'addProject', payload: project }),
    });
  },

  // อัปเดตโครงการ (แก้ไข)
  updateProject: async (project: Project) => {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'updateProject', payload: project }),
    });
  },
  
  // ลบโครงการ
  deleteProject: async (id: number) => {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'deleteProject', id: id }),
    });
  },

  // บันทึกค่าใช้จ่าย (อัปเดตยอด spent)
  recordExpense: async (projectId: number, amount: number) => {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'recordExpense', projectId, amount }),
    });
  },
  
  // บันทึก Log
  recordLog: async (log: LogEntry) => {
    // ส่งแบบไม่รอ (Fire and forget) เพื่อไม่ให้หน้าเว็บหน่วง
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'recordLog', payload: log }),
    }).catch(e => console.error("Log error", e));
  }
};
