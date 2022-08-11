import { Container, Card, Button, Input, Grid } from "@nextui-org/react";
import { LngLatLike, FlyToOptions } from "mapbox-gl";
import { useContext } from "react";
import { MapContext } from "react-map-gl/dist/esm/components/map";
import { WMarket } from "../../src/wmarket";

export default function MControls() {

  // const mapRef = useRef<MapRef>()
  const {map} = useContext(MapContext);

  function getRandomLatLong() {
    const data = { latitude: WMarket.math.sRand(90.00), longitude: WMarket.math.sRand(180.00) }
    const coords: LngLatLike = { lng: data.longitude, lat: data.latitude }
    const options: FlyToOptions = {
        duration: 1000,
        center: coords
    }
    map.easeTo(options)
    console.log(map)
    return data
}

  return (
    <Grid.Container direction={"column"} gap={2} justify="center" style={{ width: "100vw", marginTop: "80vh" }}>
      <Grid>
      <Button onPress={() => getRandomLatLong()} color={"success"}>Random Pan</Button>
      </Grid>
      <Grid>
        <Input color="success" placeholder="Search marker"></Input>
      </Grid>
    </Grid.Container>
  );
}
