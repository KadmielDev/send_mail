const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importation de cors

const app = express();
app.use(bodyParser.json()); // Permet de traiter les requêtes JSON

// Configuration CORS
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:6000'], // Autoriser les requêtes depuis ces origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autoriser ces méthodes
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
}));

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: 'mail.cloudexpertremote.com', // Hôte SMTP
    port: 465, // Port sécurisé SMTP
    secure: true, // Utilisation de SSL/TLS
    auth: {
        user: 'contacts@cloudexpertremote.com', // Votre adresse e-mail
        pass: 'mpompompo00@M', // Votre mot de passe
    },
});

// Endpoint pour envoyer un e-mail
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body; // Extraction des données depuis le frontend

    const mailOptions = {
        from: 'contacts@cloudexpertremote.com', // Adresse de l'expéditeur
        to, // Adresse du destinataire
        subject, // Sujet de l'email
        text, // Corps du message
    };

    try {
        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'E-mail envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).send({ error: 'Une erreur est survenue lors de l\'envoi de l\'email.' });
    }
});

// Démarrage du serveur
const PORT = 3500; // Port d'écoute
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
