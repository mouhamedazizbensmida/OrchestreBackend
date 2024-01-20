const express = require("express");
const {
    parseExcelFile,
    AddConcert,
    FindAllConcerts,
    FindOneConcert,
    UpdateConcert,
    DeleteConcert
} = require("../controllers/Concert.js");

const {
    AddOeuvre,
    FindAllOeuvre,
    FindOneOeuvre,
    UpdateOeuvre,
    DeleteOeuvre
} = require("../controllers/Oeuvre.js");

const {
    AddProgramme,
    FindAllProgramme,
    FindOneProgramme,
    UpdateProgramme,
    DeleteProgramme,
    DeleteReferenceOeuvreFromList_Oeuvre
} = require("../controllers/Programme.js");

const router = express.Router();

// CRUD Oeuvre
/**
 * @swagger
 * tags:
 *   name: Oeuvre
 *   description: API operations for managing Oeuvres
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Oeuvre:
 *       type: object
 *       properties:
 *         titre:
 *           type: string
 *           description: The title of the Oeuvre
 *         compositeurs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of composer IDs
 *         arrangeurs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of arranger IDs
 *         annee:
 *           type: number
 *           description: The year of the Oeuvre
 *         genre:
 *           type: string
 *           description: The genre of the Oeuvre
 *         paroles:
 *           type: string
 *           description: The lyrics of the Oeuvre
 *         partition:
 *           type: string
 *           description: The musical partition of the Oeuvre
 *         aPartieChorale:
 *           type: boolean
 *           description: Indicates if the Oeuvre has a choral part
 *         sectionsChorale:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of choral sections
 *         choeur:
 *           type: string
 *           enum: ['true', 'false', 'oui', 'non', 'ey', 'le']
 *           description: The type of choir (enumeration)
 *
 * /concert/AddOeuvre:
 *   post:
 *     summary: Add a new Oeuvre
 *     description: Add a new Oeuvre to the database
 *     tags: [Oeuvre]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Oeuvre'
 *     responses:
 *       201:
 *         description: Oeuvre added successfully
 *         content:
 *           application/json:
 *             example:
 *               Oeuvre: {
 *                 titre: "Example Oeuvre",
 *                 compositeurs: ["composer1", "composer2"],
 *                 arrangeurs: ["arranger1"],
 *                 annee: 2022,
 *                 genre: "Classical",
 *                 paroles: "Lorem ipsum lyrics",
 *                 partition: "Example partition",
 *                 aPartieChorale: true,
 *                 sectionsChorale: ["Chorus 1", "Chorus 2"],
 *                 choeur: "oui"
 *               }
 *               message: Oeuvre added with success
 *       400:
 *         description: Oeuvre not added
 *         content:
 *           application/json:
 *             example:
 *               error: "Error message"
 *               message: Oeuvre Not Added
 */

router.post('/AddOeuvre', AddOeuvre)
/**
 * @swagger
 * /concert/FindAllOeuvre:
 *   get:
 *     summary: Get all Oeuvres
 *     description: Retrieve a list of all Oeuvres from the database
 *     tags: [Oeuvre]
 *     responses:
 *       200:
 *         description: Oeuvres retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               Oeuvres: [
 *                 {
 *                   titre: "Example Oeuvre 1",
 *                   compositeurs: ["composer1", "composer2"],
 *                   arrangeurs: ["arranger1"],
 *                   annee: 2022,
 *                   genre: "Classical",
 *                   paroles: "Lorem ipsum lyrics",
 *                   partition: "Example partition 1",
 *                   aPartieChorale: true,
 *                   sectionsChorale: ["Chorus 1", "Chorus 2"],
 *                   choeur: "oui"
 *                 },
 *                 {
 *                   titre: "Example Oeuvre 2",
 *                   compositeurs: ["composer3", "composer4"],
 *                   arrangeurs: ["arranger2"],
 *                   annee: 2023,
 *                   genre: "Jazz",
 *                   paroles: "Dolor sit amet lyrics",
 *                   partition: "Example partition 2",
 *                   aPartieChorale: false,
 *                   sectionsChorale: [],
 *                   choeur: "non"
 *                 }
 *               ]
 *               message: "Oeuvres Founded!!"
 *       404:
 *         description: No Oeuvres found
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvres Not Found"
 *       500:
 *         description: Unable to fetch Oeuvres
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't fetch Oeuvres"
 */
