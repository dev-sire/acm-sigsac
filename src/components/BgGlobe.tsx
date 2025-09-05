"use client";

import { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const SubmarineCablesGlobe = () => {
  const [cablePaths, setCablePaths] = useState<any[]>([]);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    // Fetch submarine cable geo data
    fetch("/response.json")
      .then((r) => r.json())
      .then((cablesGeo) => {
        let paths: any[] = [];
        cablesGeo.features.forEach(({ geometry, properties }: any) => {
          geometry.coordinates.forEach((coords: any) =>
            paths.push({ coords, properties })
          );
        });
        setCablePaths(paths);
    });
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    globe.pointOfView({ lat: 0, lng: 0, altitude: 2.2 }, 0);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-50">
      <Globe
        ref={globeRef}
        globeImageUrl="/earth-dark.jpg"
        pathsData={cablePaths}
        pathPoints="coords"
        pathPointLat={(p: any) => p[1]}
        pathPointLng={(p: any) => p[0]}
        pathColor={(path: any) => path.properties.color}
        pathLabel={(path: any) => path.properties.name}
        pathDashLength={0.1}
        pathDashGap={0.008}
        pathDashAnimateTime={12000}
        objectRotation={{ x: 100, y: 0, z: 50 }}
      />
    </div>
  );
};

export default SubmarineCablesGlobe;
