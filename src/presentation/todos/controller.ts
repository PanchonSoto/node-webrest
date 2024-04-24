import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";



export class TodosController {

    constructor() {}

    public getTodos = async(req:Request, res:Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async(req:Request, res:Response) => {
        const id = +req.params?.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument '${req.params.id}' is not a number`});

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        (todo)
         ? res.json(todo)
         : res.status(404).json({error: `Todo with id:${id} not found`, todo});
    }

    public createTodo = async(req:Request, res:Response) => {
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        

        res.json(todo);
    }

    public updateTodo = async(req: Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument '${req.params.id}' is not a number`});

        const todo = await prisma.todo.findUnique({where: { id }});
        if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});

        const { text, completedAt } = req.body;
        if(!text) return res.status(400).json({error:'Text property is required'});

        
        const todoUpdated = await prisma.todo.update({
            where: {
                id
            },
            data: {
                text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });

        res.json(todoUpdated);
    }

    public deleteTodo = async(req: Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument '${req.params.id}' is not a number`});

        const todo = await prisma.todo.findUnique({where:{id}});
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        const todoDeleted = await prisma.todo.delete({where:{id:todo.id}});

        (todoDeleted)
         ? res.json(todoDeleted)
         : res.status(404).json({error: `Todo with id ${id} not found`});

        // const filteredTodos = todos.filter(todo => todo.id !== id);
        // todos = filteredTodos;
        
        // res.status(200).send({message: `Todo deleted ${id}`});
    }
    
}
