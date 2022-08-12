import Map, { Layer, ViewState, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import MControls from "./controls";
import LatLngDisplay from "./latlngdisplay";
import Sources from "./sources";
import LChart from "../charts/bar-chart";

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN!;

export default function Mapp() {
  const initViewState: Partial<ViewState> = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
    pitch: 60,
    };

  const mapContainerRef = useRef<MapRef>(null);


  const [currViewState, setCurrViewState] = useState(initViewState);
  const [parkColor, setParkColor] = useState("#8fa");

  const syncCurrViewState = (vState: ViewState) => {
    setCurrViewState(vState);
  };

  return (
      <>
          {/* <LChart/> */}
      <Map
        ref={mapContainerRef}
        onMove={(data) => {
          syncCurrViewState(data.viewState);
        }}
        mapboxAccessToken="pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5tdG4yZzAyZTczb3F1OXgzbmx0MHoifQ.GpCYKnR5qmpCA9hoOb7fDA"
        initialViewState={initViewState}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        <LatLngDisplay
          coords={{
            lat: currViewState.latitude!,
            lng: currViewState.longitude!,
          }}
              />
        <Sources />
        <MControls />
      </Map>
    </>
  );
}
