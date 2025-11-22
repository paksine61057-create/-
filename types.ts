
export enum Page {
  HOME = 'HOME',
  RECORD = 'RECORD',
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  REPORT = 'REPORT',
  ACCESS_LOGS = 'ACCESS_LOGS'
}

export interface Project {
  id: number;
  name: string;
  group: string; // กลุ่มงาน
  owner: string; // ผู้รับผิดชอบ
  budget: number;
  spent: number;
  category: string; // หมวดเงิน
  status: 'Active' | 'Closed' | 'Warning';
}

export interface ExpenseLog {
  id: number;
  projectId: number;
  description: string;
  date: string;
  amount: number;
  note?: string;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  username: string;
  role: 'admin' | 'user' | 'unknown';
  status: 'Success' | 'Failed';
}

export const THEME_GRADIENT = "bg-gradient-to-r from-[#6A4DE8] to-[#D76EF5]";
export const TEXT_GRADIENT = "bg-clip-text text-transparent bg-gradient-to-r from-[#6A4DE8] to-[#D76EF5]";
export const HOVER_GRADIENT = "hover:bg-gradient-to-r hover:from-[#583dd1] hover:to-[#c55ee0]";
