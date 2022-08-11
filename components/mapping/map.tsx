import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import MControls from './controls';

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN!;

export default function Mapp() {

    // const {mymap} = useMap();
    // const mapRef = useRef<MapRef>();

    const [viewState, setViewState] = useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
    })

    return (
        <>
            <Map
                pitch={60}
                mapboxAccessToken='pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5tdG4yZzAyZTczb3F1OXgzbmx0MHoifQ.GpCYKnR5qmpCA9hoOb7fDA'
                initialViewState={viewState}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
            >
                
                <MControls/>
            </Map>
        </>
    );
}   