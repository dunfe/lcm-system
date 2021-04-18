import nodemailer from 'nodemailer';
import express from 'express';

export const sendEmail = async options => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        // auth: {
        //     user: process.env.EMAIL_USERNAME,
        //     pass: process.env.EMAIL_PASSWORD
        // }
        // Active in gmail "less secure app" option
        service: 'Gmail',
        auth: {
            user: 'livecodingmentor@gmail.com',
            pass: 'Abcd123$'
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'LiveCodingMentor <no-reply@livecoding.me',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html
    }

    // 3) Actually send the email 
    await transporter.sendMail(mailOptions);
}

export default sendEmail;