// Customer1.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('customer', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const customer1 = sequelize.define('customer1', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
 
  },
}, {
  tableName: 'customer1',  // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,
});

// Sync the model with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Customer Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = customer1;
