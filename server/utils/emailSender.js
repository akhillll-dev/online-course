const nodemailer = require('nodemailer');

const sendEmailWithPDF = async (to, subject, text, pdfBuffer, orderId) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: `receipt_${orderId}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Email error: ', error);
        return false;
    }
};

module.exports = { sendEmailWithPDF };
