import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { GetTodos, TodoRepository, GetTodo, CreateTodo, DeleteTodo, UpdateTodo } from "../../domain";



export class TodosController {

    constructor(
        private readonly todoRepo: TodoRepository
    ) {}

    public getTodos = (req:Request, res:Response) => {
        
        new GetTodos(this.todoRepo)
            .execute()
            .then(todos=>res.json(todos))
            .catch(error=> res.status(400).json({error}));
    }

    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params?.id;
        new GetTodo(this.todoRepo)
            .execute(id)
            .then(todo=>res.json(todo))
            .catch(error=>res.status(400).json({error}));
    }

    public createTodo = (req:Request, res:Response) => {
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepo)
            .execute(createTodoDto!)
            .then(createdTodo=>res.json(createdTodo))
            .catch(error=>res.status(400).json({error}));
    }

    public updateTodo = (req: Request, res:Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return res.status(400).json({error});

        new UpdateTodo(this.todoRepo)
            .execute(updateTodoDto!)
            .then(updatedTodo=>res.json(updatedTodo))
            .catch(error=>res.status(400).json({error}));
    }

    public deleteTodo = (req: Request, res:Response) => {
        const id = +req.params.id;
        
        new DeleteTodo(this.todoRepo)
            .execute(id)
            .then(deletedTodo=>res.json(deletedTodo))
            .catch(error=>res.status(400).json({error}));
    }
    
}
