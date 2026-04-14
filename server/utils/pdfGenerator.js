const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = (order, course) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            
            // Create a buffer to store the PDF
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Add Header
            doc.fontSize(20).text('Payment Receipt - EduScale Platform', { align: 'center' });
            doc.moveDown();

            doc.fontSize(12).text(`Receipt for Order ID: ${order._id}`);
            doc.text(`Razorpay Payment ID: ${order.razorpayPaymentId}`);
            doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
            
            doc.moveDown();
            doc.text(`Customer Name: ${order.userName}`);
            doc.text(`Customer Email: ${order.userEmail}`);
            
            doc.moveDown();
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();

            doc.fontSize(14).text('Course Details:');
            doc.fontSize(12).text(`Title: ${course.title}`);
            doc.text(`Amount Paid: Rs. ${order.amount}`);

            doc.moveDown();
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();

            doc.text('Thank you for your purchase!', { align: 'center' });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generatePDF };
