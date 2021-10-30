const repl = require("repl")
const db = require("./models/index");
const { sequelize, User, Customer, Invoice, Quotation, InvoiceItem, Revenu} = db

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
