const bcrypt = require('bcrypt');
const choristeModel = require("../models/Choriste.js");
const personModel = require("../models/Personne.js");
const absenceModel = require("../models/Absence.js");
const sendMail =require("../controllers/sendEmail.js")
const cron = require('node-cron');

// THIS PART U SHOULD DELETE IT  {start} 
/*Add One Absence*/ 
const AddAbsence = async(req, res) => {
  try { 
      const newAbsence = await absenceModel.create(req.body);
      res.status(201).json({Absence: newAbsence, message: "Absence added with success" });
    }
catch (e) {
  res.status(400).json({
      e:e.message,
      message:"Absence Not Added"
  })
}
}
const updateListeAbsence = async (req, res) => {
  try {
    const id_personne = req.body.id_personne;
    const List_id_Absence = req.body.List_id_Absence;

    // Change it when you create a middleware !!!!!!!
    const choriste = await  personModel.findById(id_personne);

    // Check if choriste is not found
    if (!choriste) {
      console.log('Choriste not found.');
      return res.status(404).send('Choriste not found.');
    }

    // Check for duplicates before pushing
    for (const idAbsence of List_id_Absence) {
      if (!choriste.absence.includes(idAbsence)) {
        choriste.absence.push(idAbsence);
      } else {
        console.log(`Duplicate absence id ${idAbsence}. Skipping.`);
      }
    }
    choriste.nbre_absence = choriste.absence.length;
    // Save the updated choriste
    await choriste.save();

    // Return a success response if needed
    return res.status(200).json({Choriste:choriste, message:'Choriste Liste absence updated successfully.'});
  } catch (error) {
    console.error('Error updating choriste state:', error.message);
    return res.status(500).send('Internal Server Error');
  }
};

// THIS PART U SHOULD DELETE IT  {end} 

// Schedule the function to run every 1 Octobre of each year
cron.schedule('0 1 1 10 *', () => {
// Schedule the function to run every 1 minute
// cron.schedule('* * * * *', () => {
  // Execute the function
  updateChoristeStatuts();
}, {
  scheduled: true,
  timezone: 'Africa/Tunis', // Set your timezone
});



const AddChoriste = async (req, res) => {
  const id = req.body.id_personne;
  try {
    const person = await personModel.findById(id).select('-situationPro -connaissanceMusic -statut -tailleM -createdAt -__v -updatedAt -__t -_id');

    if (!person) {
      console.log('Person not found');
      return;
    }

    await personModel.deleteOne({ _id: id });

    // Check if the person is not already a choriste
    if (person.__t !== 'Choriste') {
      // Hash the CIN and use it as the password
      const hashedPassword = await bcrypt.hash(person.cin, 10);

      // Create a new Choriste document using the data from the Person
      const choristeData = {
        ...person.toObject(),
        role: 'Choriste',
        password: hashedPassword,
        // Add other attributes as needed
      };

      // Create a new Choriste document
      const newChoriste = new choristeModel(choristeData);

      // Save the new Choriste document
      await newChoriste.save();

      res.status(201).json({ Choriste: newChoriste, message: 'Choriste created successfully' });
    } else {
      res.status(201).json({ message: 'The person is already a choriste' });
    }
  } catch (e) {
    res.status(400).json({
      e: e.message,
      message: 'Choriste Not Added',
    });
  }
};

/* Find One Choriste */
const FindOneChoriste = async (req, res) => {
  try {
    let choriste = null;
    const email = req.auth.userMail;
    const id = req.body.id_personne;

    if (req.auth.userRole === "Admin") {
      choriste = await personModel.findOne({ _id: id, __t: { $in: ['Choriste', 'Chef_pupitre'] } });
    } else {
      choriste = await personModel.findOne({ email: email, __t: { $in: ['Choriste', 'Chef_pupitre'] } })
        // .select('historique statut etat -_id -__t');
    }

    if (!choriste) {
      return res.status(404).json({ message: "Choriste Not Found" });
    }

    res.status(200).json({
      choriste: choriste,
      message: "Choriste Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Choristes",
    });
  }
};


