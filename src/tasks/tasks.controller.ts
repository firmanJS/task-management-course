import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from 'src/dto/tasks/create.tasks.dto';
import { GetTasksFilterDto } from 'src/dto/tasks/filter.tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService) { }

    @Get()
    getAll(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksServices.getWithFilters(filterDto);
        } else {
            return this.tasksServices.getAll();
        }
    }

    @Get('/:id')
    getByParam(@Param('id') id: string): Task {
        return this.tasksServices.getByParam(id)
    }

    @Post()
    // create(
    //     @Body('title') title:string,
    //     @Body('description') description:string,
    // ): Task {
    //     return this.tasksServices.create(title, description)
    // }  
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksServices.create(createTaskDto)
    }

    @Put('/:id')
    update(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksServices.update(id, status)
    }

    @Delete('/:id')
    delete(@Param('id') id: string): void {
        return this.tasksServices.delete(id)
    }
}
