
const pupitreModel = require("../models/Pupitre.js");
const personModel = require("../models/Personne.js");
/*Add One Pupitre*/ 
 const AddPupitre = async(req, res) => {
  try { 
      const newPupitre = await pupitreModel.create(req.body);
      res.status(201).json({Pupitre: newPupitre, message: "Pupitre added with success" });
    }
catch (e) {
  res.status(400).json({
      e:e.message,
      message:"Pupitre Not Added"
  })
}
};
const findAllPupitre = async (req, res) => {
    try {
      // Find all pupitres
      const pupitres = await pupitreModel
      .find()
      .populate({
        path: 'choristes',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'chefdePupitre',
        select: '-createdAt -updatedAt -__v',
      })
      .select('-historique')
      .exec();
  
      res.status(200).json({
        pupitres: pupitres,
        message: 'All pupitres fetched successfully.',
      });
    } catch (error) {
      console.error('Error fetching pupitres:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
    AddPupitre,findAllPupitre
};