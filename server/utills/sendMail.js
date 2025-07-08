const nodemailer = require("nodemailer");

exports.sendEmail = async (receiver, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiver,
      subject: subject,
      html: content,
    };

    return await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};



