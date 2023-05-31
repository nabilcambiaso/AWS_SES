import express from "express";
const router = express.Router();
import aws from "aws-sdk";
import env from "dotenv";
env.config();

const ses = new aws.SES({
   region: "us-east-1",
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   });

router.post("/email", (req, res) => {
  const { email, message, name } = req?.body;
  sesTest("cambiasonabil97@gmail.com", email, message, name).then((val) => {
    console.log("got this back", val);
    res.status(200).send("successful");
  }).catch((err) => {
    res.status(400).send(err);
  })
})


function sesTest(emailTo, emailFrom, message, name) {
  console.log(process.env.AWS_SECRET_ACCESS_KEY)
  const params = {
    Destination: {
      ToAddresses: [emailTo]
    },
    Message: {
      Body: {
        Text: {
          Data: "From contact: " + name + "\n" + message
        }
      },
      Subject: {
        Data: "Email: " + emailFrom
      },
    },
    Source: "cambiasonabil97@gmail.com"
  }
  return ses?.sendEmail(params).promise();
}

export default router;