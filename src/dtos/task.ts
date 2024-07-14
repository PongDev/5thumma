import { Task, TaskStatus, TaskType } from "@/models/task";

export type CreateTaskResponseDTO = Task;

export type UpdateTaskRequestDTO = {
  name: string;
  type: TaskType;
  locationURL: string;
  status: TaskStatus;
};
