import { OrbitControls } from '@react-three/drei';
import MarkerCreator from './MarkerCreator';
import { Room1 } from './models/rooms/Room1';

export function MyScene() {
  return (
    <>
      <ambientLight />
      <Room1 />
      <MarkerCreator />
      <OrbitControls />
    </>
  );
}
