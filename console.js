const repl = require("repl")

// database 
const sequelize = require("./util/database");
const User = require('./models/user');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');
const Quotation = require('./models/quotation');
const InvoiceItem = require('./models/invoiceItem');
const Revenu = require('./models/revenu');

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