router.get('/FindAllOeuvre', FindAllOeuvre)
/**
 * @swagger
 * /concert/FindOneOeuvre/{id}:
 *   get:
 *     summary: Get one Oeuvre by ID
 *     description: Retrieve details of a specific Oeuvre using its ID
 *     tags: [Oeuvre]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Oeuvre to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oeuvre retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               Oeuvres: {
 *                 titre: "Example Oeuvre",
 *                 compositeurs: ["composer1", "composer2"],
 *                 arrangeurs: ["arranger1"],
 *                 annee: 2022,
 *                 genre: "Classical",
 *                 paroles: "Lorem ipsum lyrics",
 *                 partition: "Example partition",
 *                 aPartieChorale: true,
 *                 sectionsChorale: ["Chorus 1", "Chorus 2"],
 *                 choeur: "oui"
 *               }
 *               message: "Oeuvre Founded!!"
 *       404:
 *         description: Oeuvre not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvre Not Found"
 *       500:
 *         description: Unable to fetch Oeuvre
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't fetch Oeuvre"
 */
router.get('/FindOneOeuvre/:id', FindOneOeuvre)
/**
 * @swagger
 * /concert/UpdateOeuvre/{id}:
 *   patch:
 *     summary: Update one Oeuvre by ID
 *     description: Update details of a specific Oeuvre using its ID
 *     tags: [Oeuvre]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Oeuvre to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New data for updating the Oeuvre
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Oeuvre'
 *     responses:
 *       200:
 *         description: Oeuvre updated successfully
 *         content:
 *           application/json:
 *             example:
 *               Oeuvres: {
 *                 titre: "Updated Example Oeuvre",
 *                 compositeurs: ["composer1", "composer2"],
 *                 arrangeurs: ["arranger1"],
 *                 annee: 2023,
 *                 genre: "Updated Genre",
 *                 paroles: "Updated Lorem ipsum lyrics",
 *                 partition: "Updated Example partition",
 *                 aPartieChorale: false,
 *                 sectionsChorale: [],
 *                 choeur: "non"
 *               }
 *               message: "Oeuvre Updated!!"
 *       404:
 *         description: Oeuvre not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvre Not Found"
 *       500:
 *         description: Unable to update Oeuvre
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't Update Oeuvre"
 */
router.patch('/UpdateOeuvre/:id',UpdateOeuvre)
/**
 * @swagger
 * /concert/DeleteOeuvre/{id}:
 *   delete:
 *     summary: Delete one Oeuvre by ID
 *     description: Delete a specific Oeuvre using its ID and remove associated references in Programme documents
 *     tags: [Oeuvre]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Oeuvre to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oeuvre deleted successfully along with associated references
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvre and associated references in programme list deleted successfully"
 *       404:
 *         description: Oeuvre not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvre not found"
 *       500:
 *         description: Unable to delete Oeuvre
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Unable to delete Oeuvre"
 */
router.delete('/DeleteOeuvre/:id', DeleteOeuvre)
// CRUD Programme
/**
 * @swagger
 * tags:
 *   name: Programme
 *   description: API operations for managing Programme
*/
/**
 * @swagger
 * /concert/AddProgramme:
 *   post:
 *     summary: Add a new Programme
 *     description: Add a new Programme to the database
 *     tags: [Programme]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Programme'
 *     responses:
 *       201:
 *         description: Programme added successfully
 *         content:
 *           application/json:
 *             example:
 *               Programme:
 *                 nom_programme: "Example Programme"
 *                 oeuvres_liste: []  # Assuming an empty array for the oeuvres_liste field
 *               message: "Programme added with success"
 *       400:
 *         description: Programme not added
 *         content:
 *           application/json:
 *             example:
 *               error: "Error message"
 *               message: "Programme Not Added"
 */
