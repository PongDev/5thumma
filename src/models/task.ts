export const TaskTypeMapping: { [key in TaskType]: string } = {
  eat: "สายกิน",
  relationship: "สายสัมพันธ์",
  religion: "สายวัด",
  outstanding: "สายเกินแก้",
  environment: "สายรักโลก",
  thief: "สายลักโลก",
};

export type TaskType =
  | "eat"
  | "relationship"
  | "religion"
  | "outstanding"
  | "environment"
  | "thief";

export type TaskStatus = "pending" | "decline" | "in progress" | "complete";

export type TaskPreset = {
  name: string;
  desc: string;
  type: TaskType;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Task = TaskPreset & {
  location: Location;
  locationURL: string;
  locationImageURL: string;
  status?: TaskStatus;
  createdAt?: number;
  updatedAt?: number;
};
