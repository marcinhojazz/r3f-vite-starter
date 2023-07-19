function Marker({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

export default Marker;
