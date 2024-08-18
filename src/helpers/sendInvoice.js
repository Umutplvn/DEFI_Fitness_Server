const sendInvoiceEmail = async (email, invoiceId) => {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    const invoiceUrl = invoice.hosted_invoice_url; 
    
    const mailOptions = {
      from: 'defifitnessapp@gmail.com',
      to: email,
      subject: 'Your Invoice from DEFI',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border: 1px solid #ced4da;">
        <p style="margin-bottom: 15px; font-size: 16px;">Hello,</p>
        <p style="margin-bottom: 15px; font-size: 16px;">Thank you for your payment. Please find your invoice at the following link:</p>
        <p style="margin-bottom: 15px; font-size: 16px;"><a href="${invoiceUrl}">View your invoice</a></p>
        <p style="font-size: 16px;">If you have any questions, feel free to reach out to us. We're here to help.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #666; text-align: center;">Best regards,<br>DEFI Team</p>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">Toronto, Canada</p>
      </div>`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending invoice email:', error);
      } else {
        console.log('Invoice email sent:', info.response);
      }
    });
  };
  