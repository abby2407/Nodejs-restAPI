const Sequelize = require("sequelize");
const sequelize = new Sequelize("sales_database","postgres","singh@2407", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.SalesRecord = require("../models/salesrecord.models.js")(sequelize,Sequelize);

module.exports = db;
