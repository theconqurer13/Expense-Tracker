// components/reports/ExportButton.js
import React from 'react';

export default function ExportButton({ expenses }) {
  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(exp => [
        new Date(exp.date).toISOString().split('T')[0],
        `"${exp.description}"`,
        exp.category,
        exp.amount
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'expenses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    // In a real app, you would use a library like jsPDF
    alert('PDF export would be implemented here');
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
      >
        Export CSV
      </button>
      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
      >
        Export PDF
      </button>
    </div>
  );
}