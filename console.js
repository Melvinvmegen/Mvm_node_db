const repl = require("repl")
const db = require("./models/index");

// database 
const sequelize = db.sequelize
const User = db.User;
const Customer = db.Customer;
const Invoice = db.Invoice;
const Quotation = db.Quotation;
const InvoiceItem = db.InvoiceItem;
const Revenu = db.Revenu;

sequelize.sync()
  .then(() => {
    const replServer = repl.start({
      prompt: "mvm > ",
    })
    replServer.context.User = User
    replServer.context.Customer = Customer
    replServer.context.Quotation = Quotation
    replServer.context.Invoice = Invoice
    replServer.context.InvoiceItem = InvoiceItem
    replServer.context.Revenu = Revenu
  })
