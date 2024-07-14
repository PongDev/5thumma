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
  const [curTaskLatLng, setCurTaskLatLng] = useState<{
    lat: number;
    lng: number;
  }>(getRandomLatLong(chulaEngineerLatLong, 100));

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

  const skipTaskOnClickHandler = () => {
    setCurTaskLatLng(getRandomLatLong(chulaEngineerLatLong, 100));
    // get new task
    setisAccepted(false);
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
  }, []);

  return (
    <>
      <Navbar />
      {clickedQuest && (
        <QuestDialog
          curTaskLatLng={curTaskLatLng}
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
              <QuestBoxPreview
                key={id}
                name={quest.name}
                type={quest.type}
                lat={chulaEngineerLatLong.lat}
                lng={chulaEngineerLatLong.lng}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto">
          <QuestBox
            mapCenter={curTaskLatLng}
            task={{
              name: "ชื่อเควสต์สุดมหัศจรรย์พันลึก",
              desc: "อินดอร์บาลานซ์มาร์จินเมี่ยงคำไนท์ โกะทาวน์เฮาส์ซิงสกายดีพาร์ตเมนท์ กาญจนาภิเษกฮ็อต คณาญาติ ภควัทคีตาป๋าฟลุตออร์แกนิก ฟรุตรอยัลตี้ บูติคฮ่องเต้วิลเลจ",
              type: "relationship",
              location: {
                latitude: curTaskLatLng.lat,
                longitude: curTaskLatLng.lng,
              },
              locationImageURL: "",
              locationURL: "",
            }}
          />

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
