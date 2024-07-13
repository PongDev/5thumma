export const TaskTypeMapping = {
  eat: "สายกิน",
  relationship: "สายสัมพันธ์",
  religion: "สายวัด",
  outstanding: "สายเกินแก้",
  environment: "สายรักโลก",
  theif: "สายลักโลก",
};

export type TaskType =
  | "eat"
  | "relationship"
  | "religion"
  | "outstanding"
  | "environment"
  | "theif";

export type Task = {
  name: string;
  desc: string;
  type: TaskType;
  locationURL: string;
  locationImageURL: string;
  status: string;
};
