import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService){}

@Get()
GetAllTasks(): [string, string]{

    return this.taskService.getTask()
    
}
    
}
