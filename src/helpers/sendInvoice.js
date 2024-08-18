const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'defifitnessapp@gmail.com',
    pass: process.env.pass 
  }
});

const createInvoicePDF = async (invoiceId) => {
  const invoice = await stripe.invoices.retrieve(invoiceId);

  const doc = new PDFDocument();
  const stream = new PassThrough();
  doc.pipe(stream);

  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();
  
  doc.fontSize(14).text(`Invoice ID: ${invoice.id}`);
  doc.text(`Customer: ${invoice.customer_name}`);
  doc.text(`Amount Due: $${(invoice.amount_due / 100).toFixed(2)}`);
  doc.text(`Date: ${new Date(invoice.created * 1000).toLocaleDateString()}`);
  doc.moveDown();
  doc.text(`Description: ${invoice.description || 'N/A'}`);

  doc.end();
  
  return stream;
};

const sendInvoiceEmail = async (email, invoiceId) => {
  const pdfStream = await createInvoicePDF(invoiceId);
  
  const mailOptions = {
    from: 'defifitnessapp@gmail.com',
    to: email,
    subject: 'Your Invoice from DEFI',
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #ced4da;">
      <p style="margin-bottom: 15px; font-size: 16px;">Hello,</p>
      <p style="margin-bottom: 15px; font-size: 16px;">Thank you for your payment. Please find your invoice attached below:</p>
      <p style="font-size: 16px;">Invoice ID: ${invoiceId}</p>
      <p style="font-size: 16px;">If you have any questions, feel free to reach out to us. We're here to help.</p>
      <p style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">Best regards,<br>DEFI Team</p>
      <p style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">Toronto, Canada</p>
    </div>`,
    attachments: [
      {
        filename: 'invoice.pdf',
        content: pdfStream,
        contentType: 'application/pdf'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending invoice email:', error);
    } else {
      console.log('Invoice email sent:', info.response);
    }
  });
};

module.exports = { createInvoicePDF, sendInvoiceEmail };
