import { QuestBox } from "@/app/quest/page";
import { Button } from "@/components/ui/button";
import { Task } from "@/models/task";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";

export interface QuestDialogProps {
  curTaskLatLng: {
    lat: number;
    lng: number;
  };
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
    <div className={isOpen ? "visible" : "hidden"}>
      <Button onClick={() => setIsOpen(false)}>ปิด</Button>
      <QuestBox mapCenter={curTaskLatLng} task={quest} />;
    </div>
  );
};

export default QuestDialog;
