const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const personModel = require("../models/Personne.js");

const Login = async (req, res) => {
    personModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ message: "Login ou mot de passe incorrécte" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ message: "Login ou mot de passe incorrecte " });
                    }
                    res.status(200).json({
                        token: jwt.sign({
                                userId: user._id,
                                userRole: user.role,
                                userMail: user.email
                            },
                            "RANDOM_TOKEN_SECRET", {
                                expiresIn: "24h"
                            }
                        )
                    });
                })
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};
module.exports = {
    Login
  };