const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/invoice', (req, res) => {

  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  });

  // Headers
  res.setHeader('Content-Type', 'application/pdf');

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=invoice.pdf'
  );

  // Pipe PDF
  doc.pipe(res);

  // Blue Header Background
  doc
    .rect(0, 0, 700, 120)
    .fill('#2563eb');

  // Company Name
  doc
    .fillColor('white')
    .fontSize(30)
    .text('NITISH STORE', 50, 40);

  doc
    .fontSize(14)
    .text('Premium Electronics Invoice', 50, 80);

  // Invoice Details
  doc
    .fillColor('black')
    .fontSize(16)
    .text('Invoice Details', 50, 160);

  doc
    .moveTo(50, 185)
    .lineTo(550, 185)
    .strokeColor('#d1d5db')
    .stroke();

  doc
    .fontSize(13)
    .text('Invoice No: INV-2026-001', 50, 210)
    .text('Date: 09 May 2026', 50, 235)
    .text('Customer: Rahul Sharma', 50, 260);

  // Table Header
  doc
    .roundedRect(50, 320, 500, 35, 5)
    .fill('#2563eb');

  doc
    .fillColor('white')
    .fontSize(13)
    .text('Product', 70, 332)
    .text('Qty', 300, 332)
    .text('Price', 380, 332)
    .text('Total', 470, 332);

  // Product Row 1
  doc
    .fillColor('black')
    .fontSize(12)
    .text('Gaming Laptop', 70, 380)
    .text('1', 310, 380)
    .text('₹50,000', 370, 380)
    .text('₹50,000', 470, 380);

  doc
    .moveTo(50, 410)
    .lineTo(550, 410)
    .strokeColor('#e5e7eb')
    .stroke();

  // Product Row 2
  doc
    .fontSize(12)
    .text('Wireless Mouse', 70, 430)
    .text('1', 310, 430)
    .text('₹2,000', 370, 430)
    .text('₹2,000', 470, 430);

  doc
    .moveTo(50, 460)
    .lineTo(550, 460)
    .strokeColor('#e5e7eb')
    .stroke();

  // Total Box
  doc
    .roundedRect(350, 520, 200, 80, 10)
    .fill('#f3f4f6');

  doc
    .fillColor('black')
    .fontSize(14)
    .text('Subtotal: ₹52,000', 370, 540)
    .text('GST (18%): ₹9,360', 370, 565);

  doc
    .fontSize(18)
    .fillColor('#2563eb')
    .text('Grand Total: ₹61,360', 370, 595);

  // Footer
  doc
    .fillColor('gray')
    .fontSize(11)
    .text(
      'Thank you for shopping with us!',
      50,
      730,
      {
        align: 'center'
      }
    );

  // End PDF
  doc.end();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});