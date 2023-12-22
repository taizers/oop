import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'company',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      scope: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ceo: {
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
      tableName: 'companies'
    }
  );

  Company.associate = (models) => {
    // Company.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "user_id" });
    Company.hasMany(models.Employee, { onDelete: 'cascade', foreignKey: "company_id"});
  };

  return Company;
};
