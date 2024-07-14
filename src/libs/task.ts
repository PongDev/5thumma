import { Task, TaskStatus, TaskType } from "@/models/task";
import { getUserData, validateUserToken } from "./user";
import { TaskPresets } from "@/data/tasks";
import crypto from "crypto";
import { getRandomLatLong, getStreetViewUrl } from "./location";
import { chulaEngineerLatLong } from "@/constants/quest";

export const createTask = async (token: string): Promise<Task> => {
  validateUserToken(token);

  const [userRef, userData] = await getUserData(token);
  const userTasks = userData?.tasks ?? [];
  const userAllowTaskTypes = userData?.allowTaskTypes ?? [];

  const filteredTasksPresets = TaskPresets.filter((taskPreset) =>
    userAllowTaskTypes.includes(taskPreset.type),
  );

  const generatedLatLong = getRandomLatLong(chulaEngineerLatLong, 100);
  const locationImageURL = getStreetViewUrl(
    generatedLatLong.lat,
    generatedLatLong.lng,
  );

  const generatedTask: Task = {
    ...filteredTasksPresets[crypto.randomInt(0, filteredTasksPresets.length)],
    location: {
      latitude: generatedLatLong.lat,
      longitude: generatedLatLong.lng,
    },
    locationURL: `https://maps.google.com/maps?q=${generatedLatLong.lat},${generatedLatLong.lng}`,
    locationImageURL,
    status: "pending",
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  await userRef.update({
    tasks: [...userTasks, generatedTask],
    updatedAt: new Date().getTime(),
  });
  return generatedTask;
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
