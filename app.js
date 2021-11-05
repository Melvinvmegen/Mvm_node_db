if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/index");
const cron = require('node-cron');
const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const quotationRoutes = require('./routes/quotations');
const revenuRoutes = require('./routes/revenus');
const authRoutes = require('./routes/auth');
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
app.use('/users/', authRoutes)
app.use((error, req, res, next) => {
  const status = error.statusCode
  const message = error.message
  res.status(status).json({message: message})
})

cron.schedule('0 0 1 * *', function() {
  Revenu.create(({createdAt: new Date(), total: 0, pro: 0, perso: 0}))
});

db.sequelize.sync()
.then(() => {
  app.listen(8080)
})
.catch(err => {
  console.log(err)
})