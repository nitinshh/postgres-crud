const Sequelize = require('sequelize');
const createUserModel = require('../models/userSchema'); // Import the user model

const sequelize = new Sequelize(
    process.env.database_name,
    process.env.database_user,
    process.env.database_password, {
        host: process.env.database_host,
        dialect: 'postgres'
    }
);

let userModel = null;

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful');

        // Initialize the User model
        userModel = createUserModel(sequelize, Sequelize.DataTypes);
        
        // Sync the model with the database
        await sequelize.sync();
        console.log('Database synced');
    } catch (error) {
        console.log('Unable to connect to the DB:', error);
    }
};

// Return both connection function and the initialized userModel
module.exports = {
    connection,
    userModel: () => userModel, // Export a function to get the model after initialization
    sequelize
};
