const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./util/database");

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const quotationRoutes = require('./routes/quotations');
const { Result } = require('express-validator');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');
const Quotation = require('./models/quotation');
const InvoiceItem = require('./models/invoiceItem');

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
  next();
})

app.use('/', customerRoutes);
app.use('/', invoiceRoutes)
app.use('/', quotationRoutes)

Customer.hasMany(Invoice);
Invoice.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' })
Invoice.InvoiceItems = Invoice.hasMany(InvoiceItem);
InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: 'CASCADE' })

Customer.hasMany(Quotation);
Quotation.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' })
Quotation.InvoiceItems = Quotation.hasMany(InvoiceItem);
InvoiceItem.belongsTo(Quotation, { constraints: true, onDelete: 'CASCADE' })

sequelize.sync({force: true})
.then(result => {
  return Quotation.create({
    firstname: "Martin",
    lastname: "Jean",
    company: "test",
    invoiceItems: [
      {
        quantity: 10,
        unit: 25,
        total: 250,
      },
      {
        quantity: 10,
        unit: 30,
        total: 250,
      }
    ]
  }, { include: Quotation.InvoiceItems })
  .then(result => {
    app.listen(8080)
  })
})
.catch(err => {
  console.log(err)
})