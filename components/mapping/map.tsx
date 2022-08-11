import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Input } from '@nextui-org/react';

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN!;

export default function Mapp() {

    // const mapContainerRef: MutableRefObject<any | null> = useRef(null);

    // useEffect(() => {
    //     const map = new mapboxgl.Map({
    //         accessToken: 'pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5uMXZmOTAyZDYzZHBwenh1d2V6MGkifQ.FxuHO3ZSZJ8nMWLqK6srFw',
    //         container: mapContainerRef.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [-104.9876, 39.7405],
    //         zoom: 12.5,
    //     })

    //     map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    //     return map.remove();
    // }, [])

    return (
        <>
            <Map
                pitch={60}
                mapboxAccessToken='pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5tdG4yZzAyZTczb3F1OXgzbmx0MHoifQ.GpCYKnR5qmpCA9hoOb7fDA'
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5
                }}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
            >
                <Button color={"success"} style={{ zIndex: 3 }}>
                    Pan
                </Button>
                <Input label='Search item'></Input>
            </Map>
        </>
    );
}   