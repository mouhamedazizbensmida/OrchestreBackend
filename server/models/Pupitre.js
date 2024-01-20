const mongoose = require('mongoose');


const pupitreSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["alto", "basse", "tenor", "soprano"],
        required: false,
      },
    choristes: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "person", // This references an "Author" model
        required: false,
       }],

    chefdePupitre: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "person", // This references an "Author" model
        required: false,
       }],
    

  designation: {
    type: String,
    required: false,
  },
});

const pupitreModel =  mongoose.model('Pupitre', pupitreSchema);

module.exports = pupitreModel;