import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './tasks.model'
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from 'src/dto/tasks/create.tasks.dto'
import { GetTasksFilterDto } from 'src/dto/tasks/filter.tasks.dto'

@Injectable()
export class TasksService {
    // define the models
    private tasks : Task[] = []

    getAll(): Task[]{
        return this.tasks
    }

    getWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAll();
    
        if (status) {
          tasks = tasks.filter(task => task.status === status);
        }
    
        if (search) {
          tasks = tasks.filter(task =>
            task.title.includes(search) ||
            task.description.includes(search),
          );
        }
    
        return tasks;
      }

    getByParam(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found
    }

    create(createTaskDto: CreateTaskDto):Task{
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title, 
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task
    }

    update(id: string, status:TaskStatus){
        const task = this.getByParam(id)
        task.status = status

        return task
    }

    delete(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
