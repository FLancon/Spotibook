import { Collection, Db, Document, MongoClient } from "mongodb";
import mongoose from "mongoose";
import request from "supertest";
import { connectDb } from '../database/connect';
import app from '../../app';


let connection;
let clientMongo: MongoClient;

beforeAll(async () => {
    connection = await connectDb();
    const uri = `mongodb+srv://${process.env.DATABASE}`;
    console.log('URI',uri);
    
    clientMongo = await MongoClient.connect(uri);
})

describe("POST / - set a point", () => {
    it("set a point", async () => {
        const result = await request(app).post("/api/book").send({ "title": "20 Milles lieux sous la merde" }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
            
           
        const collection = await getCollection('books', clientMongo);
        const resultToCheck: Document | null = await collection.findOne();
        expect(resultToCheck!['title']).toEqual("20 Milles lieux sous la merde")
        expect(result.body.result['title']).toEqual("20 Milles lieux sous la merde");
        
        expect(result.statusCode).toEqual(200);
    });
});

describe("GET / - retrieve list of book", () => {
    it("get list of book", async () => {
        const result = await request(app).get("/api/book");

        const collection = await getCollection('books', clientMongo);
        const resultToCheck: Document | null = await collection.findOne();
        expect(resultToCheck!['title']).toEqual("20 Milles lieux sous la merde")
        expect(result.body.result[0].title).toEqual("20 Milles lieux sous la merde");
        expect(result.statusCode).toEqual(200);
    });
});

/**
 * 
 * @param coll 
 * @param client 
 * @returns 
 */
async function getCollection(coll: string, client: MongoClient): Promise<Collection> {
    const db = client.db('test');
    return db.collection(coll);
}