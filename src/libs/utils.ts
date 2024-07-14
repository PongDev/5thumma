import { TaskType } from "@/models/task";
import { type ClassValue, clsx } from "clsx";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTaskTypeStyle = (type: TaskType): CSSProperties => {
  let textColor = "";
  let bgColor = "";

  switch (type) {
    case "eat":
      textColor = "#59DE5F"; // Equivalent to Tailwind text-lime-500
      bgColor = "#DCFCE7"; // Equivalent to Tailwind bg-lime-100
      break;
    case "relationship":
      textColor = "#4299e1"; // Equivalent to Tailwind text-blue-500
      bgColor = "#dbeafe"; // Equivalent to Tailwind bg-blue-100
      break;
    case "religion":
      textColor = "#ecc94b"; // Equivalent to Tailwind text-yellow-500
      bgColor = "#fef9c3"; // Equivalent to Tailwind bg-yellow-100
      break;
    case "outstanding":
      textColor = "#e53e3e"; // Equivalent to Tailwind text-red-500
      bgColor = "#fee2e2"; // Equivalent to Tailwind bg-red-100
      break;
    case "environment":
      textColor = "#319795"; // Equivalent to Tailwind text-teal-500
      bgColor = "#ccfbf1"; // Equivalent to Tailwind bg-teal-100
      break;
    case "thief":
      textColor = "#a0aec0"; // Equivalent to Tailwind text-gray-500
      bgColor = "#e5e7eb"; // Equivalent to Tailwind bg-gray-200
      break;
    default:
      textColor = "#000000"; // Equivalent to Tailwind text-black
      bgColor = "#ffffff"; // Eq  uivalent to Tailwind bg-white
      break;
  }

  return {
    color: textColor,
    backgroundColor: bgColor,
  };
};
