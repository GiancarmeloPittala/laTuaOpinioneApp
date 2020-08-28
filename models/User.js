'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING(200),
      defaultValue: 'None'
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'username'
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: 'email'
    },
    pass: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    // indexes: [
    //   {
    //       unique: true,
    //       fields: ['email', 'username']
    //   }
  // ]
  });
  User.associate = function({ Gallery }) {
   
    User.hasMany(Gallery, { onDelete: 'cascade', onUpdate: 'cascade'});
    
    
  };
  return User;
};