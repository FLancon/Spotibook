
import axios from "axios"
import { Request, Response } from "express"

const login = async (req:Request, res: Response) => {
    const result = await axios.get('http://141.94.247.187:3000/api/v1/list').then((response) => {
        return response.data
    })
    const {code, name}  = req.body
    let isConnnect = false

    result.forEach((item:any) => {
        if(item.code === code && item.name === name){
            isConnnect = true
        }
    });

    if(isConnnect){
        res.status(200).json({message : "Logged In"})
    }else{
        res.status(401).json({message : "Wrong Credentials"})
    }

}

export default {
    login
}