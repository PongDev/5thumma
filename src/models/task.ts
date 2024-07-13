export const TaskTypeMapping: {[key in TaskType]: string} = {
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

export type Task = {
  name: string;
  desc: string;
  type: TaskType;
  locationURL: string;
  locationImageURL: string;
  status: string;
};
