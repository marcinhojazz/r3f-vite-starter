import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

export function MarkerCreator({ setMarkers }) {
  const { scene, gl, camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const onClick = (event) => {
      const currentTime = window.performance.now();
      if (currentTime - lastClickTime < 250) { // 250ms, adjust as needed
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
          const [first] = intersects;
          setMarkers((prevMarkers) => [...prevMarkers, first.point]);

          // Calculate direction from camera to marker
          const direction = new THREE.Vector3().subVectors(first.point, camera.position).normalize();

          // Calculate new camera position 1 unit away from marker
          const newCameraPosition = new THREE.Vector3().copy(first.point).add(direction.multiplyScalar(-1));

          gsap.to(camera.position, { 
            x: newCameraPosition.x, 
            y: newCameraPosition.y, 
            z: newCameraPosition.z, 
            duration: 1, // adjust as needed
            onUpdate: () => camera.lookAt(first.point)
          });
        }
      }
      setLastClickTime(currentTime);
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [scene, camera, setMarkers, lastClickTime]);

  return null;
}
