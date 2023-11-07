const userinfo = require('../models/verify.model')
const User = require("../models/UserModel");
const nodemailer = require('nodemailer');
const website = 'https://amanuel-fawn-kappa.vercel.app/'
async function sendEmail(toEmail, subject, text, fromEmail, fromPass) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', //replace with your SMTP host
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `${fromEmail}`, 
      pass: `${fromPass}`, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `to verify email website`, // sender address
    to: `${toEmail}`, // list of receivers
    subject:` ${subject}`, // Subject line
    html: `${text}`, // plain text body
  });

  console.log(`Message sent: ${info.messageId}`);
}

module.exports.verify = async (req,res) => {
    const { token } = req.params;
    console.log(token)
    try{
        const user = await userinfo.findOneAndUpdate({token:token},{verify:true})
        console.log(user)
        if(user.verify == true)
        {
            return res.redirect("https://amanuel-fawn-kappa.vercel.app/login")
        }
        
        // const verified = await new User({email:user.email})
        // console.log(verified)
        // await verified.save()
    }catch(err){
        console.log('error')
    }
}
const randomNumber = () => {
    let token = ''
    const variable = [1,2,3,'a','j','d','a','b','j','k','f','j','d','s','j','i','j','s','6','7','5','4','9','3','8','0','s','k','j','f','n','j','k','c','a','d','j','u','e']
    for(let x = 0 ; x < 20; x++){
        token += variable[Math.floor(Math.random() * 39)]
    }
    return token
}


module.exports.userData = async (req,res) => {
    const {password,email} = req.body
    const link = randomNumber()
    const exists = await await userinfo.findOne({email:email})
    if(exists)
    {
        return res.send('email exists')
    }
    else{
        const user = await new userinfo({email:email,password:password, token:link,verify:false})

    const a = await user.save()
    sendEmail(email, 'verify your email for the project', `<p>To verify your email account go to this link <a href=${website}/${link}>click here</a> </p>`, process.env.EMAIL, process.env.PASSWORD)
    return res.send("verify your email. we have sent verification email to your email")
    }
}
module.exports.login = async (req,res) => {
    const {password,email} = req.body
    const user = await userinfo.findOne({email:email})
    console.log(user)
    if(!user)
    {
        return res.send("email")
    }
    else if(!(user.password == password))
    {
        return res.send("password")
    }
    else if(user.password == password )
    {
        if(!user.verify)
        {
            return res.send("verify")
        }
        if(user.verify)
        {
            return res.send("sucess")
        }
    }
}