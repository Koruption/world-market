import { Container, Card, Button, Input, Grid } from "@nextui-org/react";
import { LngLatLike, FlyToOptions } from "mapbox-gl";
import { useContext } from "react";
import { useMap } from "react-map-gl";
import { WMarket } from "../../lib/wmarket";

export default function MControls() {

  // const mapRef = useRef<MapRef>()
  const { current: map } = useMap();

  function getRandomLatLong() {
    console.log('map: ', map);
    const data = { latitude: WMarket.math.sRand(90.00), longitude: WMarket.math.sRand(180.00) }
    const coords: LngLatLike = { lng: data.longitude, lat: data.latitude }
    const options: FlyToOptions = {
        duration: 1000,
        center: coords
    }
    map!.flyTo(options)
    return data
}

  return (
    <Grid.Container direction={"column"} gap={2} justify="center" style={{ width: "10vw", marginTop: "75vh", zIndex: 3}}>
      <Grid>
      <Button size={"lg"} onPress={getRandomLatLong} color={"success"}>Random Pan</Button>
      </Grid>
      <Grid>
        <Input size={"xl"} color="success" placeholder="Search marker"></Input>
      </Grid>
    </Grid.Container>
  );
}
