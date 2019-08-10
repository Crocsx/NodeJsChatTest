
import sgMail from '@sendgrid/mail';

export const setup = () =>{
  sgMail.setApiKey(process.env.SENGRID!);
}

export const sendWelcomeEmail = (email: string, name: string) => {
    const msg = {
      to: email,
      from: 'notifications@github.com',
      subject: 'Thanks for joining the chat app',
      text: `Hello ${name}`
    };
    sgMail.send(msg);
}

export const sendByeEmail = (email: string, name: string) => {
    const msg = {
      to: email,
      from: 'notifications@github.com',
      subject: `It's been a pleasure to have you`,
      text: `Bye ${name}`
    };
    sgMail.send(msg);
}