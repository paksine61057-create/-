
import { Project, LogEntry } from './types';

export const MOCK_ACCESS_LOGS: LogEntry[] = [];

export const MOCK_PROJECTS: Project[] = [
  // --- PJ1 Series: งบดำเนินงาน / บริหารงานทั่วไป ---
  {
    id: 101,
    name: "[PJ1-1] จัดซื้อวัสดุการจัดการเรียนการสอนทุกกลุ่มสาระ",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 50356,
    spent: 0,
    category: "งบอุดหนุน",
    status: "Active"
  },
  {
    id: 102,
    name: "[PJ1-2] โครงการค่าใช้จ่ายสาธารณูปโภค (ค่าไฟฟ้า ค่าอินเทอร์เน็ต)",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 283500,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 103,
    name: "[PJ1-3] โครงการจัดซื้อวัสดุ อุปกรณ์ เพื่อเพิ่มประสิทธิภาพการทำงานและสนับสนุนงาน",
    group: "กลุ่มบริหารงบประมาณ",
    owner: "ไม่ระบุ",
    budget: 22000,
    spent: 0,
    category: "งบลงทุน",
    status: "Active"
  },
  {
    id: 104,
    name: "[PJ1-4] โครงการจัดทำแผนปฏิบัติการประจำปี",
    group: "กลุ่มบริหารงบประมาณ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 105,
    name: "[PJ1-5] โครงการส่งเสริมระเบียบวินัยในโรงเรียน",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 106,
    name: "[PJ1-6] โครงการจัดซื้อเวทีอเนกประสงค์เพื่อพัฒนาศักยภาพนักเรียนและสนับสนุนกิจกรรมโรงเรียน",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบลงทุน",
    status: "Closed"
  },
  {
    id: 107,
    name: "[PJ1-7] โครงการจัดซื้ออุปกรณ์ถ่ายภาพ",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 6000,
    spent: 0,
    category: "งบลงทุน",
    status: "Active"
  },
  {
    id: 108,
    name: "[PJ1-8] โครงการประชุมกรรมการสถานศึกษา",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 109,
    name: "[PJ1-9] โครงการจัดหาสื่อและเทคโนโลยีสำหรับ ครู นักเรียนและบุคลากรทางการศึกษา",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 75000,
    spent: 0,
    category: "งบอุดหนุน",
    status: "Active"
  },
  {
    id: 110,
    name: "[PJ1-10] โครงการจัดซื้อยา และเวชภัณฑ์",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 4105,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 111,
    name: "[PJ1-11] โครงการจัดซื้อวัสดุอุปกรณ์ทำความสะอาด",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 112,
    name: "[PJ1-12] โครงการรับนักเรียนปีการศึกษา 2569",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 113,
    name: "[PJ1-13] กิจกรรมวันสถาปนาโรงเรียน และบวงสรวงกรมหลวงประจักษ์",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 8000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 114,
    name: "[PJ1-14] โครงการปรับปรุงภูมิทัศน์ภายในโรงเรียนและปรับปรุงซ่อมแซมห้องเรียน ห้องปฏิบัติการ",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 20000,
    spent: 0,
    category: "งบลงทุน",
    status: "Active"
  },
  {
    id: 115,
    name: "[PJ1-15] โครงการเยี่ยมบ้านนักเรียน",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 18000,
    spent: 0,
    category: "งบเงินอุดหนุน",
    status: "Active"
  },
  {
    id: 116,
    name: "[PJ1-16] โครงการประชุมผู้ปกครองชั้นเรียน",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 7000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 117,
    name: "[PJ1-17] โครงการพัฒนาบุคลากร(ดูงาน)",
    group: "กลุ่มบริหารงานบุคคล",
    owner: "ไม่ระบุ",
    budget: 40000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 118,
    name: "[PJ1-18] โครงการพัฒนาครูต้นแบบ",
    group: "กลุ่มบริหารงานบุคคล",
    owner: "ไม่ระบุ",
    budget: 5356,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 119,
    name: "[PJ1-19] โครงการเสริมประสิทธิภาพการจัดการเรียนการสอน",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 314000,
    spent: 0,
    category: "งบอุดหนุน",
    status: "Active"
  },
  {
    id: 120,
    name: "[PJ1-20] โครงการยกระดับ ผลการเรียนรู้วิชาวิทยาการคำนวณ/การออกแบบและเทคโนโลยี",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 121,
    name: "[PJ1-21] โครงการปัจฉิมนิเทศ ม.3 และ ม.6",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 13000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 122,
    name: "[PJ1-22] โครงการ เปิดบ้านวิชาการ(Open House)",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Closed"
  },
  {
    id: 123,
    name: "[PJ1-23] โครงการพัฒนาโรงเรียนสุจริต",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 124,
    name: "[PJ1-24] โครงการแนะแนวเพื่อศึกษาต่อ (ม1,ม4)",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 10000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 125,
    name: "[PJ1-25] โครงการประกันคุณภาพการศึกษา",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 126,
    name: "[PJ1-26] โครงการพัฒนาหลักสูตร",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 127,
    name: "[PJ1-27] โครงการแก้ไขผลการเรียน 0 ร มส. Mission: Clear All Grades",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 128,
    name: "[PJ1-28] โครงการสวนพฤกษศาสตร์",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 129,
    name: "[PJ1-29] โครงการปฐมนิเทศนักเรียน",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3500,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 130,
    name: "[PJ1-30] โครงการนิเทศการสอน",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 131,
    name: "[PJ1-31] โครงการพัฒนาโรงเรียนด้วยเทคโนโลยีดิจิทัลและนวัตกรรมการศึกษา",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 11850,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 132,
    name: "[PJ1-32] โครงการ ห้องสมุดมีชีวิต",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 133,
    name: "[PJ1-33] โครงการจัดหาสื่อและเทคโนโลยีเพื่อพัฒนาคุณภาพผู้เรียน",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 20000,
    spent: 0,
    category: "งบอุดหนุน",
    status: "Active"
  },
  {
    id: 134,
    name: "[PJ1-34] โครงการสถานศึกษาปลอดบุหรี่",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 2000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 135,
    name: "[PJ1-35] โครงการสถานศึกษาสีขาว",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 136,
    name: "[PJ1-36] โครงการ TO BE NUMBER ONE",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 137,
    name: "[PJ1-37] โครงการส่งเสริมประชาธิปไตย",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 500,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 138,
    name: "[PJ1-38] โครงการกิจกรรมไหว้ครู",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 139,
    name: "[PJ1-39] โครงการวันเอดส์โลก",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 1000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 140,
    name: "[PJ1-40] โครงการโรงเรียนส่งเสริมความปลอดภัย",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 141,
    name: "[PJ1-41] โครงการยกระดับการส่งเสริมกิจกรรมทางกายเพื่อเด็กวัยเรียน วัยรุ่น สูง ดี สมส่วน แข็งแรง",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 142,
    name: "[PJ1-42] โครงการวันคริสมาสต์และสัปดาห์ Language Battle 2025 : ศึกชิงเจ้าภาษา",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 10000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 143,
    name: "[PJ1-43] โครงการวันสุนทรภู่สู่วันภาษาไทย",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 8000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 144,
    name: "[PJ1-44] โครงการจัดซื้อวัสดุกีฬา",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบลงทุน",
    status: "Active"
  },
  {
    id: 145,
    name: "[PJ1-45] โครงการจัดนิทรรศการโครงงานอาชีพ",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 146,
    name: "[PJ1-46] โครงการจัดหาสื่อและเทคโนโลยีเพื่อพัฒนาคุณภาพผู้เรียน",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 15000,
    spent: 0,
    category: "งบอุดหนุน",
    status: "Active"
  },
  {
    id: 147,
    name: "[PJ1-47] โครงการแข่งขันกีฬภายในโรงเรียนประจักษ์ศิลปาคม",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 22000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 148,
    name: "[PJ1-48] โครงการแข่งขันกีฬาเพื่อความเป็นเลิศภายนอกโรงเรียนประจักษ์ศิลปาคม",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Closed"
  },
  {
    id: 149,
    name: "[PJ1-49] โครงการจัดซื้อวัสดุอุปกรณ์กีฬา",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบลงทุน",
    status: "Active"
  },
  {
    id: 150,
    name: "[PJ1-50] โครงการโรงเรียนคุณธรรม สพฐ.4 ดาว",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 151,
    name: "[PJ1-51] โครงการวันสำคัญทางพระพุทธศาสนา",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 8000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 152,
    name: "[PJ1-52] โครงการเกษตรทฤษฎีใหม่ (โคก หนอง นา)",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Closed"
  },
  {
    id: 153,
    name: "[PJ1-53] โครงการส่งเสริม พัฒนาศูนย์การเรียนรู้ตามหลักปรัชญาเศรษฐกิจพอเพียงฯ",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 30000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 154,
    name: "[PJ1-54] โครงการศึกษาแหล่งเรียนรู้ทางประวัติศาสตร์เมืองอุดรธานี",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 155,
    name: "[PJ1-55] โครงการวันแม่",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 156,
    name: "[PJ1-56] โครงการวันพ่อ",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 157,
    name: "[PJ1-57] โครงงานส่งท้ายปีเก่าต้อนรับปีใหม่",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 0,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Closed"
  },
  {
    id: 158,
    name: "[PJ1-58] โครงการพัฒนางานแนะแนว โรงเรียนประจักษ์ศิลปาคม",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 17000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },

  // --- PJ2 Series: กิจกรรมพัฒนาผู้เรียน / วิชาการ ---
  {
    id: 201,
    name: "[PJ2-1] โครงการอบรมพัฒนานักเรียนเพื่อนที่ปรึกษา YC : Youth counselor",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 20000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 202,
    name: "[PJ2-2] โครงการเข้าค่ายลูกเสือ-เนตรนารี สามัญรุ่นใหญ่",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 22000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 203,
    name: "[PJ2-3] โครงการยกระดับผลสัมฤทธิ์ทางการเรียนกลุ่มสาระวิทยาศาสตร์และเทคโนโลยี",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 5000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 204,
    name: "[PJ2-4] โครงการยกระดับผลสัมฤทธิ์ทางวิชาการ (ติว โอเนต ม.3,ม.6)",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 13400,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 205,
    name: "[PJ2-5] โครงการแข่งขันทักษะวิชาการ (งานศิลปหัตถกรรม)",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 30000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 206,
    name: "[PJ2-6] โครงการค่ายพัฒนาศักยภาพทางวิทยาศาสตร์และเทคโนโลยี",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 35000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 207,
    name: "[PJ2-7] โครงการ English and Chinese Camp",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 20000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 208,
    name: "[PJ2-8] โครงการทัศนศึกษาแหล่งเรียนรู้",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 70000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 209,
    name: "[PJ2-9] โครงการส่งเสริมความเป็นเลิศด้านดนตรีและนาฏศิลป์ สู่ศิลปินมืออาชีพ",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 40000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 210,
    name: "[PJ2-10] โครงการค่ายคณิตศาสตร์",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 11600,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 211,
    name: "[PJ2-11] โครงการค่ายพัฒนาคุณธรรม จริยธรรมนักเรียน",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 20000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 212,
    name: "[PJ2-12] โครงการค่ายปรับพื้นฐานคุณลักษณะอันพึงประสงค์",
    group: "กลุ่มกิจการนักเรียน",
    owner: "ไม่ระบุ",
    budget: 3000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 213,
    name: "[PJ2-13] โครงการส่งเสริมความปลอดภัย(ว่ายน้ำเพื่อชีวิต)",
    group: "กลุ่มบริหารทั่วไป",
    owner: "ไม่ระบุ",
    budget: 35000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 214,
    name: "[PJ2-14] โครงการรู้เท่าทันสื่อและเทคโนโลยี",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 2993,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },
  {
    id: 215,
    name: "[PJ2-15] โครงการส่งเสริมทักษะอาชีพ 'ตลาดนัดทองหลาง' สร้างโอกาส สร้างอนาคต",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 15000,
    spent: 0,
    category: "งบกิจกรรมพัฒนาผู้เรียน",
    status: "Active"
  },
  {
    id: 216,
    name: "[PJ2-16] โครงการพัฒนาการอ่านออกเขียนได้",
    group: "กลุ่มบริหารวิชาการ",
    owner: "ไม่ระบุ",
    budget: 1000,
    spent: 0,
    category: "งบดำเนินงาน",
    status: "Active"
  },

  // --- PJ3 Series: งบกลาง ---
  {
    id: 301,
    name: "[PJ3-1] หักงบกลาง 10%",
    group: "กลุ่มบริหารงบประมาณ",
    owner: "ไม่ระบุ",
    budget: 72356,
    spent: 0,
    category: "งบกลาง",
    status: "Active"
  }
];

export const CHART_DATA_MONTHLY = [
  { name: 'ต.ค. 68', spending: 0 },
  { name: 'พ.ย. 68', spending: 0 },
  { name: 'ธ.ค. 68', spending: 0 },
  { name: 'ม.ค. 69', spending: 0 },
  { name: 'ก.พ. 69', spending: 0 },
  { name: 'มี.ค. 69', spending: 0 },
  { name: 'เม.ย. 69', spending: 0 },
  { name: 'พ.ค. 69', spending: 0 },
  { name: 'มิ.ย. 69', spending: 0 },
  { name: 'ก.ค. 69', spending: 0 },
  { name: 'ส.ค. 69', spending: 0 },
  { name: 'ก.ย. 69', spending: 0 },
];

export const CHART_DATA_BUDGET_TYPE = [
  { name: 'งบลงทุน', value: 58000 },
  { name: 'งบดำเนินงาน', value: 380000 },
  { name: 'งบอุดหนุน', value: 450000 },
  { name: 'กิจกรรมพัฒนาผู้เรียน', value: 280000 },
];

export const CHART_COLORS = ['#6A4DE8', '#D76EF5', '#A78BFA', '#F472B6', '#34D399'];
