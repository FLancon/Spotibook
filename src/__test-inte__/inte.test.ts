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
        const result = await request(app).post("/api/book").send({ "title": "La cabane à bouc" }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
            
           
        const collection = await getCollection('books', clientMongo);
        const resultToCheck: Document | null = await collection.findOne();
        expect(resultToCheck!['title']).toEqual("La cabane à bouc")
        expect(result.body.result['title']).toEqual("La cabane à bouc");
        
        expect(result.statusCode).toEqual(200);
    });


    // it("set an already existing point", async () => {
    //     const result = await request(app).post("/api/book")
    //         .send({ "lieu": "La cabane à bouc" })
    //         .set('Content-Type', 'application/json')
    //         .set('Accept', 'application/json');

    //     expect(result.statusCode).toEqual(500);

    // });
});

describe("GET / - retrieve list of book", () => {
    it("get list of book", async () => {
        const result = await request(app).get("/api/book");

        const collection = await getCollection('books', clientMongo);
        const resultToCheck: Document | null = await collection.findOne();
        expect(resultToCheck!['title']).toEqual("La cabane à bouc")
        expect(result.body.result[0].title).toEqual("La cabane à bouc");
        expect(result.statusCode).toEqual(200);
    });
});

// afterAll(async () => {
//     await mongoose.connections[0].db.dropCollection('test');
//     // await mongoose.connections[0].db.dropCollection('self-services');
//     await mongoose.disconnect()
//     await clientMongo.close();

// })

/**
 * 
 * @param coll 
 * @param client 
 * @returns 
 */
async function getCollection(coll: string, client: MongoClient): Promise<Collection> {
    const db = client.db('test');
    const collection = db.collection(coll)
    return collection;
}