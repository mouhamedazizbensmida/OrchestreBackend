const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    cin: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default:"Candidat"
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    sexe: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    tel: {
        type: String, // ou Number, en fonction de vos besoins
        required: false,
    },
    password:{type:String,required:false},
    tailleM: {
        type: Number,
        required: false,
    },
},{ timestamps: true })
const personModel = mongoose.model("person", personSchema);
module.exports = personModel