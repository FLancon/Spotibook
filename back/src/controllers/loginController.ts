import { Request, Response } from 'express';
import * as fs from 'fs';

const login = async (req: Request, res: Response) => {
    // Lire le fichier JSON local
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            res.status(500).json({ message: 'Erreur interne du serveur' });
            return;
        }

        try {
            const users = JSON.parse(data);

            const { code, name } = req.body;
            let isConnect = false;

            users.forEach((user: { code: string; name: string }) => {
                if (user.code === code && user.name === name) {
                    isConnect = true;
                }
            });

            if (isConnect) {
                res.status(200).json({ message: 'Connecté' });
            } else {
                res.status(401).json({ message: 'Identifiants incorrects' });
            }
        } catch (parseError) {
            console.error('Erreur d\'analyse JSON :', parseError);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    });
};

export default {
    login
}