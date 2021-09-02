const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./util/database");

const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const { Result } = require('express-validator');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');
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

Customer.hasMany(Invoice);
Invoice.belongsTo(Customer, { constraints: true, onDelete: 'CASCADE' })
Invoice.hasMany(InvoiceItem);
InvoiceItem.belongsTo(Invoice, { constraints: true, onDelete: 'CASCADE' })

sequelize.sync()
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err)
  })
