require("dotenv").config();
const SendPhoneMSM = async (req, res) => {
  const phone = req.body;
  try {
    const client = require("twilio")(
      process.env.AccountSID,
      process.env.AuthorToken
    );
    const message = client.messages.create({
      body: "Hello from twilio-node",
      to: "+84862625207", // Text your number
      from: phone, // From a valid Twilio number
    });
    console.log(message);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
module.exports = SendPhoneMSM;
