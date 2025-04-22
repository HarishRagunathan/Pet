const mongoose = require('mongoose');
const UserModel = require('./userModel');
const PetModel = require('./PetModel');

const FavoriteShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',  
        required: true
    }
});

const FavoriteModel = mongoose.model('Favorite', FavoriteShema);

module.exports = FavoriteModel;
