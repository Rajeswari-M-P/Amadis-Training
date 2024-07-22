

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('customer', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const CartItem = sequelize.define('CartItem', {
    moviename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showtime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seats: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'cartitems',
  });
  
  // Sync the database
  const syncDatabase = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log('CartItems Database synced!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  };
  
  syncDatabase();

module.exports = CartItem;
