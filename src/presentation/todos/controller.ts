import { Request, Response } from "express";



export class TodosController {

    constructor() {}

    public getTodos = (req:Request, res:Response) => {
    
        res.json([
            { id: 1, text: 'Buy milk', createdAt: new Date() },
            { id: 2, text: 'Buy bread', createdAt: new Date() },
            { id: 3, text: 'Buy butter', createdAt: new Date() },
        ]);
        
    }
    
}