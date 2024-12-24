import React from "react";
import jsPDF from "jspdf";

const ExportToPDF: React.FC<{ data: any[] }> = ({ data }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("تقرير التسجيل في التربصات", 20, 20);

    data.forEach((item, index) => {
      const y = 30 + index * 10;
      doc.text(
        `#${index + 1} - الاسم: ${item.name}, الدور: ${item.role}, التربص: ${item.training}, التاريخ: ${item.date}`,
        20,
        y
      );
    });

    doc.save("تقرير التسجيل.pdf");
  };

  return <button onClick={handleDownload}>تحميل التقرير كـ PDF</button>;
};

export default ExportToPDF;
