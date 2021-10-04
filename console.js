const repl = require("repl")

// database 
const sequelize = require("./util/database");
const User = require('./models/user');
const Customer = require('./models/customer');
const Invoice = require('./models/invoice');

sequelize.sync()
  .then(() => {
    const replServer = repl.start({
      prompt: "mvm > ",
    })
    replServer.context.User = User
    replServer.context.Customer = Customer
    replServer.context.Invoice = Invoice
  })
