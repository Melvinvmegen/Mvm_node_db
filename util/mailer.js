const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require("fs");
const { pdfGenerator } = require('./pdfGenerator')
const path = require('path')

exports.sendInvoice = async function (invoice) {
  const id = invoice.id
  const invoiceName = 'invoice-' + id + '.pdf'
  invoice.invoiceName = invoiceName
  let writerStream = fs.createWriteStream(invoiceName)
  let doc = pdfGenerator(invoice)
  doc.pipe(writerStream);
  writerStream.on('finish', async function () {
    try {
      await sendGridMail.send(getMessage(invoice))
      await fs.unlinkSync(invoiceName)
      return { message: 'Invoice successfully sent !'};
    } catch (error) {
      let message = `Error sending invoice for invoiceNR: ${id}`;
      if (error.response) {
        message = error.response.body.errors[0].message;
      }
      await fs.unlinkSync(invoiceName)
      return { message };
    }
  })
}

function getMessage(invoice) {
  const createdAt = new Date(invoice.createdAt)
  const month = createdAt.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const firstname = invoice.firstName
  const doc = fs.readFileSync(invoice.invoiceName, {encoding: 'base64'} );

  return {
    to: invoice.email,
    from: 'melvin.vmegen@gmail.com',
    subject: `Facture ${month}`,
    text: `Hello ${firstname}, Tu trouveras ci-joint la facture du mois de ${month}.`,
    html: `<span>Hello ${firstname}</span>
            <br><br>
            <span>Tu trouveras ci-joint la facture du mois de ${month}.</span>
            <br><br>
            <span>Si tu as des questions n'hésite pas à me contacter !</span>
            <br><br>
            <span>Cordialement</span>
            <br><br>
            <span>Melvin van Megen</span>
            <br><br>
            <a href='tel:0764470724'>07 64 47 07 24</a>
            <br><br>
            <a href='https://www.melvinvmegen.com/'>https://www.melvinvmegen.com/</a>
            `,
    attachments: [
      {
        content: doc,
        filename: invoice.invoiceName,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };
}