import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImp implements TodoDatasource{

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObj(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo=>TodoEntity.fromObj(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({ where: { id }});
        if(!todo) throw new CustomError(`Todo with id:${id} not found`, 404);
        return TodoEntity.fromObj(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);
        const todoUpdated = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });
        return TodoEntity.fromObj(todoUpdated);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const todoDeleted = await prisma.todo.delete({where:{id}});
        return TodoEntity.fromObj(todoDeleted);
    }

}