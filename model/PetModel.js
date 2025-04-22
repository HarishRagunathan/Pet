const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    petName: String,
    petImage: String,
    petCategory: String,
    petDescription: String,
    petBreed:String,
    petAge: String,  
    petWeight: String,   
    petNewPrice: Number,
    petOldPrice: Number,
    petHotStatus: Boolean  
});

const PetModel = mongoose.model('Pets', PetSchema);

module.exports = PetModel;
