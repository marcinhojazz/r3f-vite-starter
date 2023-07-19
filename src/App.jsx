import { Canvas } from "@react-three/fiber";
import { MyScene } from "./components/MyScene";

function App() {
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <ambientLight intensity={1} />
      <MyScene />
    </Canvas>
  );
}

export default App;
