const  { User, Gallery } = require ('../models/index' );


module.exports = {
  create: async ({userId,avatar,avatar_type = 'url'}) => {
    
    const user = await User.findByPk(userId);
    if(!user) throw 'id utente inesistente';
    
    user.createGallery({image: avatar,tipoImage: avatar_type})}
  

}