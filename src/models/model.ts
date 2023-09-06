import { Document, model, Schema } from 'mongoose';
// import mongoose from 'mongoose'

// const self_service_schema = new mongoose.Schema(
//     {
//         location: String,
//         address :  String,
//         zip_code : Number,
//     }
// );

// export const modelSelfService = mongoose.model("selfService", self_service_schema )

// const schemaBook = new mongoose.Schema({
//     title: String,
//     author: String,
//     available: Boolean,
//     borrow_date: {type: Schema.Types.Mixed },
//     self_service_id: {type: mongoose.Schema.Types.ObjectId, ref: "selfservice"},
//     user_id: {type: Schema.Types.Mixed }
// });

// export const modelBook = mongoose.model("Book", schemaBook);


export type TBook = {
    title: string,
    author: string,
    available: boolean,
    borrow_date: Date,
    self_service_id: string,
    user_id: string
}

export type TSelfPointService = {
        location: string,
        address :  string,
        zip_code : number,
}

export type TUsers = {
        name : string,
        code : string,
}


export interface IBook extends TBook , Document{};

export interface ISelfPointService extends TSelfPointService,Document{};
export interface IUsers extends TUsers,Document{};


const schemaBook = new Schema({
    title: {type: String},
    author: {type:String},
    available: {type:Boolean},
    borrow_date: {type: Schema.Types.Mixed },
    self_service_id: {type: Schema.Types.ObjectId, ref: "selfservice"},
    user_id: {type: Schema.Types.Mixed }
})


const schemaSelfPoint = new Schema ({
    location: {type:String},
    address :  {type:String},
    zip_code : {type:Number},
})

const schemaUsers = new Schema ({
    name : {type:String},
    code :  {type:String},
})


export const modelBook = model('book',schemaBook)

export const modelSelfService = model('selfservice',schemaSelfPoint)
export const modelUsers = model('users',schemaUsers)