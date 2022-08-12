import { useContext, useEffect } from "react";
import { Layer, Marker, useMap } from 'react-map-gl';

export default function Sources() {
  const { map } = useMap();
  useEffect(() => {

  }, [])

  return <Marker longitude={-100} latitude={40} anchor="bottom">
  <img height={140} width={140} src="https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif" />
</Marker>
}