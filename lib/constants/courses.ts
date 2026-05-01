// lib/constants/courses.ts
export const PCLU_COURSES = [
  "Bachelor of Science in Information Technology",
  "Bachelor of Elementary Education",
  "Bachelor of Secondary Education",
  "Bachelor of Science in Business Administration",
  "Bachelor of Science in Criminology",
  "Bachelor of Science in Hospitality Management",
  "Bachelor of Science in Tourism Management",
] as const;

export type PCLUCourse = (typeof PCLU_COURSES)[number];

export const COURSE_ABBREVIATIONS: Record<PCLUCourse, string> = {
  "Bachelor of Science in Information Technology": "BSIT",
  "Bachelor of Elementary Education": "BEEd",
  "Bachelor of Secondary Education": "BSEd",
  "Bachelor of Science in Business Administration": "BSBA",
  "Bachelor of Science in Criminology": "BSCrim",
  "Bachelor of Science in Hospitality Management": "BSHM",
  "Bachelor of Science in Tourism Management": "BSTM",
};

export const BATCH_YEARS = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, i) => 2000 + i
).reverse();

export const GRADUATION_YEARS = Array.from(
  { length: new Date().getFullYear() - 2004 + 1 },
  (_, i) => 2004 + i
).reverse();

export const INDUSTRIES = [
  "Information Technology",
  "Business Process Outsourcing",
  "Manufacturing",
  "Construction",
  "Education",
  "Government",
  "Finance & Banking",
  "Retail & Commerce",
  "Food & Beverage",
  "Transportation & Logistics",
  "Media & Communications",
  "Engineering & Architecture",
  "Agriculture",
  "Hospitality & Tourism",
  "Legal Services",
  "Non-Profit / NGO",
  "Others",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const PROVINCES = [
  "Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay",
  "Antique", "Apayao", "Aurora", "Basilan", "Bataan", "Batanes",
  "Batangas", "Benguet", "Biliran", "Bohol", "Bukidnon", "Bulacan",
  "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz",
  "Catanduanes", "Cavite", "Cebu", "Cotabato", "Davao de Oro",
  "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental",
  "Dinagat Islands", "Eastern Samar", "Guimaras", "Ifugao", "Ilocos Norte",
  "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "La Union", "Laguna",
  "Lanao del Norte", "Lanao del Sur", "Leyte", "Maguindanao del Norte",
  "Maguindanao del Sur", "Marinduque", "Masbate", "Metro Manila",
  "Misamis Occidental", "Misamis Oriental", "Mountain Province", "Negros Occidental",
  "Negros Oriental", "Northern Samar", "Nueva Ecija", "Nueva Vizcaya",
  "Occidental Mindoro", "Oriental Mindoro", "Palawan", "Pampanga",
  "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar",
  "Sarangani", "Siquijor", "Sorsogon", "South Cotabato", "Southern Leyte",
  "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur",
  "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte",
  "Zamboanga del Sur", "Zamboanga Sibugay",
] as const;
