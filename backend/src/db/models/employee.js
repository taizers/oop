import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'employee',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courses: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foreign_level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('created_at')).format(
            'YYYY-MM-DD[T]HH:mm:ss.SSS'
          );
        },
      },
    },
    {
      paranoid: true,
    }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Company, { onDelete: 'cascade', foreignKey: "company_id" });
  };

  return Employee;
};
