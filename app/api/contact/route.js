import nodemailer from 'nodemailer';
import { createEspoLead } from '../../../lib/espo';

async function sendNotificationEmail(payload) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return { configured: false };
  }

  const transporter = nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT || 587),secure:process.env.SMTP_SECURE === 'true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
  await transporter.sendMail({from:process.env.SMTP_USER,to:payload.lawyer === 'Paul Harts MSc' ? 'harts@holland-legal-services.ae' : 'tuin@holland-legal-services.ae',replyTo:payload.email,subject:`Website enquiry: ${payload.service}`,text:JSON.stringify(payload, null, 2)});
  return { configured: true };
}

export async function POST(request) {
  const {name,email,phone,service,lawyer,message,consent,pageUrl} = await request.json();

  if (!name || !email || !message || !consent) {
    return Response.json({ok:false,error:'Name, email, message and consent are required.'}, {status:400});
  }

  const payload = {name,email,phone,service,lawyer,message,consent,pageUrl,receivedAt:new Date().toISOString()};

  const [crmResult, emailResult] = await Promise.allSettled([
    createEspoLead(payload),
    sendNotificationEmail(payload),
  ]);

  if (emailResult.status === 'rejected') {
    console.error('Website enquiry email notification failed:', emailResult.reason);
  }

  if (crmResult.status === 'rejected') {
    console.error('EspoCRM lead creation failed:', crmResult.reason);
    return Response.json({ok:false,error:'The enquiry could not be saved. Please try again.'}, {status:502});
  }

  return Response.json({
    ok:true,
    message:'Enquiry received',
    crm: crmResult.value.configured ? 'created' : 'not-configured',
  });
}
