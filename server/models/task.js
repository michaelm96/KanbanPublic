'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title task should not empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Category task should not empty'
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Organization should not empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Task.beforeCreate((user,options)=>{
    user.organization = "Hacktiv8"
  })
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};