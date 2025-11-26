
import { Project, LogEntry } from '../types';

// URL ของ Google Web App (API)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWK7KbOYEDRfDCxepelHSeF4NzJwlDS1V2DVst4xclE7ekDcNcDNiufk4dwXjKIBl4JQ/exec";

export const api = {
  // --- AUTH ---
  login: async (username, password) => {
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      return await res.json();
    } catch (e) {
      return { status: 'error', message: 'Connection failed' };
    }
  },

  changePassword: async (username, oldPassword, newPassword) => {
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'changePassword', username, oldPassword, newPassword }),
      });
      return await res.json();
    } catch (e) {
      return { status: 'error', message: 'Connection failed' };
    }
  },

  // --- DATA ---
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getProjects`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },
  
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

  // --- ACTIONS ---
  addProject: async (project: Project) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'addProject', payload: project }),
      });
    } catch (e) {
      console.error("Error adding project:", e);
    }
  },

  updateProject: async (project: Project) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'updateProject', payload: project }),
      });
    } catch (e) {
      console.error("Error updating project:", e);
    }
  },
  
  deleteProject: async (id: number) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'deleteProject', id: id }),
      });
    } catch (e) {
      console.error("Error deleting project:", e);
    }
  },

  recordExpense: async (projectId: number, amount: number) => {
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'recordExpense', projectId, amount }),
      });
      return await res.json();
    } catch (e) {
      console.error("Error recording expense:", e);
      return { status: 'error', message: 'Network Error' };
    }
  },
  
  recordLog: async (log: LogEntry) => {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ action: 'recordLog', payload: log }),
    }).catch(e => console.error("Log error", e));
  }
};
