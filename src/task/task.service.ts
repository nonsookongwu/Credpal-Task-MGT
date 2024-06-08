import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getTask(): [ string, string] {
    return ['task1', 'task'];
  }
}
