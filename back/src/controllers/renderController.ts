import axios from "axios"
import {  Request, Response } from "express"
import { modelBook } from '../models/model'

const renderBook = async (req :Request, res: Response) => {
  
    let render = await modelBook.findOne({title: req.params.title })
    
 
    switch(render) {
        case null: 
            res.status(404).json("Rien trouver")
        break;
        case undefined: 
            res.status(404).json("Rien trouver")
        break;
        // 
        default: 
            render.user_id = null
            render.borrow_date = null
            render.available = true
            render.self_service_id = req.body.self_service_id
            render.save()
            res.status(200).json({message: 'Book returned', render})
        break;
    }

}



export default {

    renderBook
}