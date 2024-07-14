"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { chulaEngineerLatLong } from "@/constants/quest";
import { Task, TaskType, TaskTypeMapping } from "@/models/task";
import { useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
export interface QuestBoxPreviewProps {
  name: string;
}
const QuestBoxPreview: FC<QuestBoxPreviewProps> = ({ name }) => {
  return (
    <div className="border-b border-slate-300 rounded-md shadow-sm w-[227px]">
      <img
        className="rounded-t-md"
        src="https://as2.ftcdn.net/v2/jpg/02/64/15/41/1000_F_264154131_XvpBI5fARjB7Qlo4PMrMMTaunXha47NR.jpg"
        alt="quest image"
      />
      <p className="pb-8 px-2 pt-2">{name}</p>
    </div>
  );
};

const getTaskTypeStyle = (type: TaskType): CSSProperties => {
  let textColor = "";
  let bgColor = "";

  switch (type) {
    case "eat":
      textColor = "#59DE5F"; // Equivalent to Tailwind text-green-500
      bgColor = "#DCFCE7"; // Equivalent to Tailwind bg-green-100
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

export interface QuestBoxProps {
  task: Task;
  mapCenter: { lat: number; lng: number };
}

const QuestBox: FC<QuestBoxProps> = ({ task, mapCenter }) => {
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
    <div className="border-b border-slate-300 rounded-md shadow-md w-[575px] text-wrap">
      {isLoaded ? (
        <div>
          <div ref={mapRef}></div>
          <div ref={panoRef} className="rounded-t-md h-[240px] w-full"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center rounded-t-md h-[240px] w-full">
          <ClipLoader color="blue" loading={true}></ClipLoader>
        </div>
      )}

      <div className="px-4 pt-4 pb-8 ">
        <p className="text-3xl mb-4">{name}</p>
        <div className="grid grid-cols-[100px_1fr] gap-4">
          <p className="text-nowrap">รายละเอียด : </p>
          <p className="break-all flex-grow">{desc}</p>

          <p className="text-nowrap">ประเภท : </p>
          <p
            className="break-all flex-grow px-2 rounded-md w-min text-nowrap"
            style={getTaskTypeStyle(type)}
          >
            {TaskTypeMapping[type]}
          </p>
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

  return (
    <>
      <Navbar />
      <div id="wrapper" className="flex">
        <div className="flex flex-col mx-16">
          <div className="flex py-2 gap-2">
            <div className="flex justify-center items-cente">
              Saved Challenges
            </div>
            <div className="flex justify-center items-center font-mono rounded-full bg-indigo-500 p-2 text-white w-8 h-8">
              2
            </div>
          </div>
          <div className="flex flex-col gap-4 shadow-md rounded-lg p-4 border">
            {Array.from({ length: 10 }, (_, id) => (
              <QuestBoxPreview key={id} name={`quest name ${id}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mx-auto">
          <QuestBox
            mapCenter={curTaskLatLng}
            task={{
              name: "Quest Name",
              desc: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
              type: "thief",
              locationImageURL: "",
              locationURL: "",
              status: "",
            }}
          />

          <div className="flex justify-between w-full mt-8">
            <Button
              variant={"default"}
              className="rounded-lg w-60 bg-green-500 text-green-50 shadow hover:bg-green-500/70 dark:bg-green-50 dark:text-green-500 dark:hover:bg-green-50/70"
              onClick={takeChallengeOnClickHandler}
            >
              Take this challenge
            </Button>
            <Button
              variant={"destructive"}
              className="rounded-lg w-60"
              onClick={skipTaskOnClickHandler}
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestPage;
