// //import PDFDocument from'pdfkit';
// import fs from 'fs';
// import nodemailer from 'nodemailer';
// import PDFDocument from 'pdfkit-table';
// import ENV from '../config.js';

// // Function to generate electricity bill PDF
// function generateElectricityBillPDF(billData, outputPath) {
//     const doc = new PDFDocument();
//     const outputStream = fs.createWriteStream(outputPath);
//     doc.pipe(outputStream);

//     // Add content to the PDF
//     doc.fontSize(20).text('Electricity Bill', { align: 'center' }).moveDown(0.5);

//     // Add customer details
//     doc.fontSize(12).text(`CustomerName: ${billData.customerName}`).moveDown(0.5);
//     doc.text(`Address: ${billData.address}`).moveDown(1);

//     // Add meter details
//     doc.text(`Meter ID: ${billData.meterId}`).moveDown(0.5);

//     // Add readings table
//     doc.moveDown(1);
//     const table = {
//         headers: ['Date', 'Reading (kWh)'],
//         rows: billData.readings.map(reading => [reading.date, reading.reading])
//     };
//     doc.table(table, { width: 500 });

//     // Calculate total units consumed
//     const totalUnits = billData.readings[billData.readings.length - 1].reading - billData.readings[0].reading;

//     // Add usage details
//     doc.text(`Units Consumed: ${totalUnits} kWh`).moveDown(0.5);
//     doc.text(`Unit Price: Rs.${billData.unitPrice} per kWh`).moveDown(1);

//     // Calculate total amount
//     const totalAmount = (totalUnits * billData.unitPrice) + parseFloat(billData.additionalCharges);

//     // Add additional charges and total amount
//     doc.text(`Additional Charges: Rs.${billData.additionalCharges}`).moveDown(0.5);
//     doc.fontSize(14).text(`Total Amount: Rs.${totalAmount.toFixed(2)}`, { align: 'right' });

//     doc.end();
//     console.log(`Electricity bill PDF generated at: ${outputPath}`);
// }

// // Function to send email with attachment
// export function sendEmailWithAttachment(email, attachmentPath) {
//     const transporter = nodemailer.createTransport({
//         service : 'gmail',// Configure your email transport options (e.g., SMTP, etc.)
//         auth: {
//           user:ENV.EMAIL,
//           pass:ENV.PASSWORD
//         }
//     });

//     const mailOptions = {
//         from: 'j28726217@gmail.com',
//         to: email,
//         subject: 'Your Electricity Bill',
//         text: 'Please find your electricity bill attached.',
//         attachments: [
//             {
//                 filename: 'electricity_bill.pdf',
//                 path: attachmentPath
//             }
//         ]
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }

// // Function to generate dummy electricity bill data
// function generateDummyElectricityBill() {
//     const startDate = new Date(2024, 1, 1); // Assuming start date: February 1, 2024
//     const endDate = new Date(2024, 1, 2); // Assuming end date: February 2, 2024

//     const readings = [];
//     let previousReading = Math.floor(Math.random() * 1000); // Starting reading
//     for (let date = new Date(startDate); date <= endDate; date.setSeconds(date.getSeconds() + 86400)) {
//         const currentReading = previousReading + Math.floor(Math.random() * 50); // Random increment
//         readings.push({
//             date: date.toLocaleString(),
//             reading: currentReading
//         });
//         previousReading = currentReading;
//     }

//     return {
//         customerName: 'vishlesh Meshramkar',
//         address: '123 Main St, Anytown, Bangalore',
//         meterId: 'ABC123',
//         readings: readings,
//         unitPrice: 2, // Rs2 per kWh
//         additionalCharges: 100 // Additional charges, if any
//     };
// }

// // Generate dummy electricity bill data
// const dummyBillData = generateDummyElectricityBill();

// // Generate electricity bill PDF
// const outputPath = 'electricity_bill.pdf';
// generateElectricityBillPDF(dummyBillData, outputPath);

// // Send email with attachment after 30 seconds
// setTimeout(() => {
//     sendEmailWithAttachment('spmeshramkar@gmail.com', outputPath);
// }, 30000); // 30 seconds delay