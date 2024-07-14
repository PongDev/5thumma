import { Button } from "@/components/ui/button";
import { Location, Task } from "@/models/task";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
import QuestBox from "./QuestBox";

export interface QuestDialogProps {
  curTaskLatLng: Location;
  quest: Task;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const QuestDialog = ({
  curTaskLatLng,
  quest,
  isOpen,
  setIsOpen,
}: QuestDialogProps) => {
  return (
    <div
      className={
        isOpen
          ? "opacity-100 absolute z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          : "hidden"
      }
    >
      <Button onClick={() => setIsOpen(false)}>ปิด</Button>
      <QuestBox mapCenter={curTaskLatLng} task={quest} />;
    </div>
  );
};

export default QuestDialog;
