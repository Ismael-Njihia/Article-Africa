import nodemailer from 'nodemailer';

const generateEmailVerificationCode = async (email, name, verificationCode) => {
    try {
        // Create a SMTP transporter object using your email and password
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '2003701@students.kcau.ac.ke', // Your email
                pass: 'Njihia7507?', // Your password
            },
        });

        // Message object
        let message = {
            from: 'Article Africa <2003701@students.kcau.ac.ke>',
            to: `${name} <${email}>`,
            subject: 'Email Verification Code',
            text: 'Email Verification Code',
            html: `<p style="background-color: #000; color: #fff; padding: 20px">
            <br>
            <strong>Hi ${name},</strong>
            <br>
            <br>

            Thank you for registering on Article Africa. Your verification code is <strong style="color: #fff;">${verificationCode}</strong>
            <br>
            <br>
            
            <em>Regards,</em>
            <br>
            <em>Article Africa</em>
        </p>
        `,
        };

        

        // Send the email
        let info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error('Error occurred: ' + err.message);
    }
};

export default generateEmailVerificationCode;
