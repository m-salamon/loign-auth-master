require('dotenv').config();
import nodemailer from 'nodemailer';

export function emailSender(email, token, path) {

    const html = (token, path) => {
        if (path === 'verify') {
            return {
                subject: 'Verify Email Address',
                html: `<div>Click below to verfiy</div><button><a href="${process.env.APP_URL}/${path}/${token}">Verify</a></button>`
            }
        } else if (path === 'resetPassword') {
            return {
                subject: 'Reset password',
                html: `<div>Click below to create new password</div><button><a href="${process.env.APP_URL}/${path}/${token}">Update Password</a></button>`
            }
        }else{
            console.log('Error: missing a path')
        }
    }

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: html(token, path).subject,
        html: html(token, path).html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error Sending Email: ', error);
        }
    });
}
