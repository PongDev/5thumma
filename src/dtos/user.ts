import { TaskType } from "@/models/task";

export type CreateUserRequestDTO = {
  allowTaskTypes: TaskType[];
};

export type CreateUserResponseDTO = {
  token: string;
};
