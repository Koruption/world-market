import Map, { Source, Layer } from 'react-map-gl';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-121.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

export default function MapBx() {

  
  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5uMXZmOTAyZDYzZHBwenh1d2V6MGkifQ.FxuHO3ZSZJ8nMWLqK6srFw'
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5,
      pitch: 60, // pitch in degrees
      bearing: 0, // bearing in degrees
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/navigation-night-v1"
    >


<Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}
