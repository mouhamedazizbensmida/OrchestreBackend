// services/excelService.js
const xlsx = require("xlsx");
const programmeModel = require("../models/Programme.js");
const oeuvreModel = require("../models/Oeuvre.js");
const concertModel = require("../models/Concert.js");

/*Add One Concert*/ 
 const AddConcert = async(req, res) => {
  try { 
   
      const newConcert = await concertModel.create(req.body);
      res.status(201).json({Concert: newConcert, message: "Concert added with success" });
    }
catch (e) {
  res.status(400).json({
      e:e.message,
      message:"Concert Not Added"
  })
}
};

const parseExcelFile = async (req, res) => {
  try {
    const filePath = req.body.filePath;

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    for (const row of data) {
      const oeuvre = await oeuvreModel.findOneAndUpdate(
        {
          titre: row.Nom_Chonson,
          choeur: row.Chouriste,
          genre: row.Genre,
        },
        {
          titre: row.Nom_Chonson,
          choeur: row.Chouriste,
          genre: row.Genre,
        },
        { upsert: true, new: true }
      );

      const programme = await programmeModel.findOneAndUpdate(
        { nom_programme: row.Programme },
        { nom_programme: row.Programme },
        { upsert: true, new: true }
      );

      if (!programme.oeuvres_liste.includes(oeuvre._id)) {
        programme.oeuvres_liste.push(oeuvre._id);
        await programme.save();
      }
    }

    res.status(200).json({ message: "Excel file processed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// La saisie du programme peut se faire via un fichier excel selon un format spécifique {end}

/*Find All Concert*/ 
 const FindAllConcerts = async (req, res) => {
  try {
    const Concerts = await concertModel.find({}, ' -createdAt -updatedAt -__v').populate({path:'programme_concert',select: '-_id -createdAt -updatedAt -__v',populate: {
      path: 'oeuvres_liste',
      select: '-_id  -createdAt -updatedAt -__v',
    },}).exec();
    
    if (!Concerts || Concerts.length === 0) {
      return res.status(404).json({ message: "Concert Not Found" });
    }

    res.status(200).json({
      Concerts: Concerts,
      message: "Concert Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Concert",
    });
  }
};

/*Find One Concert*/
 const FindOneConcert = async (req, res) => {
  try {
    const Concerts = await concertModel.find({_id:req.params.id}, ' -createdAt -updatedAt -__v').populate({path:'programme_concert',select: '-_id -createdAt -updatedAt -__v',populate: {
      path: 'oeuvres_liste',
      select: '-_id  -createdAt -updatedAt -__v',
    },}).exec();
    
    if (!Concerts || Concerts.length === 0) {
      return res.status(404).json({ message: "Concert Not Found" });
    }

    res.status(200).json({
      Concerts: Concerts,
      message: "Concert Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Concert",
    });
  }
};

/*Update One Concert*/ 
 const UpdateConcert = async (req, res) => { 
  try {
  
  const Concerts = await concertModel.findOneAndUpdate( { _id: req.params.id },req.body,{ new: true });

  if(!Concerts){ 
      return res.status(404).json({ message: "Concert Not Found" });
  }
  
    res.status(200).json({
      Concerts: Concerts,
      message: "Concert Updated!!",
    });
    
} catch (error) {
  res.status(500).json({
      error: error.message,
      message: "We can't Update Concert",
    });
}
};

/*Delete One Concert*/ 
 const DeleteConcert = async (req, res) => {
  try {
     const Concerts = await concertModel.findOne({_id:req.params.id});

     if(!Concerts){ 
            return res.status(404).json({ message: "The Concert Was Not Found To Be Deleted. Try Another ID" });
      }

      await concertModel.deleteOne({ _id: req.params.id });
      res.status(201).json({ message: "Concert Deleted With Success" });

    } catch (error) {
      res.status(500).json({
          error: error.message,
          message: "We can't Delete Concert",
        });
    }
}
module.exports = {
  AddConcert,parseExcelFile,FindAllConcerts,FindOneConcert,UpdateConcert,DeleteConcert
};


