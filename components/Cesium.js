import {
  Cartesian3,
  Color,
  Ion,
  HeightReference,
  HorizontalOrigin,
  Camera
} from "cesium"
import { useState, useRef, useEffect } from "react"
import { Entity, Viewer, CameraFlyTo } from "resium"
import InfoBox from "../components/InfoBox"
import CubeInfo from "../components/CubeInfo"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"


// because dat.gui has dependencies to "window" we need to load that module on the client only.
const WebGL = dynamic(() => import("../components/webgl"), { ssr: false })


Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YWFiYmUwMy00OWJjLTQzNzgtOGRkNy1hMjNiNzJkZDhiZTgiLCJpZCI6MTM5MDYwLCJpYXQiOjE2ODQyMjk0NTJ9.vcp3vAE8acxcoCF0cVcF8t72adLDvV-daPZ_vF2vmwU"

export default function Cesium() {
  const [box, setBox] = useState(false)
  const [model, setModel] = useState(false)
  const [cubeInfo, setCubeInfo] = useState(false)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState({name:null})
  const [cameraFly, setCameraFly] = useState(false);
  const [cameraCubes, setCameraCubes] = useState(false);

  const image = "/img/test.jpg"

  const handleHover = (cube) => {
    console.log("hover on cube", cube)
  }

  const handleOut = () => {
    console.log("out")
  }

  const handleDoubleClick = () => {
    setCameraFly(true);
    setModel(true);
  };



  const handlePolygonMouseEnter = (entity) => {
    setHoveredEntity(entity)
  }

  const handlePolygonMouseLeave = () => {
    setHoveredEntity(null)
  }

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    setBox(true);
  };

  const handleExploreClick = () => {
    setCubeInfo(true);
    //setCameraCubes(true);
  }

  useEffect(() => {
    var currentPosition = Camera.position;
    console.log(currentPosition)
  });

  return (
    <>
      <Viewer
        full
        timeline={false}
        homeButton={false}
        baseLayerPicker={false}
        navigationHelpButton={false}
        fullscreenButton={false}
        geocoder={false}
        infoBox={false}
        sceneMode={false}
        sceneModePicker={false}
        selectionIndicator={false}
        animation={false}
        trackedEntity={undefined}
      >
        <Entity
          name="Costa Rica"
          position={Cartesian3.fromDegrees(-83.219870, 8.720819, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1684253508897",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="La Selva"
          onDoubleClick={handleDoubleClick}
      >
        {cameraFly && (
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-83.219870, 8.720819, 5000)}
            offset={new Cartesian3(0, 0, 20000)} // Adjust the zoom level as needed
            onComplete={() => setCameraFly(false)} // Reset the state after the camera animation completes
          />
        )}
      </Entity>

        <Entity
          name="Colombia"
          position={Cartesian3.fromDegrees(-74.00499998, 3.02166658, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Colombia.png?v=1684253505802",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Serrania de La Macarena"
        />
        <Entity
          name="Costa Rica Area"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.2190299, 8.7310534, -83.2267586, 8.7293019, -83.2265452, 8.7256089, -83.2280397, 8.7248914, -83.2233427, 8.7200587, -83.2170016, 8.7222746, -83.216041, 8.7212194, -83.2127317, 8.7222324, -83.2190299, 8.7310534,
            ]),
            material: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea',
              coordinates: '-84.0092992, 10.4364417',
              location: 'La Selva', 
              bio: 'High', 
              cubes: '580 million'
            })
          }
        />
        {cameraCubes &&
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-84.011648, 10.4213488, 100)}
            offset={new Cartesian3(0, 0, 500)} // Adjust the zoom level as needed
            onComplete={() => setCameraCubes(false)} // Reset the state after the camera animation completes
          />
        }
        <Entity
          name="Costa Rica Area 2"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.2170349, 8.7220951, -83.2233386, 8.7199003, -83.2223577, 8.7159498, -83.2258272, 8.714673, -83.2227422, 8.7115813, -83.2131772, 8.7117079, -83.2101882, 8.7145358, -83.2127275, 8.722074, -83.2160956, 8.7210399, -83.2170349, 8.7220951
            ]),
            material: hoveredEntity === "costaRicaArea2" || selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea2" || selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea2")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea2',
              coordinates: '-84.0136337, 10.4252993',
              location: 'La Selva 2', 
              bio: 'Medium', 
              cubes: '340 million',
              img: '/img/laselva-2.svg'
            })
          }
        />
        <Entity
          name="Costa Rica Area 3"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.2282308, 8.7247911, -83.2347334, 8.723869, -83.2370178, 8.7211045, -83.2369325, 8.7147734, -83.2261292, 8.7147628, -83.2225957, 8.7160607, -83.2235125, 8.719969, -83.2282308, 8.7247911  
            ]),
            material: hoveredEntity === "costaRicaArea3" || selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(0.5) : Color.WHITE.withAlpha(0.4),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea3" || selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea3" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea3")}
          onMouseLeave={handlePolygonMouseLeave}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea3',
              coordinates: '-84.0136337, 10.4252993',
              location: 'La Selva 3', 
              bio: 'Very High', 
              cubes: '467 million',
              img: '/img/laselva-3.svg'
            })
          }
        />
      </Viewer>
      {box && (
        <InfoBox
          closeClick={() => setBox((f) => false)}
          exploreClick={handleExploreClick}
          location={selectedPolygon.location}
          coordinates={selectedPolygon.coordinates}
          bio={selectedPolygon.bio}
          cubes={selectedPolygon.cubes}
          img={selectedPolygon.img}
        />
      )}

      {cubeInfo && <CubeInfo closeClick={() => setCubeInfo((f) => false)} />}
      <AnimatePresence>
        {cubeInfo && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
        >
          <WebGL map={image} onHover={handleHover} onOut={handleOut} />
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
