import axios from "axios";
import { log } from "console";
import { Request, Response } from "express";
import { modelBook } from "../models/model";

const borrowBook = async (req: Request, res: Response) => {
    const resultAxios = await axios
        .get("http://localhost:5009/api/v1/list")
        .then((response) => {
            return response.data;
        });

    let code_user = false;

    const data = req.body

    resultAxios.forEach((item: any) => {
        if (item.code === data.user_id) {
            code_user = true;
        }
    });

    let borrow = await modelBook.findOne({ title: req.params.title })

    switch (borrow) {
        case null:
            res.status(404).json("Rien trouvé")
            break;
        case undefined:
            res.status(404).json("Rien trouvé")
            break;
        default:
            borrow.user_id = data.user_id
            borrow.borrow_date = new Date()
            borrow.available = false
            borrow.self_service_id = undefined
            borrow.save()
            res.status(200).json({ message: 'Livre emprunté', borrow })
            break;
    }
};

export default {
    borrowBook,
};
