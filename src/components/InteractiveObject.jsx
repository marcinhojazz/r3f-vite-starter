import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function InteractiveObject() {
  const texture = useLoader(TextureLoader, '/path/to/your/texture.png');

  const handleClick = () => {
    // Faça algo quando o objeto for clicado, como mostrar mais informações
  };

  return (
    <mesh onClick={handleClick}>
      <boxGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
