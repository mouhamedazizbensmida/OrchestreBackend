const mongoose = require("mongoose");
const AbsenceSchema = new mongoose.Schema(
  {  
    date_abs: {
      type: Date,
      default: Date.now, // You can set a default value if needed
    },
    raison : {
      type: String,
      required: true,
    } 
  },
  { timestamps: true }
);
const absenceModel = mongoose.model("Absence", AbsenceSchema);
module.exports = absenceModel;
