'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    image: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    tipoImage: {
      type: DataTypes.ENUM(["url","base64"]),
      defaultValue: "url"
    }
  }, {});
  Gallery.associate = function({ User }) {
    Gallery.belongsTo(User,{ onDelete: 'cascade', onUpdate: 'cascade' });
   
  };
  return Gallery;
};