import { Task } from "@/models/task";
import { usersCollection } from "./firestore";
import { getUserData, validateUserToken } from "./user";

export const createTask = async (token: string, task: Task) => {
  validateUserToken(token);

  const [userRef, userData] = await getUserData(token);
  const userTasks = userData?.tasks ?? [];

  await userRef.update({ tasks: [...userTasks, task] });
};

export const getTasks = async (token: string): Promise<Task[]> => {
  validateUserToken(token);

  const [_, userData] = await getUserData(token);
  return userData?.tasks ?? [];
};

export const updateTasksStatus = async (
  token: string,
  taskName: string,
  taskLocationURL: string,
  status: string,
) => {
  validateUserToken(token);

  const [userRef, userData] = await getUserData(token);
  const userTasks = userData?.tasks ?? [];

  const updatedTasks = userTasks.map((task: Task) => {
    if (task.name === taskName && task.locationURL === taskLocationURL) {
      return { ...task, status };
    }
    return task;
  });

  await userRef.update({ tasks: updatedTasks });
};
