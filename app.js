const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./util/database");

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const quotationRoutes = require('./routes/quotations');
const revenuRoutes = require('./routes/revenus');
const creditRoutes = require('./routes/credits');
const costRoutes = require('./routes/costs');
const authRoutes = require('./routes/auth');
const { Result } = require('express-validator');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');
const Quotation = require('./models/quotation');
const InvoiceItem = require('./models/invoiceItem');
const Revenu = require('./models/revenu');
const Credit = require('./models/credit');
const Cost = require('./models/cost');

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/', customerRoutes);
app.use('/', invoiceRoutes)
app.use('/', quotationRoutes)
app.use('/', revenuRoutes)
app.use('/', creditRoutes)
app.use('/', costRoutes)
app.use('/users/', authRoutes)
app.use((error, req, res, next) => {
  const status = error.statusCode
  const message = error.message
  res.status(status).json({message: message})
})

Customer.hasMany(Invoice)
Invoice.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' })
Invoice.InvoiceItems = Invoice.hasMany(InvoiceItem);
InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: 'CASCADE' })

Customer.hasMany(Quotation)
Quotation.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' })
Quotation.InvoiceItems = Quotation.hasMany(InvoiceItem);
InvoiceItem.belongsTo(Quotation, { constraints: true, onDelete: 'CASCADE' })

Revenu.hasMany(Invoice)
Invoice.belongsTo(Revenu, { constraints: true })
Revenu.hasMany(Credit)
Credit.belongsTo(Revenu, { constraints: true })
Revenu.hasMany(Cost)
Cost.belongsTo(Revenu, { constraints: true })

sequelize.sync({force: true})
.then(result => {
  Customer.create({
    firstname: 'Martin',
    lastname: 'Jean',
    company: "test",
    address: "123 rue tete d'or",
    phone: '0764470724',
  })
})
.then(result => {
  return Invoice.create({
    firstname: "Martin",
    lastname: "Jean",
    company: "test",
    customerId: 1,
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
  }, { include: Invoice.InvoiceItems })
})
.then(result => {
  return Quotation.create({
    firstname: "Martin",
    lastname: "Jean",
    company: "test",
    customerId: 1,
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
})
.then(result => {
  app.listen(8080)
})
.catch(err => {
  console.log(err)
})