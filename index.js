const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const dotenv = require("dotenv");
const concertRoutes = require("./routes/concert.js");
const auditionRoutes = require("./routes/audition.js");
const choristeRoutes = require("./routes/choriste.js");
const ChefPupitreRoutes = require("./routes/ChefPupitre.js");
const PupitreRoutes = require("./routes/Pupitre.js");
const UserRoutes = require("./routes/user.js");
require('./controllers/Choriste.js'); // Import the scheduler logic

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`MongoDB is Connected \nServer Port: ${PORT}`));

  
  })
  .catch((error) => console.log(`${error} did not connect`));
  /*CORS*/
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
/* ROUTES */
app.use("/choriste", choristeRoutes);
app.use("/audition", auditionRoutes);
app.use("/concert", concertRoutes)
app.use("/ChefPupitre", ChefPupitreRoutes)
app.use("/Pupitre", PupitreRoutes)
app.use("/User", UserRoutes)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
