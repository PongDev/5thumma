import { Task, TaskType } from "./task";

export type User = FirebaseFirestore.DocumentData & {
  tasks?: Task[];
  allowTaskTypes?: TaskType[];
  createdAt?: number;
  updatedAt?: number;
};