router.post('/AddProgramme', AddProgramme)
/**
 * @swagger
 * /concert/FindAllProgramme:
 *   get:
 *     summary: Retrieve all Programmes
 *     description: Retrieve a list of all Programmes with associated Oeuvres
 *     tags: [Programme]
 *     responses:
 *       200:
 *         description: Programmes retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               Programmes: [
 *                 {
 *                   nom_programme: "Example Programme 1",
 *                   oeuvres_liste: [
 *                     {
 *                       titre: "Oeuvre 1",
 *                       compositeurs: ["composer1"],
 *                       arrangeurs: ["arranger1"],
 *                       annee: 2022,
 *                       genre: "Classical",
 *                       paroles: "Lorem ipsum lyrics",
 *                       partition: "Example partition",
 *                       aPartieChorale: true,
 *                       sectionsChorale: ["Chorus 1", "Chorus 2"],
 *                       choeur: "oui"
 *                     },
 *                     // ... additional Oeuvres
 *                   ]
 *                 },
 *                 // ... additional Programmes
 *               ]
 *               message: "Programmes Founded!!"
 *       404:
 *         description: Programmes not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Programmes Not Found"
 *       500:
 *         description: Unable to fetch Programmes
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't fetch Programmes"
 */
router.get('/FindAllProgramme', FindAllProgramme)
/**
 * @swagger
 * /concert/FindOneProgramme/{id}:
 *   get:
 *     summary: Retrieve one Programme by ID
 *     description: Retrieve a specific Programme by its ID with associated Oeuvres
 *     tags: [Programme]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Programme to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Programme retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               Programmes: {
 *                 nom_programme: "Example Programme",
 *                 oeuvres_liste: [
 *                   {
 *                     titre: "Oeuvre 1",
 *                     compositeurs: ["composer1"],
 *                     arrangeurs: ["arranger1"],
 *                     annee: 2022,
 *                     genre: "Classical",
 *                     paroles: "Lorem ipsum lyrics",
 *                     partition: "Example partition",
 *                     aPartieChorale: true,
 *                     sectionsChorale: ["Chorus 1", "Chorus 2"],
 *                     choeur: "oui"
 *                   },
 *                   // ... additional Oeuvres
 *                 ]
 *               }
 *               message: "Programme Founded!!"
 *       404:
 *         description: Programme not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Programme Not Found"
 *       500:
 *         description: Unable to fetch Programme
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't fetch Programme"
 */
router.get('/FindOneProgramme/:id', FindOneProgramme)
/**
 * @swagger
 * /concert/UpdateProgramme/{id}:
 *   patch:
 *     summary: Update one Programme by ID
 *     description: Update a specific Programme by its ID
 *     tags: [Programme]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Programme to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_programme:
 *                 type: string
 *               oeuvres_liste:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - nom_programme
 *     responses:
 *       200:
 *         description: Programme updated successfully
 *         content:
 *           application/json:
 *             example:
 *               Programme: {
 *                 nom_programme: "Updated Programme",
 *                 oeuvres_liste: ["updatedOeuvre1", "updatedOeuvre2"],
 *               }
 *               message: "Programme Updated!!"
 *       404:
 *         description: Programme not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Programme Not Found"
 *       500:
 *         description: Unable to update Programme
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't Update Programme"
 */
router.patch('/UpdateProgramme/:id',UpdateProgramme)
/**
 * @swagger
 * /concert/DeleteProgramme/{id}:
 *   delete:
 *     summary: Delete one Programme by ID
 *     description: Delete a specific Programme by its ID
 *     tags: [Programme]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Programme to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Programme and associated references in concerts deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Programme and Associated with Concerts Deleted With Success"
 *       404:
 *         description: Programme not found
 *         content:
 *           application/json:
 *             example:
 *               message: "The Programme Was Not Found To Be Deleted. Try Another ID"
 *       500:
 *         description: Unable to delete Programme
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "We can't Delete Programme"
 */
