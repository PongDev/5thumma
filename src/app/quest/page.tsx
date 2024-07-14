"use client";
import Navbar from "@/components/Navbar";
import QuestDialog from "@/components/QuestDialog";
import { Button } from "@/components/ui/button";
import { chulaEngineerLatLong } from "@/constants/quest";
import { Task, TaskType, TaskTypeMapping } from "@/models/task";
import { useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const getTaskTypeStyle = (type: TaskType): CSSProperties => {
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

export interface QuestBoxPreviewProps {
  name: string;
  type: TaskType;
  lat: number;
  lng: number
}

const getStreetViewUrl = (lat: number, lng: number): string => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/streetview';
  const parameters = new URLSearchParams({
    size: "640x400",
    location: `${lat},${lng}`,
    heading: "100",
    pitch: "10",
    key: "AIzaSyAkWBk4IGhPB3YTZh1W6IPO9iNcb-hJXDs",
  });

  return `${baseUrl}?${parameters.toString()}`;
}

const QuestBoxPreview: FC<QuestBoxPreviewProps> = ({ name, type, lat, lng }) => {
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

export interface QuestBoxProps {
  task: Task;
  mapCenter: { lat: number; lng: number };
}

export const QuestBox: FC<QuestBoxProps> = ({ task, mapCenter }) => {
  const { desc, locationImageURL, name, locationURL, status, type } = task;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAkWBk4IGhPB3YTZh1W6IPO9iNcb-hJXDs", // Replace with your API key
  });

  const mapRef = useRef<null | HTMLDivElement>(null);
  const panoRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && mapRef.current && panoRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 14,
      });

      const panorama = new window.google.maps.StreetViewPanorama(
        panoRef.current,
        {
          position: mapCenter,
          pov: {
            heading: 100,
            pitch: 10,
          },
        }
      );

      map.setStreetView(panorama);
    }
  }, [isLoaded, mapCenter]);

  return (
    <div className="border border-slate-300 rounded-2xl h-full w-full text-wrap">
      {isLoaded ? (
        <div>
          <div ref={mapRef}></div>
          <div ref={panoRef} className="rounded-t-md h-96 w-full"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center rounded-t-md h-80 w-full">
          <ClipLoader color="blue" loading={true}></ClipLoader>
        </div>
      )}

      <div className="px-4 pt-4 pb-8 h-full">
        <p className="text-2xl mb-4">{name}</p>
        <div className="grid grid-cols-[80px_1fr] items-center gap-4">
          <p className="text-nowrap text-slate-400 text-sm">ประเภทเควสต์</p>
          <p
            className="break-all flex-grow px-4 py-1 rounded-full w-min text-nowrap"
            style={getTaskTypeStyle(type)}
          >
            {TaskTypeMapping[type]}
          </p>

          <p className="text-nowrap text-slate-400 text-sm">คำชี้แจง</p>
          <p className="break-all flex-grow text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
};

// FIXME sometimes the street view map goes black. I'm guessing it's probably due to an invalid lat, lng (e.g. directly inside a building instead of on the street)
function getRandomLatLong(
  center: { [key: string]: number },
  radiusInKm: number
) {
  const radiusInMeters = radiusInKm * 1000;

  // Convert radius from meters to degrees
  const radiusInDegrees = radiusInMeters / 111320; // 1 degree ~ 111.32 km

  // Generate two random numbers
  const u = Math.random();
  const v = Math.random();

  // Convert u, v to polar coordinates
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Adjust the x-coordinate for the shrinking of the east-west distances
  const new_x = x / Math.cos(center.lat * (Math.PI / 180));

  const newLat = center.lat + y;
  const newLng = center.lng + new_x;

  return {
    lat: newLat,
    lng: newLng,
  };
}

const QuestPage = () => {
  const [currentTask, setCurrentTask] = useState(null);
  const [skipCount, setSkipCount] = useState(0);
  const [currentQuestsList, setCurrentQuestsList] = useState<Task[]>([]);
  const [clickedQuest, setClickedQuest] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [curTaskLatLng, setCurTaskLatLng] = useState<{
    lat: number;
    lng: number;
  }>(getRandomLatLong(chulaEngineerLatLong, 100));

  const takeChallengeOnClickHandler = () => {};

  const skipTaskOnClickHandler = () => {
    setCurTaskLatLng(getRandomLatLong(chulaEngineerLatLong, 100));
    // call new random google image
    // set new task to state
    // add to skip count
    // fetch new task
    // trigger animation
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
            {currentQuestsList.map((quest, id) => <QuestBoxPreview
                key={id}
                name={quest.name}
                type={quest.type}
                lat={chulaEngineerLatLong.lat}
                lng={chulaEngineerLatLong.lng}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto">
          <QuestBox
            mapCenter={curTaskLatLng}
            task={{
              name: "ชื่อเควสต์สุดมหัศจรรย์พันลึก",
              desc: "อินดอร์บาลานซ์มาร์จินเมี่ยงคำไนท์ โกะทาวน์เฮาส์ซิงสกายดีพาร์ตเมนท์ กาญจนาภิเษกฮ็อต คณาญาติ ภควัทคีตาป๋าฟลุตออร์แกนิก ฟรุตรอยัลตี้ บูติคฮ่องเต้วิลเลจ",
              type: "relationship",
              locationImageURL: "",
              locationURL: "",
            }}
          />

          <div className="flex justify-between w-full mt-8 gap-4">
            <Button
              size="lg"
              className="w-full bg-lime-500 text-lime-50 shadow hover:bg-lime-500/70 dark:bg-lime-50 dark:text-lime-500 dark:hover:bg-lime-50/70"
              onClick={takeChallengeOnClickHandler}
            >
              รับคำท้า 💢💢🗣️💢🔥
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={skipTaskOnClickHandler}
            >
              ไม่ชอบ เอาใหม่ 😤
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestPage;
