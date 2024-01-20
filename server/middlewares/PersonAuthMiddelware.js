const jwt = require("jsonwebtoken");
const personModel = require("../models/Personne");

const loggedMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  personModel.findOne({ _id: userId })
    .then((response) => {
      if (response) {
        req.auth = {
          userId: userId,
          userRole: response.role,
          userMail: response.email,
        };
        next();
      } else {
        res.status(401).json("user doesn't exist");
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const AdminMiddleware = (req, res, next) => {
  try {
    if (req.auth.userRole === "Admin") {
      next();
    } else {
      res.status(403).json({ error: "no access to this route" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const ChoristeMiddleware = (req, res, next) => {
  try {
    if (
      req.auth.userRole === "Choriste" ||
      req.auth.userRole === "Chef_pupitre"
    ) {
      next();
    } else {
      res.status(403).json({ error: "no access to this route" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const conditionalMiddleware = (req, res, next) => {
  // Check your condition here
  const isAdmin = req.auth.userRole === "Admin";

  // Apply the appropriate middleware
  if (isAdmin) {
    AdminMiddleware(req, res, next);
  } else {
    ChoristeMiddleware(req, res, next);
  }
};

module.exports = {
  loggedMiddleware,
  AdminMiddleware,
  ChoristeMiddleware,conditionalMiddleware
};
