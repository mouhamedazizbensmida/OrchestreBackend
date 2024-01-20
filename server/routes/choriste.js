
const express = require("express");
const {
    updateListeAbsence,
    AddAbsence,
    AddChoriste,
    FindOneChoriste,
    updateChoristeEtat,FindAbsenceOfOneChoriste,
    EtatNomineElimine,FindListElimine,
    FindListNomine,updateChoristeSeuils,
    ElimineChoriste,updateEtatInactif
    // SendMailNomines,
} = require("../controllers/Choriste.js");
const {loggedMiddleware,ChoristeMiddleware,conditionalMiddleware,} =require("../middlewares/PersonAuthMiddelware.js")
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Choriste
 *   description: API operations for managing Choristes
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Absence:
 *       type: object
 *       properties:
 *         date_abs:
 *           type: string
 *           format: date-time
 *           description: Date of the absence
 *         raison:
 *           type: string
 *           description: Reason for the absence
 *       required:
 *         - raison
 *
 * /choriste/AddAbsence:
 *   post:
 *     summary: Add an absence
 *     description: Add a new absence with the provided date and reason
 *     tags: [Absence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Absence'
 *     responses:
 *       201:
 *         description: Absence added successfully
 *         content:
 *           application/json:
 *             example:
 *               Absence:
 *                 date_abs: "2024-01-19T12:00:00.000Z"
 *                 raison: "Sick Leave"
 *               message: "Absence added with success"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Absence Not Added"
 */
router.post('/AddAbsence', AddAbsence)
/**
 * @swagger
 * /choriste/updateEtatInactif:
 *   post:
 *     summary: Update choriste state to "Inactif"
 *     description: Update the state of the authenticated choriste to "Inactif" and maintain a history of state changes.
 *     tags: [Choriste]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Choriste state updated successfully
 *         content:
 *           text/plain:
 *             example: "Choriste state updated successfully to Inactif"
 *       404:
 *         description: Choriste not found
 *         content:
 *           text/plain:
 *             example: "Choriste not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           text/plain:
 *             example: "Internal Server Error"
 */
router.post('/updateEtatInactif',loggedMiddleware,ChoristeMiddleware, updateEtatInactif)
/**
 * @swagger
 * /choriste/AddChoriste:
 *   post:
 *     summary: Add a new choriste
 *     description: Add a new choriste using the provided person data. The person will be deleted, and a new choriste document will be created.
 *     tags: [Choriste]
 *     requestBody:
 *       description: Person data to create a new choriste
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id_personne: 12345
 *     responses:
 *       201:
 *         description: Choriste created successfully
 *         content:
 *           application/json:
 *             example:
 *               Choriste:
 *                 _id: '...'
 *                 cin: '...'
 *                 role: 'Choriste'
 *                 otherAttribute: '...'
 *               message: 'Choriste created successfully'
 *       400:
 *         description: Choriste not added
 *         content:
 *           application/json:
 *             example:
 *               e: 'Error message'
 *               message: 'Choriste not added'
 */
router.post('/AddChoriste', AddChoriste)
/**
 * @swagger
 * /choriste/FindOneChoriste:
 *   get:
 *     summary: Find one choriste
 *     description: Find details of a choriste based on the user's role. Admins can find any choriste, while Choristes and Chef_pupitres can find their own details.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_personne
 *         in: query
 *         description: The ID of the person (applicable for admins)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Choriste found successfully
 *         content:
 *           application/json:
 *             example:
 *               choriste:
 *                 _id: '...'
 *                 cin: '...'
 *                 role: 'Choriste'
 *                 otherAttribute: '...'
 *               message: 'Choriste Found!!'
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste Not Found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error message'
 *               message: "We can't fetch Choristes"
 */
router.get('/FindOneChoriste',loggedMiddleware,conditionalMiddleware,FindOneChoriste)
/**
 * @swagger
 * /choriste/updateChoristeEtat:
 *   patch:
 *     summary: Update choriste state to "Encongé"
 *     description: Update the state of a choriste to "Encongé" and log the change in history.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choristeId:
 *                 type: string
 *                 description: The ID of the choriste to be updated
 *             required:
 *               - choristeId
 *     responses:
 *       200:
 *         description: Choriste state updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste state updated successfully to Encongé'
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste not found.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error message'
 *               message: 'Internal Server Error'
 */
router.patch('/updateChoristeEtat',updateChoristeEtat)
/**
 * @swagger
 * /choriste/FindAbsenceOfOneChoriste:
 *   get:
 *     summary: Fetch list of absence for a choriste
 *     description: Retrieve the list of absences for a choriste.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_personne
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the choriste for whom to fetch absences
 *     responses:
 *       200:
 *         description: List of absences fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               choriste: { _id: '...', absence: [{ _id: '...', date_abs: '...', raison: '...' }], ...otherAttributes }
 *               message: 'Choriste Found!!'
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste Not Found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Error message'
 *               message: 'Internal Server Error'
 */
router.get('/FindAbsenceOfOneChoriste', FindAbsenceOfOneChoriste),
/**
 * @swagger
 * /choriste/EtatNomineElimine:
 *   patch:
 *     summary: Update choriste's state (Nominé, Eliminé, or Actif) based on the number of absences
 *     description: Updates the state (Nominé, Eliminé, or Actif) of a choriste based on the number of absences.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             choristeId: '...'
 *     responses:
 *       200:
 *         description: Etat updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Etat updated successfully.'
 *               etat: 'Nominé'
 *               numberOfAbsences: 5
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste not found.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.patch('/EtatNomineElimine',EtatNomineElimine)
/**
 * @swagger
 * /choriste/updateChoristeSeuils:
 *   patch:
 *     summary: Update SeuilNomination and SeuilElimination values for all choristes
 *     description: Updates the SeuilNomination and SeuilElimination values for all choristes.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             SeuilNomination: 5
 *             SeuilElimination: 10
 *     responses:
 *       200:
 *         description: Seuils updated successfully for all choristes
 *         content:
 *           application/json:
 *             example:
 *               message: 'Seuils updated successfully for all choristes.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.patch('/updateChoristeSeuils',updateChoristeSeuils)

/**
 * @swagger
 * /choriste/updateListeAbsence:
 *   patch:
 *     summary: Update the list of absences for a choriste
 *     description: Updates the list of absences for a choriste by adding the specified absence IDs.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             id_personne: 'choriste_id'
 *             List_id_Absence: ['absence_id1', 'absence_id2']
 *     responses:
 *       200:
 *         description: Choriste Liste absence updated successfully
 *         content:
 *           application/json:
 *             example:
 *               Choriste: { _id: 'choriste_id', ...otherAttributes, absence: ['absence_id1', 'absence_id2'], nbre_absence: 2 }
 *               message: 'Choriste Liste absence updated successfully.'
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Choriste not found.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.patch('/updateListeAbsence',updateListeAbsence)
/**
 * @swagger
 * /choriste/FindListElimine:
 *   get:
 *     summary: Retrieve a list of eliminated choristes
 *     description: Retrieves a list of choristes with the state 'Eliminé'.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of eliminated choristes
 *         content:
 *           application/json:
 *             example:
 *               Elimines: 
 *                 - { _id: 'choriste_id1', ...otherAttributes1, etat: 'Eliminé' }
 *                 - { _id: 'choriste_id2', ...otherAttributes2, etat: 'Eliminé' }
 *               message: 'Elimine Found!!'
 *       404:
 *         description: Elimine Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Elimine Not Found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.get('/FindListElimine', FindListElimine)
/**
 * @swagger
 * /choriste/FindListNomine:
 *   get:
 *     summary: Retrieve a list of nominated choristes
 *     description: Retrieves a list of choristes with the state 'Nominé'.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of nominated choristes
 *         content:
 *           application/json:
 *             example:
 *               Nomines: 
 *                 - { _id: 'choriste_id1', ...otherAttributes1, etat: 'Nominé' }
 *                 - { _id: 'choriste_id2', ...otherAttributes2, etat: 'Nominé' }
 *               message: 'Nomine Found!!'
 *       404:
 *         description: Nomine Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Nomine Not Found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.get('/FindListNomine', FindListNomine)
/**
 * @swagger
 * /choriste/ElimineChoriste:
 *   patch:
 *     summary: Eliminate a choriste
 *     description: Updates the state of a choriste to 'Eliminé'.
 *     tags: [Choriste]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_choriste:
 *                 type: string
 *                 description: The ID of the choriste to be eliminated.
 *                 example: 'choriste_id1'
 *     responses:
 *       200:
 *         description: Choriste eliminated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'etat updated successfully for choriste.'
 *       404:
 *         description: Choriste not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Choriste not found.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.patch('/ElimineChoriste',ElimineChoriste)
module.exports = router;