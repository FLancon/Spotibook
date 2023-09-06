import {  Request, Response } from "express"
import { modelSelfService } from "../models/model"


const getSelfService = async (req:Request, res: Response) => {
    const result = await modelSelfService.find({})
    res.status(200).json({message : "allSelfService",result})
}

const getSelfServiceById = async (req:Request, res: Response) => {
    const result = await modelSelfService.findById(req.params.id)
    res.status(200).json({message : "A book!",result})
}

const addSelfService = async (req :Request, res: Response) => {
    modelSelfService.init()
    const result = await modelSelfService.create(req.body)
    res.status(200).json({message : "SelfService added", result})
}

const updateSelfService = async (req :Request, res: Response) => {
    const result = await modelSelfService.findOneAndUpdate({location : req.params.location}, req.body)
    res.status(200).json({message : "selfService Update",result})
}


const deleteSelfService = async (req :Request, res: Response) => {
    const result = await modelSelfService.deleteOne({location : req.params.location})
    res.status(200).json({message : "SelfService ad",result})
}
export default {
    getSelfService,
    getSelfServiceById,
    addSelfService,
    updateSelfService,
    deleteSelfService
}