import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma/prismaClient";  

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany(); 
        console.table(users); 
    } catch(error){
        console.log("error", error) ; 
    }
});

prisma.$connect()
.then(()=>{
    console.log("[server]: Connected to database"); 
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
.catch((error)=>{
    console.error("[server]: Failed to connect to the database",error); 
}); 
