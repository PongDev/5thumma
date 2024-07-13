import { Task } from "./task";

export type User = FirebaseFirestore.DocumentData & {
  tasks?: Task[];
};
