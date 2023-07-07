const { createMailTransporter } = require("./createMailTransporter");

const sendPedidoEmail = (user, email, pedido) => {
  const transporter = createMailTransporter();
  {
    /*  <p>Sigue el siguiente enlace para crear uno nuevo </p><a href=${process.env.CLIENT_URL}/recovery-password?userId=${user._id}>Cambiar Contraseña<a/> */
  }
  const mailOptions = {
    from: '"Albe de kioskito", <kiosko-pi.vercel.app>',
    to: email,
    subject: "Nuevo pedido",
    html: `<p>El usuario ${user.nombre} has realizado un pedido para ser enviado a ${pedido.receptor} </p>
    <p>Presiona el siguiente enlace para ver los detalles</p>

    <a href=${process.env.CLIENT_URL}/pedido${pedido._id} >Ver pedido<a/>
    
    
    </n>
    <p>Puedes comunicarte a su whatsapp presionando este link  </p>
    <a href=https://wa.me/${pedido.movil} >Contáctar cliente<a/>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Nuevo pedido Email sent");
    }
  });
};

module.exports = { sendPedidoEmail };
