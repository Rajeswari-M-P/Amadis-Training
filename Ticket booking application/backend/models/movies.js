const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Ensure you have environment variables loaded

// Create a new instance of Sequelize directly here
const sequelize = new Sequelize("customer", "postgres", "qwert@123", {
    host: "localhost",
    dialect: 'postgres',
    logging: false, // Disable logging if not needed
});


const Movie = sequelize.define('Movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  releasedate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  actors: {
    type: DataTypes.STRING,
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false, // Disable timestamps
  tableName: 'movies' // Ensure the correct table name
});

const syncDatabase = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log('Movie Database synced!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  };
  
  syncDatabase();
  
  module.exports = Movie;
