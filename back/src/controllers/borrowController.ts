import * as fs from 'fs';
import { Request, Response } from 'express';
import { modelBook } from '../models/model';

const borrowBook = async (req: Request, res: Response) => {
    // Lire le fichier JSON local
    fs.readFile('users.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier JSON :', err);
            res.status(500).json({ message: 'Erreur interne du serveur' });
            return;
        }

        try {
            const users = JSON.parse(data);
            console.log(users);
            const { user_id } = req.body;
            let code_user = false;

            users.forEach((user: { code: string }) => {
                if (user.code === user_id) {
                    code_user = true;
                }
            });

            let borrow = await modelBook.findOne({ title: req.params.title });

            switch (borrow) {
                case null:
                case undefined:
                    res.status(404).json('Rien trouvé');
                    break;
                default:
                    borrow.user_id = user_id;
                    borrow.borrow_date = new Date();
                    borrow.available = false;
                    borrow.self_service_id = undefined;
                    await borrow.save();
                    res.status(200).json({ message: 'Livre emprunté', borrow });
                    break;
            }
        } catch (parseError) {
            console.error('Erreur d\'analyse JSON :', parseError);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    });
};

export default {
    borrowBook,
};
