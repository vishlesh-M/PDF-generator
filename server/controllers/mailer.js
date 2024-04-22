import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

// Create a transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENV.EMAIL, // Your Gmail email address
        pass: ENV.PASSWORD // Your Gmail password or an app-specific password
    }
});

// Create a Mailgen instance
const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
});

// Function to send registration email
export const registerMail = async (req, res) => {
    try {
        const { username, userEmail, text, subject } = req.body;

        // Generate email content
        const emailContent = {
            body: {
                name: username,
                intro: text || 'Welcome to our website! We\'re very excited to have you on board.',
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        // Generate HTML email using Mailgen
        const emailBody = mailGenerator.generate(emailContent);

        // Construct email message
        const message = {
            from: ENV.EMAIL,
            to: userEmail,
            subject: subject || "Signup successful",
            html: emailBody
        };

        // Send email
        await transporter.sendMail(message);

        // Send success response
        return res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        // Log and send error response
        console.error('Mail error:', error);
        return res.status(500).send({ error: "An error occurred while sending the email." });
    }
};
