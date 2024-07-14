import { getTaskTypeStyle } from "@/libs/utils";
import { Location, Task, TaskTypeMapping } from "@/models/task";
import { useJsApiLoader } from "@react-google-maps/api";
import { FC, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";

export interface QuestBoxProps {
  task: Task;
  mapCenter: Location;
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
        center: { lat: mapCenter.latitude, lng: mapCenter.longitude },
        zoom: 14,
      });

      const panorama = new window.google.maps.StreetViewPanorama(
        panoRef.current,
        {
          position: { lat: mapCenter.latitude, lng: mapCenter.longitude },
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
    <div className="border border-slate-300 rounded-2xl h-full w-full text-wrap bg-white">
      {isLoaded ? (
        <div>
          <div ref={mapRef} className="hidden"></div>
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

export default QuestBox;