// Function to update choriste status and log history
const updateChoristeStatuts = async (req,res) => {
  try {
    // Get all choristes
    const choristes = await personModel.find({ __t: { $in: ['Choriste', 'Chef_pupitre'] } });
    // Check if choristes is empty
    if (!choristes.length) {
      return;
    }

    // Iterate through each choriste
    for (const choriste of choristes) {
      // Get the current date
      const currentDate = new Date();

      // Check if it's October 1st
      if (currentDate.getMonth() === 9 && currentDate.getDate() === 1) {
        // if (true) {
        // Log the current status and season to history
        choriste.historique.push({
          saison: choriste.saison,
          statut: choriste.statut,
          etat: choriste.etat,
        });
      
        // Check if the integration year is 2018 or 2019
        if (choriste.integration && (choriste.integration.getFullYear() === 2018 || choriste.integration.getFullYear() === 2019)) {
          choriste.statut = 'Vétéran';
        } else if (choriste.statut === 'Junior') {
          choriste.statut = 'Choriste';
        } else if (choriste.statut === 'Choriste' && choriste.saison >= 2) {
          if (choriste.repetitions >= 10 || choriste.concerts >= 2) {
            choriste.statut = 'Sénior';
          }
        }
        choriste.absence=[];
        if(choriste.etat!="Eliminé"){choriste.etat="Actif"}
        choriste.nbre_absence=0;
        // Increment the season
        choriste.saison += 1;

        // Save the updated choriste
        await choriste.save();
        console.log('Choriste statuses updated successfully');
      }
    }
   
    
  
  } catch (error) {
    console.error('Error updating choriste statuses:', error.message);
};}
const updateChoristeEtat = async (req, res) => {
  try {
    const id = req.body.choristeId;
    const choriste = await personModel.findOne({ _id: id, __t: { $in: ['Choriste', 'Chef_pupitre'] } });
    console.log(choriste);

    // Check if choriste is not found
    if (!choriste) {
      console.log('Choriste not found.');
      return res.status(404).send('Choriste not found.');
    }

    // Log the current state to history
    choriste.historique.push({
      saison: choriste.saison,
      statut: choriste.statut,
      etat: choriste.etat,
    });

    // Check if the current state is different from "Encongé"
    if (choriste.etat !== 'Encongé') {
      // Update the state to "Encongé"
      choriste.etat = 'Encongé';
    } else {
      // Search in history for the last state different from 'Encongé', 'Absence', and 'Eliminé'
      let foundState = null;
      for (let i = choriste.historique.length - 1; i >= 0; i--) {
        const historyEntry = choriste.historique[i];
        if (historyEntry.etat !== 'Encongé' && historyEntry.etat !== 'Absence' && historyEntry.etat !== 'Eliminé') {
          // Update the state to the last non-"Encongé" state from history
          choriste.etat = historyEntry.etat;
          foundState = historyEntry.etat;
          break; // Exit the loop once a suitable state is found
        }
      }
      if (!foundState) {
     
        return res.status(200).send('No suitable state found in history.');
      }
    }

    // Save the updated choriste
    const Choriste = await choriste.save();
    const responsePayload = {
      etat: Choriste.etat,
      historique: Choriste.historique,
    };
    
    return res.status(200).send({ Choriste: responsePayload, message: `Choriste state updated successfully to ${choriste.etat}` });
    
  } catch (error) {
    console.error('Error updating choriste state:', error.message);
    return res.status(500).send('Internal Server Error');
  }
};





