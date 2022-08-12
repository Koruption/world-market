import { Card, Container, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl";

export default function LatLngDisplay() {
  const { current: map } = useMap();
  const [coords, setCoords] = useState([0,0]);

  useEffect(() => {
    if (map) {
      map.on('move', (ev) => {
        const { lat, lng } = map.getCenter();
        setCoords([lat, lng])
      })
    }
  }, [])

  return (
    <Container>
      <Card css={{ $$cardColor: "$colors$default" }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text size={15} color="white" css={{ m: 0 }}>
              {`lat: ${coords[0].toPrecision(5)}, lng: ${coords[1].toPrecision(5)}`}
            </Text>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
