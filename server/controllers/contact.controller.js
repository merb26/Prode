const nodemailer = require("nodemailer");

async function main(name, email, textarea) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "lester83@ethereal.email", // generated ethereal user
      pass: "gEwD2a35cKEqHaJd4v", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: name, // sender address
    to: "amiotti@secco.com.ar", // list of receivers
    subject: "PRODE CONTACT", // Subject line
    text: textarea, // plain text body
    html: `<b>${textarea}</b>`, // html body
  });

  console.log("Message sent: %s", JSON.stringify(info.text));
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return info.text;
}

main().catch(console.error);

//module.exports = { main };
