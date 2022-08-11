import { Card, Container, Row, Text } from "@nextui-org/react";

export default function LatLngDisplay({ coords: { lat, lng } }: { coords: {lat: number, lng: number} }) {
  return (
    <Container>
      <Card css={{ $$cardColor: "$colors$primary" }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text size={15} color="white" css={{ m: 0 }}>
              {`lat: ${lat}, lng: ${lng}`}
            </Text>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
