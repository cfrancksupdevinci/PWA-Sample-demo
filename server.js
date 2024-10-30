const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Middleware pour analyser le corps des requêtes JSON
app.use(express.json());

// Stockage en mémoire pour les calculs (peut être remplacé par une base de données si besoin)
let memoire = 0;

// Route pour récupérer la mémoire
app.get("/api/memoire", (req, res) => {
  res.json({ memoire });
});

// Route pour le service worker
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "service-worker.js"));
});

// Route pour mettre à jour la mémoire
app.post("/api/memoire", (req, res) => {
  const { operation, value } = req.body;
  if (operation === "add") {
    memoire += value;
  } else if (operation === "clear") {
    memoire = 0;
  }
  res.json({ memoire });
});

// Route par défaut
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution à http://localhost:${port}`);
});
