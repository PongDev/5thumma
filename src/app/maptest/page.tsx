"use client";

import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const mapCenter = {
  lat: 13.736511897128125,
  lng: 100.5340408779572,
};

const MyStreetViewMap = () => {
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
            heading: 34,
            pitch: 10,
          },
        },
      );

      map.setStreetView(panorama);
    }
  }, [isLoaded]);

  return isLoaded ? (
    <div style={containerStyle}>
      <div ref={mapRef} style={{ width: "100%", height: "50%" }}></div>
      <div ref={panoRef} style={{ width: "100%", height: "50%" }}></div>
    </div>
  ) : (
    <></>
  );
};

export default MyStreetViewMap;
