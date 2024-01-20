const mongoose = require('mongoose');
const personModel = require('../models/Personne.js');

const choristeSchema = new mongoose.Schema({
   SeuilNomination :{ type: Number, default: 365 }, // Set your threshold for nomination
   SeuilElimination : { type: Number, default: 365 },
  repetitions: { type: Number, default: 3 },
  concerts: { type: Number, default: 3 },
  integration: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  statut: {
    type: String,
    enum: ['Junior', 'Choriste', 'Sénior', 'Vétéran'],
    default: 'Junior',
  },
  etat:{
    type: String,
    enum: ['Encongé','Actif','Nominé','Eliminé','Absence','Inactif'],
    default: 'Actif',
  },
  saison: {
    type: Number,
    default: 1,
  },
nbre_absence: {
  type: Number,
  default: 0,
},
  absence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Absence", // This references an "Author" model
    required: true,
  }],  
  historique: [
    {
      saison: {
        type: Number,
      },
      statut: {
        type: String,
      },
      etat:{
        type: String,
      },
      
    },
  ],
}, { timestamps: true });

const choristeModel = personModel.discriminator('Choriste', choristeSchema);

module.exports = choristeModel;
