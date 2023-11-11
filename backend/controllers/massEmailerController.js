import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import nodemailer from "nodemailer";

export const sendEmail = asyncHandler(async(req,res)=>{
   const {subject, message} = req.body;

   //find verified users
    const users = await User.find({isVerified: true});
    //send email to each user
    users.forEach((user)=>{
        sendEmails(user.email, user.name, subject, message);
        console.log("sent to" + " "+user.email);
    })

    res.status(200).json({
        message: "Email sent  to all users successfully"
    })

})

const sendEmails = async (email, name, subject, message) => {
   try{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: '2003701@students.kcau.ac.ke',
            pass: 'Njihia7507?'	
        }
    })
    //message object
    let mail = {
        from: 'Article Africa <2003701@students.kcau.ac.ke>',
        to: `${name} <${email}>`,
        subject: subject,
        text: subject,
        html: `<p style="background-color: #000; color: #fff; padding: 20px; font-size: 20px;">
            <br>
            <strong>Hi ${name},</strong>
            <br>
            <br>

            ${message}
            <br>
            <br>
            
            <em>Regards,</em>
            <br>
            <em>Article Africa</em>
        </p>
        `,
    };

    //send the email
    let info = await transporter.sendMail(mail);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   }catch(err){
       console.error('Error occurred: ' + err.message);
   }
}
