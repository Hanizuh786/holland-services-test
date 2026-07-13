
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const site = require('../data/siteData.json');
const app = express();
app.use(cors());
app.use(express.json({limit:'1mb'}));
app.get('/api/content', (_req,res)=>res.json(site));
app.post('/api/contact', async (req,res)=>{
  const {name,email,phone,service,lawyer,message,consent} = req.body || {};
  if(!name || !email || !message || !consent) return res.status(400).json({ok:false,error:'Name, email, message and consent are required.'});
  const payload = {name,email,phone,service,lawyer,message,consent,receivedAt:new Date().toISOString()};
  if(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS){
    const transporter = nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:false,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
    await transporter.sendMail({from:process.env.SMTP_USER,to:lawyer==='Paul Harts M.sc'?'harts@holland-legal-services.ae':'tuin@holland-legal-services.ae',replyTo:email,subject:`Website enquiry: ${service}`,text:JSON.stringify(payload,null,2)});
  }
  res.json({ok:true,message:'Enquiry received',data:payload});
});
app.listen(process.env.PORT||4000,()=>console.log('HLS API running on port',process.env.PORT||4000));
