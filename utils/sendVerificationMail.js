const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"Albe de kioskito", <kiosko-pi.vercel.app>',
    to: user.email,
    subject: "Verifica tu cuenta",
    html: `<p>Hello ${user.name}, verifica tu cuenta haciendo click en este enlace </p>
    <a href=${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken} >Verifica tu cuenta<a/>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification Email sent");
    }
  });
};

module.exports = { sendVerificationMail };
