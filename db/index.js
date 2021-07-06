const seeds = require('./seed');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seeds();
  console.log('\n-----  SEEDED -----\n');

  process.exit(0);
};

seedAll();