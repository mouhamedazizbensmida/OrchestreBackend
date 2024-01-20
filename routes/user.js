const express = require("express");
const { Login } = require("../controllers/PersonAuth.js");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: API operations for managing Oeuvres
*/
/**
 * @swagger
 * /User/Login:
 *   post:
 *     summary: Login and get an authentication token
 *     description: Authenticates a user and returns a JWT token for further authorization.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *                 example: 'user@example.com'
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               token: 'your_jwt_token_here'
 *       401:
 *         description: Invalid login credentials
 *         content:
 *           application/json:
 *             example:
 *               message: 'Login or password incorrect.'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.post('/Login', Login);

module.exports = router;
