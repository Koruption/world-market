import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Card, Container, Input } from '@nextui-org/react';
import { WMarket } from '../../src/wmarket';

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN!;

export default function Mapp() {

    const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 3.5
    })

    function getRandomLatLong() {
        const data = { latitude: WMarket.math.sRand(90.00), longitude: WMarket.math.sRand(180.00) }
        console.log(data);
        return data
    }

    function randomizeGeoTarget() {
        console.log('randomizing geos')
        setViewState(p => ({
            ...getRandomLatLong(),
            zoom: p.zoom
        }))
    }

    return (
        <>
            <Map
                pitch={60}
                latitude={viewState.latitude}
                longitude={viewState.longitude}
                mapboxAccessToken='pk.eyJ1IjoieHhsd29maXh4IiwiYSI6ImNsNm5tdG4yZzAyZTczb3F1OXgzbmx0MHoifQ.GpCYKnR5qmpCA9hoOb7fDA'
                initialViewState={viewState}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
            >
                <Container style={{ width: '25vw', marginRight: 0, marginTop: '80vh' }}>
                    <Card>
                        <Button
                            color={"success"}
                            style={{ zIndex: 3 }}
                            onPress={() => { randomizeGeoTarget() }}
                        >
                            Random Pan
                        </Button>
                        <Input color="success" placeholder='Search marker'></Input>
                    </Card>
                </Container>
            </Map>
        </>
    );
}   