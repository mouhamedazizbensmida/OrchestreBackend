


const express = require("express");
const {
    AddPupitre,
    findAllPupitre
} = require("../controllers/Pupitre.js");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AddPupitreRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - alto
 *             - basse
 *             - tenor
 *             - soprano
 *           description: Type of the Pupitre
 *         choristes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of Choriste IDs in the Pupitre
 *         chefdePupitre:
 *           type: array
 *           items:
 *             type: string
 *           description: List of Chef de Pupitre IDs in the Pupitre
 *         designation:
 *           type: string
 *           description: Designation of the Pupitre
 *       required:
 *         - type
 *
 * /Pupitre/AddPupitre:
 *   post:
 *     summary: Add a new Pupitre
 *     description: Add a new Pupitre with the provided information
 *     tags: [Pupitre]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPupitreRequest'
 *     responses:
 *       201:
 *         description: Pupitre added successfully
 *         content:
 *           application/json:
 *             example:
 *               Pupitre:
 *                 type: "alto"
 *                 choristes: []
 *                 chefdePupitre: []
 *                 designation: "Alto Section"
 *               message: Pupitre added with success
 *       400:
 *         description: Pupitre not added, check request body
 *         content:
 *           application/json:
 *             example:
 *               e: "Error message"
 *               message: "Pupitre Not Added"
 */
router.post('/AddPupitre', AddPupitre);
/**
 * @swagger
 * components:
 *   schemas:
 *     Pupitre:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - alto
 *             - basse
 *             - tenor
 *             - soprano
 *           description: Type of the Pupitre
 *         choristes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Person'
 *           description: List of Choristes in the Pupitre
 *         chefdePupitre:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Person'
 *           description: List of Chef de Pupitres in the Pupitre
 *         designation:
 *           type: string
 *           description: Designation of the Pupitre
 *       required:
 *         - type
 *
 * /Pupitre/findAllPupitre:
 *   get:
 *     summary: Get all Pupitres
 *     description: Retrieve a list of all Pupitres with associated Choristes and Chef de Pupitres
 *     tags: [Pupitre]
 *     responses:
 *       200:
 *         description: All pupitres fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               pupitres:
 *                 - type: "alto"
 *                   choristes:
 *                     - cin: "123456"
 *                       role: "Choriste"
 *                       nom: "John"
 *                       prenom: "Doe"
 *                       email: "john@example.com"
 *                       sexe: "Male"
 *                       tel: "123456789"
 *                       password: "hashed_password"
 *                       tailleM: 170
 *                       createdAt: "2024-01-19T12:00:00.000Z"
 *                       updatedAt: "2024-01-19T12:30:00.000Z"
 *                   chefdePupitre:
 *                     - cin: "789012"
 *                       role: "Chef_pupitre"
 *                       nom: "Alice"
 *                       prenom: "Smith"
 *                       email: "alice@example.com"
 *                       sexe: "Female"
 *                       tel: "987654321"
 *                       password: "hashed_password"
 *                       tailleM: 165
 *                       createdAt: "2024-01-19T13:00:00.000Z"
 *                       updatedAt: "2024-01-19T13:30:00.000Z"
 *                   designation: "Alto Section"
 *               message: "All pupitres fetched successfully."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.get('/findAllPupitre', findAllPupitre);

module.exports = router;