router.delete('/DeleteProgramme/:id', DeleteProgramme)
/**
 * @swagger
 * /concert/DeleteReferenceOeuvreFromList_Oeuvre/{idProg}/{idOeuvre}:
 *   delete:
 *     summary: Delete reference Oeuvre From List_Oeuvre
 *     description: Remove the reference of an Oeuvre from the oeuvres_liste array in a specific Programme document
 *     tags: [Programme]
 *     parameters:
 *       - in: path
 *         name: idProg
 *         description: ID of the Programme from which the Oeuvre reference will be removed
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idOeuvre
 *         description: ID of the Oeuvre to be removed from the oeuvres_liste array
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oeuvre and associated references in programme list deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Oeuvre and associated references in programme list deleted successfully"
 *       500:
 *         description: Unable to delete reference Oeuvre From List_Oeuvre
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Unable to delete reference Oeuvre From List_Oeuvre"
 */
router.delete('/DeleteReferenceOeuvreFromList_Oeuvre/:idProg/:idOeuvre', DeleteReferenceOeuvreFromList_Oeuvre)
// CRUD Concert
/**
 * @swagger
 * tags:
 *   name: Concert
 *   description: API operations for managing Concerts
*/

/**
 * @swagger
 * /concert/parseExcelFile:
 *   post:
 *     summary: Parse Excel File
 *     description: Parse an Excel file and update/create Oeuvres and Programmes accordingly, then associate them with a Concert
 *     tags: [Concert]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: The request body containing the file path of the Excel file to be parsed
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             filePath:
 *               type: string
 *               description: The path of the Excel file to be parsed
 *     responses:
 *       200:
 *         description: Excel file processed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Excel file processed successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
router.post('/parseExcelFile', parseExcelFile)
/**
 * @swagger
 * components:
 *   schemas:
 *     ConcertData:
 *       type: object
 *       properties:
 *         Date:
 *           type: string
 *           format: date
 *           description: The date of the Concert
 *         lieu:
 *           type: string
 *           description: The location of the Concert
 *         programme_concert:
 *           type: string
 *           description: The ID of the associated Programme
 *
 *     ConcertResponse:
 *       type: object
 *       properties:
 *         Concert:
 *           $ref: '#/components/schemas/ConcertData'
 *         message:
 *           type: string
 *
 *   responses:
 *     ConcertSuccessResponse:
 *       description: Concert operation successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcertResponse'
 *
 *     ConcertErrorResponse:
 *       description: Failed to perform Concert operation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *
 * /concert/AddConcert:
 *   post:
 *     summary: Add Concert
 *     description: Add a new Concert.
 *     tags: [Concert]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: concertData
 *         description: Concert data to be added
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ConcertData'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ConcertSuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ConcertErrorResponse'
 */
router.post('/AddConcert', AddConcert)
/**
 * @swagger
 * components:
 *   schemas:
 *     ConcertData:
 *       type: object
 *       properties:
 *         Date:
 *           type: string
 *           format: date
 *           description: The date of the Concert
 *         lieu:
 *           type: string
 *           description: The location of the Concert
 *         programme_concert:
 *           type: object
 *           properties:
 *             nom_programme:
 *               type: string
 *               description: The name of the associated Programme
 *             oeuvres_liste:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   titre:
 *                     type: string
 *                     description: The title of the associated Oeuvre
 *
 *     ConcertResponse:
 *       type: object
 *       properties:
 *         Concert:
 *           $ref: '#/components/schemas/ConcertData'
 *         message:
 *           type: string
 *
 *   responses:
 *     ConcertSuccessResponse:
 *       description: Concert operation successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcertResponse'
 *
 *     ConcertNotFoundResponse:
 *       description: Concert not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Concert Not Found
 *
 *     ConcertErrorResponse:
 *       description: Failed to perform Concert operation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *
 * /concert/FindAllConcerts:
 *   get:
 *     summary: Find All Concerts
 *     description: Retrieve a list of all Concerts.
 *     tags: [Concert]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ConcertSuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ConcertNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ConcertErrorResponse'
 */
