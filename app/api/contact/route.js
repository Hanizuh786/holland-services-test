import nodemailer from 'nodemailer';

export async function POST(request) {
  const {name,email,phone,service,lawyer,message,consent} = await request.json();

  if (!name || !email || !message || !consent) {
    return Response.json({ok:false,error:'Name, email, message and consent are required.'}, {status:400});
  }

  const payload = {name,email,phone,service,lawyer,message,consent,receivedAt:new Date().toISOString()};

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT || 587),secure:process.env.SMTP_SECURE === 'true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
    await transporter.sendMail({from:process.env.SMTP_USER,to:lawyer === 'Paul Harts MSc' ? 'harts@holland-legal-services.ae' : 'tuin@holland-legal-services.ae',replyTo:email,subject:`Website enquiry: ${service}`,text:JSON.stringify(payload, null, 2)});
  }

  return Response.json({ok:true,message:'Enquiry received',data:payload});
}
