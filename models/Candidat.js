const mongoose = require("mongoose");
const personModel = require("../models/Personne.js");

const candidatSchema =new mongoose.Schema({
situationPro:{
    type:String,
    required:false 
    // 
},
connaissanceMusic:{
    type:String,
    required:false
    // 
},
decision: {
    type: String,
    enum: ['Accepté', 'En attent', 'Refusé'],
    default:'En attent',
  },
},
{ timestamps: true });


 
  
  
const candidatModel = personModel.discriminator("Candidat",candidatSchema)

module.exports = candidatModel