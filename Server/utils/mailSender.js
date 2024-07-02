const nodemailer =require('nodemailer');
const otpTemplate=require("../mail/templates/emailVerification")

const mailSender=async(email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        
        let info = transporter.sendMail({
            from:'studynotion',
            to:`${email}`,
            subject:`${title}`,
            html:otpTemplate(body),
        })
        console.log(info);
        return info;
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = mailSender;