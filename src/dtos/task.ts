import { TaskPreset, TaskStatus, TaskType } from "@/models/task";

export type CreateTaskRequestDTO = TaskPreset & {
  locationURL: string;
  locationImageURL: string;
};

export type UpdateTaskRequestDTO = {
  name: string;
  type: TaskType;
  locationURL: string;
  status: TaskStatus;
};
