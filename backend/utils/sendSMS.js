import twilio from "twilio";

export const sendSMS = async (phone, message) => {
  console.log("Using Twilio SMS...");
  console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
  console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);
  console.log("PHONE:", process.env.TWILIO_PHONE_NUMBER);

  try {
    // 🔥 CREATE CLIENT HERE (FIX)
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`,
    });

    console.log("SMS sent ✅");
  } catch (error) {
    console.error("SMS error:", error.message);
  }
};