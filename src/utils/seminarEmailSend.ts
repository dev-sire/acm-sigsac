
import emailjs from 'emailjs-com';

const USER_ID = 'A773VG8D7UxbuM1-G';
const SERVICE_ID = 'service_7blsqqd';
const TEMPLATE_ID = 'template_wibl0yg';

emailjs.init(USER_ID);

interface EmailParams {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  message?: string;
}

export const sendSeminarEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        leaderName: params.leaderName,
        leaderEmail: params.leaderEmail,
        teamName: params.teamName,
      }
    );
    
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
