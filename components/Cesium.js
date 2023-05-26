import {
  Cartesian3,
  Color,
  Ion,
  HeightReference,
  HorizontalOrigin,
  ScreenSpaceEventType,
  IonImageryProvider
} from "cesium"
import { useState, useRef, useEffect } from "react"
import { Entity, Viewer, CameraFlyTo, Scene, Globe, Camera } from "resium"
import InfoBox from "../components/InfoBox"
import CubeInfo from "../components/CubeInfo"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import UnityBuild from "../components/UnityBuild"
import BuildingInfo from "../components/BuildingInfo"


Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMjQ1ZDBmNi00OWVhLTQ2N2MtOWNkZS0yZTc1ZGE2Yzg4NzgiLCJpZCI6MTQxNDkxLCJpYXQiOjE2ODUwMjcwMzB9.9ItNpoWAU_9XHWjvLiRfNaF_EiO0WusZ7X7184iR-T0"

export default function Cesium() {
  const [box, setBox] = useState(false)
  const [model, setModel] = useState(false)
  const [cubeInfo, setCubeInfo] = useState(false)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [selectedPolygon, setSelectedPolygon] = useState({name:null})
  const [cameraFly, setCameraFly] = useState(false);
  const [cameraCubes, setCameraCubes] = useState(false);
  const [position, setPosition] = useState(null);
  const [coordinates, setCoordinates] = useState(null)
  const cesium = useRef(null)
  const viewerRef = useRef(null)
  const selectedGreen = Color.fromCssColorString('#4DA947').withAlpha(0.5)
  const hoverGreen = Color.fromCssColorString('#8DB388').withAlpha(0.7)
  const outlineGreen = Color.fromCssColorString('#224C25').withAlpha(1)


  const image = "/img/test.jpg"

  const handleHover = (cube) => {
    console.log("hover on cube", cube)
  }

  const handleOut = () => {
    console.log("out")
  }

  const handleDoubleClick = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCameraFly(true);
    setModel(true);
  };

  const handlePolygonMouseEnter = (entity) => {
    setHoveredEntity(entity)
    document.body.style.cursor = 'pointer';
  }
  const doubleClickQuiet = () => {
    //console.log('double click')
  }

  const handlePolygonMouseLeave = () => {
    setHoveredEntity(null)
    document.body.style.cursor = 'default';
  }

  const handlePolygonClick = (polygonData) => {
    setSelectedPolygon(polygonData);
    setBox(true);
    const [longitude, latitude] = polygonData.coordinates.split(',').map(coord => parseFloat(coord.trim()));
    setCoordinates({longitude: longitude, latitude: latitude})
  };

  const handleExploreClick = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(true);
    setCameraCubes(true);
  }

  const closeInfoCubes = () => {
    setPosition(cesium.current?.cesiumElement?._positionCartographic?.height)
    setCubeInfo(false);
    setCameraFly(true);
  }

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = viewerRef.current?.cesiumElement;
      viewer.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    }
  }, []);


  return (
    <>
      <Viewer
        ref={viewerRef}
        full
        imageryProvider={false}
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
        <Scene />
        <Globe />
        <Camera ref={cesium}/>
        <Entity
          name="Costa Rica"
          position={Cartesian3.fromDegrees(-83.219870, 8.720819, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/costa-rica.png?v=1684253508897",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="La Selva"
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
      >
        {cameraFly && (
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(-83.223870, 8.720819, 6000)}
            offset={new Cartesian3(0, 0, 20000)} // Adjust the zoom level as needed
            maximumHeight={position}
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
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Serrania de La Macarena"
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
        />

      <Entity
          name="Brazil"
          position={Cartesian3.fromDegrees(-48.205586, -24.683075, 100)}
          billboard={{
            image:
              "https://cdn.glitch.global/20e0005a-1645-4f59-add0-0c8829cfab10/Brasil.png?v=1685011500173",
            heightReference: HeightReference.CLAMP_TO_GROUND,
            horizontalOrigin: HorizontalOrigin.LEFT,
          }}
          description="Cajati"
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
        />
        
        {cameraCubes &&
          <CameraFlyTo
            duration={2} // Adjust the duration as needed
            destination={Cartesian3.fromDegrees(coordinates.longitude, coordinates.latitude, 100)}
            offset={new Cartesian3(0, 0, 500)} // Adjust the zoom level as needed
            maximumHeight={position}
            onComplete={() => setCameraCubes(false)} // Reset the state after the camera animation completes
          />
        }
        <Entity
          name="Costa Rica Area"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.2190299, 8.7310534, -83.2267586, 8.7293019, -83.2265452, 8.7256089, -83.2280397, 8.7248914, -83.2233427, 8.7200587, -83.2170016, 8.7222746, -83.216041, 8.7212194, -83.2127317, 8.7222324, -83.2190299, 8.7310534,
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            fillColor: hoveredEntity === "costaRicaArea" || selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(0.5) : Color.TRANSPARENT,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea',
              coordinates: '-83.2195452, 8.7256089',
              location: 'La Selva', 
              bio: 'High', 
              cubes: '580 million'
            })
          }
        />
        <Entity
          name="Costa Rica Area 2"
          polygon={{
            hierarchy: Cartesian3.fromDegreesArray([
              -83.2170349, 8.7220951, -83.2233386, 8.7199003, -83.2223577, 8.7159498, -83.2258272, 8.714673, -83.2227422, 8.7115813, -83.2131772, 8.7117079, -83.2101882, 8.7145358, -83.2127275, 8.722074, -83.2160956, 8.7210399, -83.2170349, 8.7220951
            ]),
            material: (() => {
              if (hoveredEntity === 'costaRicaArea2') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea2') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            outlineColor: selectedPolygon.name === "costaRicaArea2" ? Color.ORANGE.withAlpha(1) : Color.ORANGE.withAlpha(0.7),
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea2")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea2',
              coordinates: '-83.2193577, 8.7159498',
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
            material: (() => {
              if (hoveredEntity === 'costaRicaArea3') {
                return hoverGreen;
              } else if (selectedPolygon.name === 'costaRicaArea3') {
                return selectedGreen;
              } else {
                return Color.WHITE.withAlpha(0.3);
              }
            })(),
            fill: true,
            outline: true,
            zIndex: 1, 
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
          onMouseEnter={() => handlePolygonMouseEnter("costaRicaArea3")}
          onMouseLeave={handlePolygonMouseLeave}
          onDoubleClick={doubleClickQuiet}
          onClick={() =>
            handlePolygonClick({
              name: 'costaRicaArea3',
              coordinates: '-83.2290178, 8.7211045',
              location: 'La Selva 3', 
              bio: 'Very High', 
              cubes: '467 million',
              img: '/img/laselva-3.svg'
            })
          }
        />
      {selectedPolygon.name === "costaRicaArea2" &&
        <Entity
          name="Inner Area"
          polyline={{
            positions: Cartesian3.fromDegreesArray([
              -83.2188616, 8.7195678, -83.2172415, 8.7154318, -83.2166729, 8.7158136, -83.2164047, 8.7171392, -83.2173917, 8.7195996, -83.2188616, 8.7195678  
            ]),
            zIndex: 2,
            material: outlineGreen,
            width: 4,
            heightReference: HeightReference.CLAMP_TO_GROUND
          }}
        />
      }
      </Viewer>
      <AnimatePresence>
      {box && (
        <InfoBox
          closeClick={() => setBox((f) => false)}
          exploreClick={handleExploreClick}
          location={selectedPolygon.location}
          coordinates={selectedPolygon.coordinates}
          bio={selectedPolygon.bio}
          cubes={selectedPolygon.cubes}
          img={selectedPolygon.img}
          cubeInfo={cubeInfo}
        />
      )}
      </AnimatePresence>

      <AnimatePresence>
        {cubeInfo && (
          <>
          <CubeInfo closeClick={closeInfoCubes} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cubeInfo && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
        >
          <UnityBuild/>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
