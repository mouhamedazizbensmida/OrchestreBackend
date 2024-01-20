const mongoose = require("mongoose");

const auditionSchema = new mongoose.Schema(
  {
    numero_aud:{
      type: Number,
  }, // Change from Integer to Number
    date:{
      type: Date,
      required:true,
  },
  heureDeb:{
      type:String,
      required:true,
  },
  heureFin:{
      type:String,
      required:true,
  },
  candidat_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "person",
    required: true,
  },   
    tessiture: {
      type: String,
      enum: ['A', 'B', 'C',' '],
    
    },
    appreciation: {
      type: String,
      enum: ['Alto', 'Basse', 'Soprano', 'Ténor',' '],
      
    },
    extrait_music: {
      type: String,
    
    },
    decision: {
      type: String,
     
    },
    remarque: {
      type: String,
   
    },
  },
  { timestamps: true }
);

const auditionModel = mongoose.model("Audition", auditionSchema);
module.exports = auditionModel;
