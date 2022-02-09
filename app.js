if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models/index");
const cron = require('node-cron');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const invoiceRoutes = require('./routes/invoices');
const quotationRoutes = require('./routes/quotations');
const revenuRoutes = require('./routes/revenus');
const authRoutes = require('./routes/auth');
const cryptoRoutes = require('./routes/cryptos');
const Revenu = db.Revenu;

const app = express();

app.use(bodyParser.json())

app.use(cors());

app.use('/', customerRoutes)
app.use('/', invoiceRoutes)
app.use('/', quotationRoutes)
app.use('/', revenuRoutes)
app.use('/', cryptoRoutes)
app.use('/users/', authRoutes)
app.use((error, req, res, next) => {
  const status = error.statusCode
  const message = error.message
  res.status(status).json({message: message})
})

cron.schedule('0 0 1 * *', function() {
  Revenu.create(({createdAt: new Date(), total: 0, pro: 0, perso: 0}))
});

db.sequelize.authenticate()
.then(() => {
  app.listen(process.env.PORT || 8080)
})
.catch(err => {
  console.log(err)
})