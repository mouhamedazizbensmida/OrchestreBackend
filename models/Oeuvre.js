const mongoose = require("mongoose");


const OeuvreSchema = new mongoose.Schema(
  {  
    titre: { type: String, required: true },
    compositeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compositeur' }],
    arrangeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arrangeur' }],
    annee: { type: Number },
    genre: { type: String },
    paroles: { type: String, default: null },
    partition: { type: String, default: null },
    aPartieChorale: { type: Boolean, default: false },
    sectionsChorale: [{ type: String }],
    choeur: {
      type: String,
      lowercase: true, // Convertit la valeur en minuscules
      enum: ['true', 'false', 'oui', 'non', 'ey', 'le'],
      default: 'non'
    }
  },
  { timestamps: true }
);

const oeuvreModel = mongoose.model("Oeuvre", OeuvreSchema);
module.exports = oeuvreModel;
