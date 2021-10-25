const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/index");
const cron = require('node-cron');

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const quotationRoutes = require('./routes/quotations');
const revenuRoutes = require('./routes/revenus');
const creditRoutes = require('./routes/credits');
const costRoutes = require('./routes/costs');
const authRoutes = require('./routes/auth');
const Customer = db.Customer;
const Invoice = db.Invoice;
const Revenu = db.Revenu;

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

cron.schedule('0 0 1 * *', function() {
  Revenu.create()
});

db.sequelize.sync({force: true})
.then(result => {
  Customer.create({
    firstName: 'Martin',
    lastName: 'Jean',
    company: "test",
    address: "123 rue tete d'or",
    phone: '0764470724',
  })
})
.then(result => {
  return Revenu.create({ include: Revenu.Invoice })
})
.then(result => {
  return Invoice.create({
    firstName: "Martin",
    lastName: "Jean",
    company: "test",
    customerId: 1,
    revenuId: 1,
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
  app.listen(8080)
})
.catch(err => {
  console.log(err)
})