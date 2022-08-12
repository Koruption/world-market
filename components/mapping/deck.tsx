import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer, GeoJsonLayer, BitmapLayer, BitmapLayerProps } from '@deck.gl/layers';
import Map from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import {MapProvider} from 'react-map-gl';
import Sources from './sources';
import ResizableMarker from './resizablemarker';
import MControls from './controls';
import LatLngDisplay from './latlngdisplay';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 60,
  bearing: 0
};

export type GeoJsonDataProp = {
  name: string;
}

export type GeoJsonData<T extends GeoJsonDataProp = GeoJsonDataProp> = {
  "type": "Feature" | string;
  "geometry": {
    "type": "Point" | "LineString" | "Polygon" | "MultiLineString" | "MultiPolygon";
    "coordinates": number[];
  }
  "properties": T
}

const geoJData: GeoJsonData<{ name: string, rank: number }> = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-122.41669, 37.7853]
  },
  properties: {
    name: "Some Data",
    rank: 2
  }
}

const geoJsonLayer = new GeoJsonLayer({
  id: 'geojson-layer',
  data: geoJData,
  pickable: true,
  stroked: false,
  filled: true,
  extruded: true,
  pointType: 'circle',
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
  getFillColor: [255, 105, 0, 200],
  // getLineColor: d => colorToRGBArray(d.properties.color),
  getPointRadius: 100,
  getLineWidth: 1,
  getElevation: 1
});

const bitmapLayer = new BitmapLayer({
  id: 'bitmap-layer-id',
  bounds: [-122.5190, 37.7045, -122.355, 37.829],
  image: 'https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif'
})

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];

// DeckGL react component
export default function Deck() {
  const layers = [
    new LineLayer({ id: 'line-layer', data }),
    geoJsonLayer,
    // bitmapLayer
  ];

  const [coordinates, setCoordinates] = useState([
    INITIAL_VIEW_STATE.latitude,
    INITIAL_VIEW_STATE.longitude]);

  useEffect(() => {
    window.document.body.oncontextmenu = () => {
      return false
    }
  }, [])


  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <Map
        mapboxAccessToken="pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5tdG4yZzAyZTczb3F1OXgzbmx0MHoifQ.GpCYKnR5qmpCA9hoOb7fDA"
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        <MapProvider>
          <ResizableMarker image="https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif" />
          <LatLngDisplay />
          <MControls />
        </MapProvider>
      </Map>
    </DeckGL>
  );
}