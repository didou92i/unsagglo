import flyingPlanesSvg from "@/assets/flying-planes.svg";

const FlyingPlanes = (): JSX.Element => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
    <img
      src={flyingPlanesSvg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-50 animate-fly-1"
    />
  </div>
);

export default FlyingPlanes;
