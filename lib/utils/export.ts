// lib/utils/export.ts
// PDF and Excel export helpers for reports and alumni data

import * as XLSX from "xlsx";

// ── Excel Export ──────────────────────────────────────────────────────────────

export function exportToExcel(
  data: Record<string, unknown>[],
  filename: string,
  sheetName = "Sheet1"
): void {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Auto-fit column widths
  const colWidths = Object.keys(data[0] ?? {}).map((key) => ({
    wch: Math.max(
      key.length,
      ...data.map((row) => String(row[key] ?? "").length)
    ),
  }));
  worksheet["!cols"] = colWidths;

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// ── PDF Export ────────────────────────────────────────────────────────────────

export async function exportToPDF(
  elementId: string,
  filename: string,
  title: string
): Promise<void> {
  const { default: html2canvas } = await import("html2canvas");
  const { default: jsPDF } = await import("jspdf");

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[exportToPDF] Element #${elementId} not found`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Header
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Polytechnic College of La Union", pageWidth / 2, 12, {
    align: "center",
  });
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(title, pageWidth / 2, 18, { align: "center" });
  pdf.setFontSize(9);
  pdf.text(
    `Generated: ${new Date().toLocaleDateString("en-PH", { dateStyle: "long" })}`,
    pageWidth / 2,
    23,
    { align: "center" }
  );

  // Chart image
  const imageY = 28;
  if (imgHeight + imageY < pageHeight) {
    pdf.addImage(imgData, "PNG", 10, imageY, imgWidth, imgHeight);
  } else {
    // Scale to fit
    const scaledHeight = pageHeight - imageY - 10;
    const scaledWidth = (canvas.width * scaledHeight) / canvas.height;
    pdf.addImage(
      imgData,
      "PNG",
      (pageWidth - scaledWidth) / 2,
      imageY,
      scaledWidth,
      scaledHeight
    );
  }

  pdf.save(`${filename}.pdf`);
}

// ── Table PDF Export ──────────────────────────────────────────────────────────

export async function exportTableToPDF(
  columns: string[],
  rows: (string | number)[][],
  filename: string,
  title: string
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Polytechnic College of La Union", pageWidth / 2, 12, {
    align: "center",
  });
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(title, pageWidth / 2, 18, { align: "center" });

  autoTable(pdf, {
    head: [columns],
    body: rows,
    startY: 25,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: {
      fillColor: [27, 56, 95], // PCLU Navy
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 248, 255] },
  });

  pdf.save(`${filename}.pdf`);
}
