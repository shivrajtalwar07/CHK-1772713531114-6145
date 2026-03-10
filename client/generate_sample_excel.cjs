const XLSX = require('xlsx');
const path = require('path');

const yearData = [
  { Year: 2020, Mumbai: 100, Delhi: 110, Bangalore: 120, Chennai: 130, Hyderabad: 140, Pune: 150 },
  { Year: 2021, Mumbai: 110, Delhi: 120, Bangalore: 130, Chennai: 140, Hyderabad: 150, Pune: 160 },
  { Year: 2022, Mumbai: 120, Delhi: 130, Bangalore: 140, Chennai: 150, Hyderabad: 160, Pune: 170 },
];

const pieData = [
  { Name: 'Category A', Value: 50 },
  { Name: 'Category B', Value: 30 },
  { Name: 'Category C', Value: 20 },
];

const barData = [
  { City: 'Mumbai', Value: 500, Target: 600 },
  { City: 'Delhi', Value: 700, Target: 800 },
];

// Combine all data into one sheet for simplicity in this test
const combinedData = [...yearData, ...pieData, ...barData];

const worksheet = XLSX.utils.json_to_sheet(combinedData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

const filePath = path.join(__dirname, 'sample_data.xlsx');
XLSX.writeFile(workbook, filePath);

console.log('Sample Excel file created at:', filePath);
