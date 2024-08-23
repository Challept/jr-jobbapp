const twilio = require('twilio');

exports.handler = async (event) => {
  const { phoneNumber, message } = JSON.parse(event.body);

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'SMS sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};