/* Fetch list of Absence */
const FindAbsenceOfOneChoriste = async (req, res) => {
  try {
    const id_personne=req.body.id_personne
    // Change it when you create a middleware !!!!!!!!!!!!
    const choriste = await personModel.findOne({ _id: id_personne, __t: { $in: ['Choriste'] } })
      .select('absence -__t').populate({path:'absence',select: '-_id -createdAt -updatedAt -__v'}).exec();

    if (!choriste) {
      return res.status(404).json({ message: "Choriste Not Found" });
    }

    res.status(200).json({
      choriste: choriste,
      message: "Choriste Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Choristes",
    });
  }
  };


  const EtatNomineElimine = async (req, res) => {
    try {
      
      const choristeId = req.body.choristeId;

      
      const choriste = await choristeModel.findById(choristeId).populate('absence');
  
      if (!choriste) {
        return res.status(404).json({ message: 'Choriste not found.' });
      }
      const SeuilNomination = choriste.SeuilNomination;
      const SeuilElimination = choriste.SeuilElimination;
      const numberOfAbsences=choriste.nbre_absence;
  

  
      const oldEtat = choriste.etat;
  
      // Update etat based on the number of absences
      if (numberOfAbsences >= SeuilElimination) {
        choriste.etat = 'Eliminé';
        await SendMailElemine(choriste.email);
      } else if (numberOfAbsences >= SeuilNomination) {
        choriste.etat = 'Nominé';
        await SendMailNomines(choriste.email);
      } else {
        choriste.etat = 'Actif';
      }
  
      // Check if etat has changed
      if (choriste.etat !== oldEtat) {
        await choriste.save();
  
        return res.status(200).json({
          message: 'Etat updated successfully.',
          etat: choriste.etat,
          numberOfAbsences,
        });
      }
  
      return res.status(200).json({
        message: 'Etat not updated. No change.',
        etat: choriste.etat,
        numberOfAbsences,
      });
    } catch (error) {
      console.error('Error updating etat:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

// b
const SendMailNomines = async (email) => {
  try {
    const resetURL = `<h1>Your are Nominated</h1>`;
    const data = {
      to: email, // Use the provided email directly
      text: `Any Text For Test`,
      subject: "Alert Nomination",
      html: resetURL, // Fix the property name to 'html'
    };

    await sendMail(data);

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error in SendMailNomines:", error);
    throw error; // Propagate the error to handle it in the calling function if needed
  }
};
const SendMailElemine = async (email) => {
  try {
    const resetURL = `<h1>Your are Eleminated</h1>`;
    const data = {
      to: email, // Use the provided email directly
      text: `Any Text For Test`,
      subject: "Alert Elemination",
      html: resetURL, // Fix the property name to 'html'
    };

    await sendMail(data);

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error in SendMailElemines:", error);
    throw error; // Propagate the error to handle it in the calling function if needed
  }
};
/*Find All Elimine*/ 
const FindListElimine = async (req, res) => {
  try {
    const Elimines = await choristeModel.find({etat:"Eliminé"});
    
    if (!Elimines || Elimines.length === 0) {
      return res.status(404).json({ message: "Elimine Not Found" });
    }

    res.status(200).json({
      Elimines: Elimines,
      message: "Elimine Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Elimine",
    });
  }
};
/*Find All Nomine*/ 
const FindListNomine = async (req, res) => {
  try {
    const Nomines = await choristeModel.find({etat: 'Nominé' });
    
    if (!Nomines || Nomines.length === 0) {
      return res.status(404).json({ message: "Nomine Not Found" });
    }

    res.status(200).json({
      Nomines: Nomines,
      message: "Nomine Found!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "We can't fetch Nomine",
    });
  }
};

// Function to update choriste status and log history
const updateChoristeSeuils = async (req,res) => {
  try {
    const { SeuilNomination, SeuilElimination } = req.body;

    // Update SeuilNomination and SeuilElimination values for all choristes
    const choristes = await personModel.find({ __t: { $in: ['Choriste', 'Chef_pupitre'] } });

    // Update SeuilNomination and SeuilElimination values for each choriste
    for (const choriste of choristes) {
      choriste.SeuilNomination = SeuilNomination;
      choriste.SeuilElimination = SeuilElimination;
      await choriste.save();
    }
    res.json({  message: 'Seuils updated successfully for all choristes.' });
  } catch (error) {
    console.error('Error updating Seuils:', error.message);
    res.status(500).json({error: 'Internal Server Error' });
  };}
 
 // Function Eliminer choriste pour une raison disciplinaire
const   ElimineChoriste = async (req,res) => {
  try {
    const { id_choriste } = req.body;

    // Find the choriste by ID
    const choriste = await personModel.findOne({ _id: id_choriste, __t: { $in: ['Choriste', 'Chef_pupitre'] } });

    if (!choriste) {
      return res.status(404).json({ message: 'Choriste not found.' });
    }

    // Get the new etat (e.g., 'Eliminé')
    const newEtat = 'Eliminé';

    // Update etat for the specified choriste
    choriste.etat = newEtat;
    choriste.password = null;
    const Choriste = await choriste.save();
    const responsePayload = {
      etat: Choriste.etat,
      historique: Choriste.historique,
    };   
    return res.json({ Choriste: responsePayload, message: 'etat updated successfully for choriste.' });
    
  } catch (error) {
    console.error('Error updating etat:', error.message);
    res.status(500).json({error: 'Internal Server Error' });
  };}


    const updateEtatInactif = async (req, res) => {
      try {
        const email =req.auth.userMail;
        const choriste = await personModel.findOne({ email: email, __t: { $in: ['Choriste', 'Chef_pupitre'] } });
    
    
        // Check if choriste is not found
        if (!choriste) {
          console.log('Choriste not found.');
          return res.status(404).send('Choriste not found.');
        }
    
        // Log the current state to history
        choriste.historique.push({
          saison: choriste.saison,
          statut: choriste.statut,
          etat: choriste.etat,
        });
    
        // Check if the current state is different from "Encongé"
        if (choriste.etat !== 'Inactif') {
          // Update the state to "Encongé"
          choriste.etat = 'Inactif';
        } else {
          // Search in history for the last state different from 'Encongé', 'Absence', and 'Eliminé'
          let foundState = null;
          for (let i = choriste.historique.length - 1; i >= 0; i--) {
            const historyEntry = choriste.historique[i];
            if (historyEntry.etat !== 'Inactif' && historyEntry.etat !== 'Absence' && historyEntry.etat !== 'Eliminé'&& historyEntry.etat !== 'Encongé') {
              // Update the state to the last non-"Encongé" state from history
              choriste.etat = historyEntry.etat;
              foundState = historyEntry.etat;
              break; // Exit the loop once a suitable state is found
            }
          }
          if (!foundState) {
            console.log('No suitable state found in history.');
            return res.status(200).send('No suitable state found in history.');
          }
        }
    
        // Save the updated choriste
        await choriste.save();
    
        console.log(`Choriste state updated successfully to ${choriste.etat}`);
        return res.status(200).send(`Choriste state updated successfully to ${choriste.etat}`);
      } catch (error) {
        console.error('Error updating choriste state:', error.message);
        return res.status(500).send('Internal Server Error');
      }
    };
  
module.exports = {
  updateListeAbsence,AddAbsence,AddChoriste,FindOneChoriste,updateChoristeEtat,
  FindAbsenceOfOneChoriste,EtatNomineElimine,SendMailElemine,FindListElimine,
  FindListNomine,updateChoristeSeuils,ElimineChoriste,updateEtatInactif
  // ,SendMailNomines,
};


