import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import Marker from './Marker';

function MarkerCreator() {
  const { scene } = useThree();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const onClick = (event) => {
      event.stopPropagation();

      const tempVec = new THREE.Vector3();
      tempVec.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      tempVec.unproject(camera);
      const dir = tempVec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      setMarkers((prevMarkers) => [...prevMarkers, pos]);
    };

    scene.addEventListener('click', onClick);

    return () => {
      scene.removeEventListener('click', onClick);
    };
  }, [scene]);

  return markers.map((position, i) => <Marker key={i} position={position} />);
}

export default MarkerCreator;
