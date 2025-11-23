
import { Project, LogEntry } from '../types';

// URL ของ Google Web App (API)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWK7KbOYEDRfDCxepelHSeF4NzJwlDS1V2DVst4xclE7ekDcNcDNiufk4dwXjKIBl4JQ/exec";

export const api = {
  // ดึงข้อมูลโครงการทั้งหมด
  getProjects: async (): Promise<Project[]> => {
    try {
      console.log("Fetching projects...");
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getProjects`);
      const data = await response.json();
      console.log("Projects fetched:", data);
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
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'addProject', payload: project }),
      });
      console.log("Project added successfully");
    } catch (e) {
      console.error("Error adding project:", e);
    }
  },

  // อัปเดตโครงการ (แก้ไข)
  updateProject: async (project: Project) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'updateProject', payload: project }),
      });
      console.log("Project updated successfully");
    } catch (e) {
      console.error("Error updating project:", e);
    }
  },
  
  // ลบโครงการ
  deleteProject: async (id: number) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'deleteProject', id: id }),
      });
      console.log("Project deleted successfully");
    } catch (e) {
      console.error("Error deleting project:", e);
    }
  },

  // บันทึกค่าใช้จ่าย (อัปเดตยอด spent)
  recordExpense: async (projectId: number, amount: number) => {
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'recordExpense', projectId, amount }),
      });
      const text = await res.text();
      console.log("Expense recorded:", text);
    } catch (e) {
      console.error("Error recording expense:", e);
    }
  },
  
  // บันทึก Log
  recordLog: async (log: LogEntry) => {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'recordLog', payload: log }),
    }).catch(e => console.error("Log error", e));
  }
};
