const express = require("express");
const {
    AddAudition,
    FindAllAuditions,
    FindOneAudition,
    UpdateAudition,
    AddCandidat,
    DeleteAudition,
    AddPersonne,
  } = require("../controllers/Audition.js");
  
  const router = express.Router();
  
  /**
   * @swagger
   * tags:
   *   name: Audition
   *   description: API operations for managing Auditions
   */
  
  /**
 * @swagger
 * components:
 *   schemas:
 *     AuditionData:
 *       type: object
 *       properties:
 *         candidat_info:
 *           type: string
 *           description: The ID of the candidate associated with the audition
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the audition
 *         heureDeb:
 *           type: string
 *           description: The starting time of the audition
 *         heureFin:
 *           type: string
 *           description: The ending time of the audition
 *         numero_aud:
 *           type: number
 *           description: The audition number
 * 
 *   responses:
 *     AuditionAddedResponse:
 *       description: Audition added successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Audition:
 *                 $ref: '#/components/schemas/AuditionData'
 *               message:
 *                 type: string
 *                 example: Audition added successfully
 *
 *     AuditionNotAddedResponse:
 *       description: Audition not added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *               message:
 *                 type: string
 *                 example: Audition not added
 *
 * /audition/AddAudition:
 *   post:
 *     summary: Add One Audition
 *     description: Add a new Audition to the database
 *     tags: [Audition]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditionData'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/AuditionAddedResponse'
 *       400:
 *         $ref: '#/components/responses/AuditionNotAddedResponse'
 */
  
  router.post("/AddAudition", AddAudition);
/**
 * @swagger
 * components:
 *   responses:
 *     AuditionsFoundResponse:
 *       description: Auditions found successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auditions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     numero_aud:
 *                       type: number
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     heureDeb:
 *                       type: string
 *                     heureFin:
 *                       type: string
 *                     candidat_info:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         cin:
 *                           type: string
 *                         role:
 *                           type: string
 *                         nom:
 *                           type: string
 *                         prenom:
 *                           type: string
 *                         email:
 *                           type: string
 *                         sexe:
 *                           type: string
 *                         tel:
 *                           type: string
 *                         password:
 *                           type: string
 *                         tailleM:
 *                           type: number
 *                     tessiture:
 *                       type: string
 *                       enum: [A, B, C, ' ']
 *                     appreciation:
 *                       type: string
 *                       enum: [Alto, Basse, Soprano, Ténor, ' ']
 *                     extrait_music:
 *                       type: string
 *                     decision:
 *                       type: string
 *                     remarque:
 *                       type: string
 *                   example:
 *                     _id: "1234567890"
 *                     numero_aud: 1
 *                     date: "2024-01-19T12:00:00Z"
 *                     heureDeb: "12:00 PM"
 *                     heureFin: "2:00 PM"
 *                     candidat_info:
 *                       _id: "0987654321"
 *                       cin: "C123456"
 *                       role: "Candidat"
 *                       nom: "John"
 *                       prenom: "Doe"
 *                       email: "john.doe@example.com"
 *                       sexe: "Male"
 *                       tel: "123456789"
 *                       password: "securepassword"
 *                       tailleM: 180
 *                     tessiture: "A"
 *                     appreciation: "Alto"
 *                     extrait_music: "Example music excerpt"
 *                     decision: "Accepté"
 *                     remarque: "Example remark"
 *               message:
 *                 type: string
 *                 example: Auditions Found!!
 *
 *     AuditionsNotFoundResponse:
 *       description: Auditions not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Auditions Not Found
 *
 * /audition/FindAllAuditions:
 *   get:
 *     summary: Find All Auditions
 *     description: Retrieve details of all Auditions.
 *     tags: [Audition]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AuditionsFoundResponse'
 *       404:
 *         $ref: '#/components/responses/AuditionsNotFoundResponse'
 */
  
  router.get("/FindAllAuditions", FindAllAuditions);
