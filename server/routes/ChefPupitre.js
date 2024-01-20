const express = require("express");
const {
    Ajouter_Chef_Pupitre,
} = require("../controllers/ChefPupitre.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chef Pupitre
 *   description: API operations for managing Chef Pupitre
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AjouterChefPupitreRequest:
 *       type: object
 *       properties:
 *         ListeIdsChoriste:
 *           type: array
 *           items:
 *             type: string
 *           description: List of Choriste IDs to promote to Chef Pupitre
 *         pupitreId:
 *           type: string
 *           description: ID of the Pupitre where Chef Pupitres will be added
 *       required:
 *         - ListeIdsChoriste
 *         - pupitreId
 *
 * /ChefPupitre/Ajouter_Chef_Pupitre:
 *   patch:
 *     summary: Promote Choristes to Chef Pupitre and add them to a Pupitre
 *     description: Promote Choristes to Chef Pupitre and add them to a specified Pupitre
 *     tags: [Chef Pupitre]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AjouterChefPupitreRequest'
 *     responses:
 *       200:
 *         description: Chef de pupitre ajouté
 *         content:
 *           application/json:
 *             example:
 *               pupitre:
 *                 type: "alto"
 *                 choristes: []
 *                 chefdePupitre:
 *                   - "new_chef_pupitre_id_1"
 *                   - "new_chef_pupitre_id_2"
 *                 designation: "Alto Section"
 *               message: Chef de pupitre ajouté !
 *       404:
 *         description: Pupitre not found or no choristes found
 *         content:
 *           application/json:
 *             example:
 *               message: No choristes found.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */


router.patch('/Ajouter_Chef_Pupitre', Ajouter_Chef_Pupitre);

module.exports = router;
