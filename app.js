require("dotenv").config();
const db = require('./src/util/db.connect');
const express = require("express");
const app = express();

// Utilisez une fonction asynchrone pour gérer l'initialisation
async function initializeApp() {
  try {
    await db.connectToDatabase(); // Attend que la connexion à la base de données soit établie
    app.use(express.json());

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , authorization ");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      next();
    });

    app.use("/auth", (req, res, next) => {
      const authModule = require("./src/auth");
      const router = authModule.controller;
      router(req, res, next);
    });

    app.use("/appointment", async (req, res, next) => {
      const appointmentModule = require("./src/appointment");
      const router = appointmentModule.controller;
      router(req, res, next);
    });

    app.use("/services", async (req, res, next) => {
      const servicesController = require("./src/services/services.controller");
      servicesController(req, res, next);
    });

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server is started on port ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the app:', error.message);
  }
}

initializeApp();
