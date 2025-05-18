const sendSMS = async ({ phoneNumber, message }) => {
  try {
    // Simulate SMS (replace with real service like Twilio if needed)
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    return { success: true };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error };
  }
};

module.exports = { sendSMS };
