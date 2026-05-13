const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/invoice', (req, res) => {

  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=invoice.pdf'
  );

  doc.pipe(res);

  doc
    .fontSize(25)
    .text('NITISH STORE');

  doc.moveDown();

  doc
    .fontSize(16)
    .text('Invoice Details');

  doc.moveDown();

  doc.text('Invoice No: INV-2026-001');
  doc.text('Date: 09 May 2026');
  doc.text('Customer: Rahul Sharma');

  doc.moveDown();

  doc.text('Product: Gaming Laptop');
  doc.text('Quantity: 1');
  doc.text('Price: ₹50,000');

  doc.moveDown();

  doc.text('Product: Wireless Mouse');
  doc.text('Quantity: 1');
  doc.text('Price: ₹2,000');

  doc.moveDown();

  doc.text('Subtotal: ₹52,000');
  doc.text('GST (18%): ₹9,360');

  doc.moveDown();

  doc
    .fontSize(18)
    .text('Grand Total: ₹61,360');

  doc.moveDown();

  doc.text('Thank you for shopping with us!');

  doc.end();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});