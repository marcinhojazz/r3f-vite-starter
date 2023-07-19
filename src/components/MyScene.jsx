import { OrbitControls } from '@react-three/drei';
import { Room1 } from './models/rooms/Room1';
import { MarkerCreator } from './MarkerCreator';
import { useState } from 'react';

export function MyScene() {
  const [markers, setMarkers] = useState([]);

  return (
    <>
      <ambientLight />
      <Room1 />
      <MarkerCreator setMarkers={setMarkers} />
      {markers.map((marker, index) => (
        <mesh key={index} position={marker}>
          <sphereBufferGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
      <OrbitControls />
    </>
  );
}
