// FIXME sometimes the street view map goes black. I'm guessing it's probably due to an invalid lat, lng (e.g. directly inside a building instead of on the street)
export function getRandomLatLong(
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

export const getStreetViewUrl = (lat: number, lng: number): string => {
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
