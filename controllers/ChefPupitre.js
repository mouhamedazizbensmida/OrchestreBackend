const choristeModel = require("../models/Choriste.js");
const chefpupitreModel = require("../models/ChefPupitre.js");
const pupitreModel = require("../models/Pupitre.js");
    const Ajouter_Chef_Pupitre = async (req, res) => {
        try {
            const ListeIdsChoriste = req.body.ListeIdsChoriste; // Assuming ListeIdsChoriste is an array of choriste IDs
            const pupitreId = req.body.pupitreId;
            
            const ListeIdsPupitre=[]
            // Find all choristes with the provided IDs
            const choristes = await choristeModel.find({ _id: { $in: ListeIdsChoriste } }).select("-createdAt -__v -updatedAt -__t -_id ");;
        
            if (!choristes || choristes.length === 0) {
              return res.status(404).send({ message: 'No choristes found.' });
            }
            await choristeModel.deleteMany({ _id: { $in: ListeIdsChoriste } });    
            // Loop through the found choristes
            for (const choriste of choristes) {
              // Create a new ChefPupitre document from the Choriste
              const newChefPupitre = new chefpupitreModel({
                ...choriste.toObject(),role:"Chef_pupitre"
              });
        
              // Save the new ChefPupitre document
              await newChefPupitre.save();
              ListeIdsPupitre.push(newChefPupitre._id)
              // Delete the original Choriste document
              
            }
        
            // Find the pupitre by ID
            const pupitre = await pupitreModel.findById(pupitreId);
        
            if (!pupitre) {
              return res.status(404).send({ message: 'Pupitre not found.' });
            }
        
            // Add choristes to the chefdePupitre array
            pupitre.chefdePupitre = pupitre.chefdePupitre.concat(ListeIdsPupitre);
            pupitre.choristes = pupitre.choristes.filter((id) => !ListeIdsChoriste.includes(id.toString()));
            // Save the updated pupitre
            await pupitre.save();
        
            res.status(200).send({pupitre:pupitre, message: 'Chef de pupitre ajouté !' });
          } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal Server Error' });
          }
        };
    module.exports = {
        Ajouter_Chef_Pupitre
      };