const express = require("express");
const router = express.Router();

// Import the configured Nodemailer transporter object
const transporter = require("../config/transporter.config");

// Import the template functions
const templates = require("../templates/template");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/send-email", (req, res, next) => {
  let { email, subject, message } = req.body;

  // Send an email with the information we got from the form
  transporter
    .sendMail({
      from: `"My Awesome Project 👻" <${process.env.EMAIL_ADDRESS}>`,
      to: email,
      subject: subject,
      text: message,
      html: templates.templateExample(message),
    })
    .then((info) => res.render("message", { email, subject, message, info }))
    .catch((error) => console.log(error));
});

module.exports = router;
