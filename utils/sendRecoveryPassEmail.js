const { createMailTransporter } = require("./createMailTransporter");

const sendRecoveryPassEmail = (user) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"Albe de kioskito", <kiosko-pi.vercel.app>',
    to: user.email,
    subject: "Cambiar password",
    html: `<p>Hola ${user.name}.¿Has olvidado tu password? </p>
    <p>Tú código de recuperación es ${user.recoveryCode}</p>
     Sigue el siguiente enlace para crear uno nuevo </p>
    <a href=${process.env.CLIENT_URL}/recovery-password?userId=${user._id}>Cambiar Contraseña<a/>
   </n>
    <p>Si no has sido tú el que ha intentado cambiar tu contraseña ignora este mensaje</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Recovery Password Email sent");
    }
  });
};

module.exports = { sendRecoveryPassEmail };