router.get('/FindAllConcerts', FindAllConcerts)
/**
 * @swagger
 * components:
 *   schemas:
 *     ConcertData:
 *       type: object
 *       properties:
 *         Date:
 *           type: string
 *           format: date
 *           description: The date of the Concert
 *         lieu:
 *           type: string
 *           description: The location of the Concert
 *         programme_concert:
 *           type: object
 *           properties:
 *             nom_programme:
 *               type: string
 *               description: The name of the associated Programme
 *             oeuvres_liste:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   titre:
 *                     type: string
 *                     description: The title of the associated Oeuvre
 *
 *     ConcertResponse:
 *       type: object
 *       properties:
 *         Concert:
 *           $ref: '#/components/schemas/ConcertData'
 *         message:
 *           type: string
 *
 *   responses:
 *     ConcertSuccessResponse:
 *       description: Concert operation successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcertResponse'
 *
 *     ConcertNotFoundResponse:
 *       description: Concert not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Concert Not Found
 *
 *     ConcertErrorResponse:
 *       description: Failed to perform Concert operation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *
 * /concert/FindOneConcert/{id}:
 *   get:
 *     summary: Find One Concert
 *     description: Retrieve details of a specific Concert by ID.
 *     tags: [Concert]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Concert to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ConcertSuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ConcertNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ConcertErrorResponse'
 */
router.get('/FindOneConcert/:id', FindOneConcert)
/**
 * @swagger
 * components:
 *   schemas:
 *     ConcertUpdateData:
 *       type: object
 *       properties:
 *         Date:
 *           type: string
 *           format: date
 *           description: The updated date of the Concert
 *         lieu:
 *           type: string
 *           description: The updated location of the Concert
 *
 *     ConcertUpdateResponse:
 *       type: object
 *       properties:
 *         Concert:
 *           $ref: '#/components/schemas/ConcertUpdateData'
 *         message:
 *           type: string
 *
 *   responses:
 *     ConcertUpdateSuccessResponse:
 *       description: Concert update successful
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcertUpdateResponse'
 *
 *     ConcertUpdateNotFoundResponse:
 *       description: Concert not found for update
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Concert Not Found
 *
 *     ConcertUpdateErrorResponse:
 *       description: Failed to update Concert
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *
 * /concert/UpdateConcert/{id}:
 *   patch:
 *     summary: Update One Concert
 *     description: Update details of a specific Concert by ID.
 *     tags: [Concert]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Concert to update
 *         required: true
 *         schema:
 *           type: string
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConcertUpdateData'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ConcertUpdateSuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ConcertUpdateNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ConcertUpdateErrorResponse'
 */
router.patch('/UpdateConcert/:id',UpdateConcert)
/**
 * @swagger
 * components:
 *   responses:
 *     ConcertDeleteSuccessResponse:
 *       description: Concert delete successful
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Concert Deleted With Success
 *
 *     ConcertDeleteNotFoundResponse:
 *       description: Concert not found for deletion
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: The Concert Was Not Found To Be Deleted. Try Another ID
 *
 *     ConcertDeleteErrorResponse:
 *       description: Failed to delete Concert
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *
 * /concert/DeleteConcert/{id}:
 *   delete:
 *     summary: Delete One Concert
 *     description: Delete a specific Concert by ID.
 *     tags: [Concert]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Concert to delete
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ConcertDeleteSuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ConcertDeleteNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/ConcertDeleteErrorResponse'
 */
router.delete('/DeleteConcert/:id', DeleteConcert)




module.exports = router;