/**
 * @swagger
 * components:
 *   responses:
 *     AuditionFoundResponse:
 *       description: Audition found successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Auditions:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   numero_aud:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   heureDeb:
 *                     type: string
 *                   heureFin:
 *                     type: string
 *                   candidat_info:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       cin:
 *                         type: string
 *                       role:
 *                         type: string
 *                       nom:
 *                         type: string
 *                       prenom:
 *                         type: string
 *                       email:
 *                         type: string
 *                       sexe:
 *                         type: string
 *                       tel:
 *                         type: string
 *                       password:
 *                         type: string
 *                       tailleM:
 *                         type: number
 *                   tessiture:
 *                     type: string
 *                     enum: [A, B, C, ' ']
 *                   appreciation:
 *                     type: string
 *                     enum: [Alto, Basse, Soprano, Ténor, ' ']
 *                   extrait_music:
 *                     type: string
 *                   decision:
 *                     type: string
 *                   remarque:
 *                     type: string
 *               message:
 *                 type: string
 *                 example: Auditions Founded!!
 *
 *     AuditionNotFoundResponse:
 *       description: Audition not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Auditions Not Found
 *
 * /audition/FindOneAudition/{id}:
 *   get:
 *     summary: Find One Audition
 *     description: Retrieve details of a specific Audition by ID.
 *     tags: [Audition]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Audition to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AuditionFoundResponse'
 *       404:
 *         $ref: '#/components/responses/AuditionNotFoundResponse'
 */
  router.get("/FindOneAudition/:id", FindOneAudition);
  /**
 * @swagger
 * components:
 *   responses:
 *     AuditionUpdatedResponse:
 *       description: Audition updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Audition:
 *                 $ref: '#/components/schemas/AuditionData'
 *               message:
 *                 type: string
 *                 example: Audition Updated!!
 *
 *     AuditionNotFoundResponse:
 *       description: Audition not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Audition Not Found
 *
 * /audition/UpdateAudition/{id}:
 *   patch:
 *     summary: Update One Audition
 *     description: Update an existing Audition in the database
 *     tags: [Audition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Audition to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditionData'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AuditionUpdatedResponse'
 *       404:
 *         $ref: '#/components/responses/AuditionNotFoundResponse'
 */
  
  router.patch("/UpdateAudition/:id", UpdateAudition);
  /**
 * @swagger
 * components:
 *   responses:
 *     AuditionDeletedResponse:
 *       description: Audition deleted successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Audition Deleted With Success
 *
 *     AuditionNotFoundResponse:
 *       description: Audition not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: The Audition Was Not Found To Be Deleted. Try Another ID
 *
 * /audition/DeleteAudition/{id}:
 *   delete:
 *     summary: Delete One Audition
 *     description: Delete an existing Audition from the database
 *     tags: [Audition]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Audition to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         $ref: '#/components/responses/AuditionDeletedResponse'
 *       404:
 *         $ref: '#/components/responses/AuditionNotFoundResponse'
 */
  
  router.delete("/DeleteAudition/:id", DeleteAudition);
//   /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Personne:
//  *       type: object
//  *       properties:
//  *         cin:
//  *           type: string
//  *           description: The Cin of the Personne
//  *         role:
//  *           type: string
//  *           description: The role of the Personne
//  *         nom:
//  *           type: string
//  *           description: The name of the Personne
//  *         prenom:
//  *           type: string
//  *           description: The surname of the Personne
//  *         email:
//  *           type: string
//  *           description: The email of the Personne
//  *         sexe:
//  *           type: string
//  *           enum: ['Male', 'Female']
//  *           description: The gender of the Personne
//  *         tel:
//  *           type: string
//  *           description: The telephone number of the Personne
//  *         password:
//  *           type: string
//  *           description: The password of the Personne
//  *         tailleM:
//  *           type: number
//  *           description: The height of the Personne
//  *       required:
//  *         - cin
//  *         - nom
//  *         - prenom
//  *         - email
//  *         - sexe
//  *
//  * /audition/AddPersonne:
//  *   post:
//  *     summary: Add a new Personne
//  *     description: Add a new Personne to the database
//  *     tags: [Personne]
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Personne'
//  *     responses:
//  *       201:
//  *         description: Personne added successfully
//  *         content:
//  *           application/json:
//  *             example:
//  *               Personne: {
//  *                 cin: "123456789",
//  *                 role: "Candidat",
//  *                 nom: "John",
//  *                 prenom: "Doe",
//  *                 email: "john.doe@example.com",
//  *                 sexe: "Male",
//  *                 tel: "1234567890",
//  *                 password: "securepassword",
//  *                 tailleM: 180
//  *               }
//  *               message: Personne added with success
//  *       400:
//  *         description: Personne not added
//  *         content:
//  *           application/json:
//  *             example:
//  *               error: "Error message"
//  *               message: Personne Not Added
//  */ 
  
  router.post("/AddPersonne", AddPersonne);
  /**
 * @swagger
 * components:
 *   schemas:
 *     Candidat:
 *       type: object
 *       properties:
 *         situationPro:
 *           type: string
 *           description: The professional situation of the Candidat
 *         connaissanceMusic:
 *           type: string
 *           description: The musical knowledge of the Candidat
 *         decision:
 *           type: string
 *           enum: ['Accepté', 'En attente', 'Refusé']
 *           default: 'En attente'
 *           description: The decision status of the Candidat
 *       required:
 *         - situationPro
 *         - connaissanceMusic
 *
 * /audition/AddCandidat:
 *   post:
 *     summary: Add a new Candidat
 *     description: Add a new Candidat to the database
 *     tags: [Candidat]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidat'
 *     responses:
 *       201:
 *         description: Candidat added successfully
 *         content:
 *           application/json:
 *             example:
 *               Candidat: {
 *                 situationPro: "Student",
 *                 connaissanceMusic: "Intermediate",
 *                 decision: "En attente"
 *               }
 *               message: Candidat added with success
 *       400:
 *         description: Candidat not added
 *         content:
 *           application/json:
 *             example:
 *               error: "Error message"
 *               message: Candidat Not Added
 */
  
  router.post("/AddCondidat", AddCandidat);

  module.exports = router;