/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      company_id: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'companies',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      avatar: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      education: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      courses: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      foreign_level: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      adress: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('employees');
  },
};
