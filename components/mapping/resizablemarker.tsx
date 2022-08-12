import { useContext, useEffect, useState } from "react";
import { Layer, Marker, useMap } from 'react-map-gl';

const defaultMarkerDimensions = [110, 110]

export function getUniformResize(
  currSize: number[],
  zoomLvl: number,
  maxZoom: number = 20,
  minZoom: number = 0.97
) {
  const relaxation = 0.9
  const scalingCoeff = Math.max(relaxation, (maxZoom - zoomLvl / 2) / maxZoom);
  return defaultMarkerDimensions.map((s) => s * scalingCoeff);
}

export default function ResizableMarker({
  image,
  width = 110,
  height = 110
}: {
  image: string;
  width?: number;
  height?: number;
}) {
  const { current: map } = useMap();
  const [markerSize, setMarkerSize] = useState([width, height]);

  useEffect(() => {
    map?.on("zoom", (map) => {
      setMarkerSize(getUniformResize(markerSize, map.target.getZoom()));
    });
  });

  return (
    <>
      <Marker longitude={-122.41669} latitude={37.7853} anchor="bottom">
        <img
          height={markerSize[0]}
          width={markerSize[1]}
          src={image}
        />
      </Marker>
    </>
  );
}