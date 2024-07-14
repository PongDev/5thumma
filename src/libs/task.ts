import { Task, TaskStatus, TaskType } from "@/models/task";
import { getUserData, validateUserToken } from "./user";

export const createTask = async (token: string, task: Task) => {
  validateUserToken(token);

  const [userRef, userData] = await getUserData(token);
  const userTasks = userData?.tasks ?? [];

  task = {
    ...task,
    status: "in progress",
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
  await userRef.update({
    tasks: [...userTasks, task],
    updatedAt: new Date().getTime(),
  });
};

export const getTasks = async (token: string): Promise<Task[]> => {
  validateUserToken(token);

  const [_, userData] = await getUserData(token);
  return userData?.tasks ?? [];
};

export const updateTasksStatus = async (
  token: string,
  taskName: string,
  taskType: TaskType,
  taskLocationURL: string,
  status: TaskStatus,
) => {
  validateUserToken(token);

  const [userRef, userData] = await getUserData(token);
  const userTasks = userData?.tasks ?? [];

  const updatedTasks = userTasks.map((task: Task) => {
    if (
      task.name === taskName &&
      task.type === taskType &&
      task.locationURL === taskLocationURL
    ) {
      return { ...task, status, updatedAt: new Date().getTime() };
    }
    return task;
  });

  await userRef.update({
    tasks: updatedTasks,
    updatedAt: new Date().getTime(),
  });
};
