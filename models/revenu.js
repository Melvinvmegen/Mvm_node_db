const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Revenu = sequelize.define('revenu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  pro: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  perso: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
});

Revenu.addHook('beforeSave', (revenu, options) => {
  let revenu_total;
  let revenu_pro;
  let revenu_perso
  if (revenu.invoices) {
    revenu.invoices.forEach(invoice => {
      revenu_pro += invoice.total
    }); 
  }
  if (revenu.credits) {
    revenu.credits.forEach(credit => revenu_perso += credit.total); 
  }
  revenu_total = revenu_pro + revenu_perso
  if (revenu.costs) {
    revenu.costs.forEach(cost => revenu_total -= cost.total); 
  }
  revenu.total = revenu_total;
});

module.exports = Revenu;