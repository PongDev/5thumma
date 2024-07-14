import { Task, TaskType } from "@/models/task";

export type CreateUserRequestDTO = {
  allowTaskTypes: TaskType[];
};

export type CreateUserResponseDTO = {
  token: string;
};

export type GetUserResponseDTO = {
  tasks: Task[];
};
