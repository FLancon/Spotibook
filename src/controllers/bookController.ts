
import {  Request, Response } from "express"
import { modelBook } from '../models/model'

const getBook = async (req:Request, res: Response) => {
    const result = await modelBook.find({}).populate('self_service_id')
    res.status(200).json({message : "allBook",result})
}

const getBookById = async (req:Request, res: Response) => {
    const result = await modelBook.findById(req.params.id)
    res.status(200).json({message : "A book!",result})
}

const addBook = async (req :Request, res: Response) => {
       const result = await modelBook.create(req.body)
       res.status(200).json({message : "Book added", result})
}

const updateBook = async (req :Request, res: Response) => {
    const result = await modelBook.findOneAndUpdate({title : req.params.title}, req.body)
    res.status(200).json({message : "book Update",result})
}


const deleteBook = async (req :Request, res: Response) => {
    const result = await modelBook.deleteOne({id : req.params._id})
    res.status(200).json({message : "Book ad",result})
}
export default {
    getBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}