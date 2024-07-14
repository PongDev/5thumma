"use client";
import Navbar from "@/components/Navbar";
import QuestBox from "@/components/QuestBox";
import QuestDialog from "@/components/QuestDialog";
import { Button } from "@/components/ui/button";
import { chulaEngineerLatLong } from "@/constants/quest";
import { UpdateTaskRequestDTO } from "@/dtos/task";
import { getTaskTypeStyle } from "@/libs/utils";
import { getRandomLatLong } from "@/libs/location";
import { Task, TaskType, TaskTypeMapping } from "@/models/task";
import { useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

interface QuestBoxPreviewProps {
  name: string;
  type: TaskType;
  lat: number;
  lng: number;
  setIsOpen: (isOpen: boolean) => void;
}

const getStreetViewUrl = (lat: number, lng: number): string => {
  const baseUrl = "https://maps.googleapis.com/maps/api/streetview";
  const parameters = new URLSearchParams({
    size: "640x400",
    location: `${lat},${lng}`,
    heading: "100",
    pitch: "10",
    key: "AIzaSyAkWBk4IGhPB3YTZh1W6IPO9iNcb-hJXDs",
  });

  return `${baseUrl}?${parameters.toString()}`;
};

const QuestBoxPreview: FC<QuestBoxPreviewProps> = ({
  name,
  type,
  lat,
  lng,
  setIsOpen,
}) => {
  return (
    <div className="border border-slate-300 rounded-lg p-2">
      <img
        className="rounded-t-md"
        src={getStreetViewUrl(lat, lng)}
        alt="quest image"
      />
      <p className="px-2 py-2 text-sm">{name}</p>
      <p
        className="break-all flex-grow px-4 py-1 mb-2 rounded-full w-min text-nowrap text-sm"
        style={getTaskTypeStyle(type)}
      >
        {TaskTypeMapping[type]}
      </p>
    </div>
  );
};

const QuestPage = () => {
  const [currentQuest, setCurrentQuest] = useState<Task | null>(null);
  // const [skipCount, setSkipCount] = useState(0);
  const [currentQuestsList, setCurrentQuestsList] = useState<Task[]>([]);
  const [clickedQuest, setClickedQuest] = useState<Task | null>(null);
  const [isAccepted, setisAccepted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const takeChallengeOnClickHandler = async () => {
    setisAccepted(true);

    const taskData: UpdateTaskRequestDTO = {
      name: currentQuest!.name,
      type: currentQuest!.type,
      locationURL: currentQuest!.locationURL,
      status: "in progress",
    };

    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("user_token")!);

    await fetch("/api/task", {
      method: "PUT",
      body: JSON.stringify(taskData),
      headers: headers,
    });
  };

  const skipTaskOnClickHandler = async () => {
    setisAccepted(false);

    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("user_token")!);
    const response = await fetch("api/task", {
      method: "POST",
      headers: headers,
    });
    const quest = await response.json();

    setCurrentQuest(quest as Task);
  };

  useEffect(() => {
    const getCurrentQuests = async () => {
      const headers = new Headers();
      headers.append("Authorization", localStorage.getItem("user_token")!);
      const response = await fetch("api/user", {
        method: "GET",
        headers: headers,
      });
      return response;
    };

    getCurrentQuests().then(async (res: any) => {
      const response = await res.json();
      console.log(response);
      setCurrentQuestsList(response.tasks);
    });
  }, [currentQuest]);

  useEffect(() => {
    const getQuest = async () => {
      const headers = new Headers();
      headers.append("Authorization", localStorage.getItem("user_token")!);
      const response = await fetch("api/task", {
        method: "POST",
        headers: headers,
      });
      return response;
    };

    getQuest().then(async (res: any) => {
      const response = await res.json();
      setCurrentQuest(response as Task);
    });
  }, []);

  return (
    <>
      <Navbar />

      {clickedQuest && (
        <QuestDialog
          curTaskLatLng={currentQuest?.location!}
          quest={clickedQuest}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
        />
      )}
      <div id="wrapper" className="flex gap-10 h-screen py-16 px-10">
        <div className="flex flex-col h-screen w-[30%] overflow-y-scroll">
          <div className="flex items-center py-2 gap-2">
            เควสต์ที่รับแล้ว
            <div className="flex justify-center items-center font-mono rounded-full bg-indigo-500 p-2 text-white w-6 h-6 text-sm">
              {currentQuestsList.length}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {currentQuestsList.map((quest, id) => (
              <div
                key={id}
                onClick={() => {
                  setClickedQuest(currentQuest);
                  setIsDialogOpen(true);
                  console.log(clickedQuest);
                }}
              >
                <QuestBoxPreview
                  key={id}
                  name={quest.name}
                  type={quest.type}
                  lat={quest.location.latitude}
                  lng={quest.location.longitude}
                  setIsOpen={setIsDialogOpen}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-[60%] mx-auto">
          {currentQuest && (
            <QuestBox mapCenter={currentQuest?.location!} task={currentQuest} />
          )}

          <div className="flex justify-between w-full mt-8 gap-4">
            <Button
              size="lg"
              className={
                isAccepted
                  ? "w-full bg-lime-50 text-lime-500 hover:bg-lime-100/70 outline"
                  : "w-full bg-lime-500 text-lime-50 hover:bg-lime-500/70"
              }
              onClick={takeChallengeOnClickHandler}
            >
              {isAccepted ? "รับคำท้าแล้ว ✅" : "รับคำท้า 💢💢🗣️💢🔥"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={skipTaskOnClickHandler}
            >
              {isAccepted ? "เอามาอีก! 😤" : "ไม่ชอบ เอาใหม่ 😤"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestPage;
