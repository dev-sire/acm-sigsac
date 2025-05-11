
import emailjs from 'emailjs-com';

const USER_ID = 'A773VG8D7UxbuM1-G';
const SERVICE_ID = 'service_7blsqqd';
const TEMPLATE_ID = 'template_hsrq2ue';

emailjs.init(USER_ID);

interface EmailParams {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  eventName: string;
  message?: string;
}

export const sendRegistrationEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: params.leaderEmail,
        to_name: params.leaderName,
        team_name: params.teamName,
        event_name: params.eventName,
        message: params.message || ''
      }
    );
    
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
